import shell from "any-shell-escape";
import { exec } from "child_process";
import { join } from "path";
import youtubedl from "youtube-dl-exec";
import dotenv from "dotenv";
dotenv.config();

let FFMPEG_PATH = "";
if (process.env.NODE_ENV === "production") {
    FFMPEG_PATH = process.env.FFMPEG_PATH_PROD;
} else {
    FFMPEG_PATH = process.env.FFMPEG_PATH_DEV;
}

console.log("LOG: FFMPEG PATH:", FFMPEG_PATH);

const getSourceUrl = async (watchUrl) => {
    try {
        const response = await youtubedl(watchUrl, {
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            f: "mp4",
        });
        const sourceUrl = response.url;
        return Promise.resolve(sourceUrl);
    } catch (err) {
        console.log("LOG: Error from getSourceUrl:");
        return Promise.reject(err);
    }
};

const getMp4 = async (seekingTimeFormatted, durationFormatted, sourceUrl) => {
    const makeMp4Command = shell([
        FFMPEG_PATH,
        "-y",
        "-ss",
        seekingTimeFormatted,
        "-i",
        `${sourceUrl}`,
        "-t",
        durationFormatted,
        "-f",
        "h264",
        "-codec",
        "copy",
        join(process.cwd(), "out.mp4"),
    ]);
    return new Promise((resolve, reject) => {
        exec(makeMp4Command, (err) => {
            if (err) {
                console.error("LOG: Error: in getMp4");
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const getGif = async () => {
    const makeGifCommand = shell([
        FFMPEG_PATH,
        "-y",
        "-i",
        join(process.cwd(), "out.mp4"),
        "-vf",
        "fps=20,scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
        "-loop",
        0,
        join(process.cwd(), "out.gif"),
    ]);
    return new Promise((resolve, reject) => {
        exec(makeGifCommand, (err) => {
            if (err) {
                console.error("LOG: Error: in getGif");
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const makeGif = async (watchUrl, seekingTimeFormatted, durationFormatted) => {
    try {
        const sourceUrl = await getSourceUrl(watchUrl);
        console.log("LOG: Got the Source URL. Making the Mp4 File now...");
        await getMp4(seekingTimeFormatted, durationFormatted, sourceUrl);
        console.log("LOG: Generated the Mp4 File. Making it a Gif file now...");
        await getGif();
        console.log("LOG: Generated the GIf File.");
    } catch (err) {
        console.log("LOG: HERE:", err);
        return Promise.reject(err);
    }
};

export default makeGif;
