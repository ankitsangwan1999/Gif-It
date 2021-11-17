import { exec } from "child_process";
import { join } from "path";
import youtubedl from "youtube-dl-exec";
import dotenv from "dotenv";
import sendEvent from "./sendEvent.mjs";
dotenv.config();

let FFMPEG_PATH = "";
const FFMPEG_MP4_TO_GIF = process.env.FFMPEG_MP4_TO_GIF;
if (process.env.NODE_ENV === "production") {
    FFMPEG_PATH = process.env.FFMPEG_PATH_PROD;
} else {
    FFMPEG_PATH = process.env.FFMPEG_PATH_DEV;
}

console.log("LOG: FFMPEG PATH:", FFMPEG_PATH);

const getSourceUrl = async (watchUrl) => {
    try {
        /**
         * Example: const sourceUrl = "https://r4---sn-qxa7sn7z.googlevideo.com/videoplayback?expire=1633440552&ei=yP5bYbOeCr7M4-EPrMSlSA&ip=103.104.203.65&id=o-ADvQvJQLe_S-AZj4tChxFWvAKUA4yWMAt6Fme6upy0bF&itag=313&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313%2C394%2C395%2C396%2C397%2C398%2C399%2C400%2C401&source=youtube&requiressl=yes&mh=cC&mm=31%2C26&mn=sn-qxa7sn7z%2Csn-cvh7knek&ms=au%2Conr&mv=m&mvi=4&pl=24&pcm2=yes&initcwndbps=963750&vprv=1&mime=video%2Fwebm&ns=6Oh-ZPizIJ1Dtvm6rW0pRyoG&gir=yes&clen=223581004&dur=188.200&lmt=1613359661535624&mt=1633418463&fvip=4&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5432432&n=-OtU755HcIegECDj&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAKI5iu1h6PWWGV2JQvWT4c9AyYfOcuBErXTV9EoQjy_RAiAB97WCH7zr2DHIPhIWX7KW9LhgPJ10ozISVRjqXaEUGA%3D%3D&sig=AOq0QJ8wRQIgGLIVPtjBKfuRkPm4WKrNFOhGUe7sUxEE2ghp51agbmICIQDhd-NtgC83zsFVjNwtkL1zGoMzl3FmgZZ9_GoVqpFpFw==";
         * Example: watchUrl = "https://youtu.be/jeaTOlDATza"
         * Note: This is just to make you aware about the structure of url. Abolve example url may have expired.
         */
        const response = await youtubedl(watchUrl, {
            format: "mp4",
            dumpSingleJson: true,
            noWarnings: true,
            noCallHome: true,
            noCheckCertificate: true,
            preferFreeFormats: true,
            youtubeSkipDashManifest: true,
            noCacheDir: true,
        });
        const sourceUrl = response.url;

        return Promise.resolve(sourceUrl);
    } catch (err) {
        console.log("LOG: Error from getSourceUrl:", err);
        return Promise.reject({
            message:
                "Error while Getting Source Url. \n Maybe due to invalid watch-url.",
            err: err,
        });
    }
};

const getMp4 = async (seekingTimeFormatted, durationFormatted, sourceUrl) => {
    const makeMp4Command = `'${FFMPEG_PATH}' -y -ss "${seekingTimeFormatted}" -i "${sourceUrl}" -t "${durationFormatted}" -codec copy "${join(
        process.cwd(),
        "out.mp4"
    )}"`;

    return new Promise((resolve, reject) => {
        exec(makeMp4Command, (err) => {
            if (err) {
                console.error("LOG: Error in getMp4:", err);
                reject({
                    message:
                        "Error while Getting Mp4 File. \n Maybe due to invalid source-url.",
                    err: err,
                });
            } else {
                resolve();
            }
        });
    });
};

const getGif = async () => {
    const makeGifCommand = `'${FFMPEG_PATH}' ${FFMPEG_MP4_TO_GIF}`;
    return new Promise((resolve, reject) => {
        exec(makeGifCommand, (err) => {
            if (err) {
                console.error("LOG: Error in getGif Function", err);
                reject({
                    message: "Error in Converting Gif to Mp4 File.",
                    err: err,
                });
            } else {
                resolve();
            }
        });
    });
};

const makeGif = async (
    res,
    watchUrl,
    seekingTimeFormatted,
    durationFormatted
) => {
    try {
        // Step: 1
        sendEvent(res, {
            message: `Getting the Source Url for the portion of the Video...`,
            state: "Pending",
        });
        if (res.writableEnded) return;
        const sourceUrl = await getSourceUrl(watchUrl);

        // Step: 2
        sendEvent(res, {
            message: `Making the Mp4 File...`,
            state: "Pending",
        });
        if (res.writableEnded) return;
        await getMp4(seekingTimeFormatted, durationFormatted, sourceUrl);

        // Step: 3
        sendEvent(res, {
            message: `Making it a Gif File...`,
            state: "Pending",
        });
        if (res.writableEnded) return;
        await getGif();
    } catch (err) {
        return Promise.reject(err);
    }
};

export default makeGif;
