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
        `${FFMPEG_PATH}`,
        "-y",
        "-ss",
        seekingTimeFormatted,
        "-i",
        `${sourceUrl}`,
        "-t",
        durationFormatted,
        "-codec",
        "copy",
        join(process.cwd(), "out.mp4"),
    ]);
    console.log(makeMp4Command);
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
        `${FFMPEG_PATH}`,
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
        // const sourceUrl = await getSourceUrl(watchUrl);
        const sourceUrl =
            "https://r4---sn-qxa7sn7z.googlevideo.com/videoplayback?expire=1633440552&ei=yP5bYbOeCr7M4-EPrMSlSA&ip=103.104.203.65&id=o-ADvQvJQLe_S-AZj4tChxFWvAKUA4yWMAt6Fme6upy0bF&itag=313&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313%2C394%2C395%2C396%2C397%2C398%2C399%2C400%2C401&source=youtube&requiressl=yes&mh=cC&mm=31%2C26&mn=sn-qxa7sn7z%2Csn-cvh7knek&ms=au%2Conr&mv=m&mvi=4&pl=24&pcm2=yes&initcwndbps=963750&vprv=1&mime=video%2Fwebm&ns=6Oh-ZPizIJ1Dtvm6rW0pRyoG&gir=yes&clen=223581004&dur=188.200&lmt=1613359661535624&mt=1633418463&fvip=4&keepalive=yes&fexp=24001373%2C24007246&c=WEB&txp=5432432&n=-OtU755HcIegECDj&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAKI5iu1h6PWWGV2JQvWT4c9AyYfOcuBErXTV9EoQjy_RAiAB97WCH7zr2DHIPhIWX7KW9LhgPJ10ozISVRjqXaEUGA%3D%3D&sig=AOq0QJ8wRQIgGLIVPtjBKfuRkPm4WKrNFOhGUe7sUxEE2ghp51agbmICIQDhd-NtgC83zsFVjNwtkL1zGoMzl3FmgZZ9_GoVqpFpFw==";
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
