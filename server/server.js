import express from "express";
import youtubedl from "youtube-dl-exec";
import ffmpeg_cli from "ffmpeg-cli";
import path from "path"; // __dirname here represent the absolute path to the root of the Project
import dotenv from "dotenv";
const __dirname = path.resolve();
dotenv.config();

const app = express();

/**
 *
 * @param {*} seconds
 * @returns Format:- HH:MM:SS
 */
const getFormatedTimeInput = (seconds) => {
    if (seconds === undefined) return "00:00:00";
    const hrs = ~~(Number(seconds) / 3600); // integer division
    seconds = Number(seconds) % 3600;
    const mins = ~~(Number(seconds) / 60); // integer division
    seconds = Number(seconds) % 60;
    const secs = seconds;
    return `${hrs}:${mins}:${secs}`;
};

/**
 *
 * @param {*} url i.e. source url for the video given by youtubedl
 * @param {*} seekingTimeFormatted i.e. time where the gif should start
 * @param {*} durationFormatted i.e. the duration of the gif
 * @returns The Command to be run by ffmpeg_cli
 */
const getCommandToRunWithFFMPEG = (
    url,
    seekingTimeFormatted,
    durationFormatted
) => {
    return `-y -ss ${seekingTimeFormatted} -i "${url}" -t ${durationFormatted} -f h264 -codec copy out.mp4`;
};

app.get("/gifit", (req, res) => {
    if (process.env.NODE_ENV === "production") {
        res.set({
            "Content-Type": "image/jpg", // mime-type for gif file
            "Content-Disposition": "attachment;filename='GifIt.gif'", // Making the File donwloadable
        });
    } else {
        res.set({
            "Access-Control-Allow-Origin": "http://localhost:3000", // Origin where React App is running, to Allow Cross-Origin receiving of response sent from here.
            "Content-Type": "image/jpg", // mime-type for gif file
            "Content-Disposition": "attachment;filename='GifIt.gif'", // Making the File donwloadable
        });
    }

    const watchUrl = req.query.watchUrl;
    const seekingTime = req.query.seekingTime; // in seconds
    const duration = req.query.duration; // in seconds

    /**
     * Example Values:
     * const watchUrl = "http://www.youtube.com/watch?v=jeaTOlDATzg";
     * const seekingTime = 5;
     * const duration = 10;
     */

    const seekingTimeFormatted = getFormatedTimeInput(seekingTime);
    const durationFormatted = getFormatedTimeInput(duration);

    console.log(
        "LOG: seeking:",
        seekingTimeFormatted,
        ", durationFormatted:",
        durationFormatted
    );

    youtubedl(watchUrl, {
        dumpSingleJson: true,
        noWarnings: true,
        noCallHome: true,
        noCheckCertificate: true,
        preferFreeFormats: true,
        youtubeSkipDashManifest: true,
        f: "mp4",
    })
        .then(async (output) => {
            console.log("LOG: Got the Source URL. Getting the gif now...");
            const url = output.url;
            const cmd = getCommandToRunWithFFMPEG(
                url,
                seekingTimeFormatted,
                durationFormatted
            );
            try {
                // await ffmpeg_cli.run(cmd);
                console.log("LOG: PART: 1 Done");
                await ffmpeg_cli.run(
                    `-y -i out.mp4 -vf "fps=20,scale=500:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" -loop 0 out.gif`
                );
                console.log("LOG: Got the gif.");
                res.sendFile("out.gif", { root: __dirname }, (err) => {
                    console.log("LOG: Success: Sent the Output Gif File.", err);
                });
            } catch (err) {
                console.log("LOG: Error: Probably in ffmpeg_cli:", err);
                res.sendFile("fail.gif", { root: __dirname }, (err) => {
                    console.log(
                        "LOG: Error: Failed Sending the Output Gif File."
                    );
                });
            }
        })
        .catch((e) => res.send("LOG: Error: Bad Api Call " + e));
});

if (process.env.NODE_ENV === "production") {
    console.log("LOG: Running in Production.");
    app.use(express.static("build"));
    app.get("/", (req, res) => {
        res.sendFile("index.html", (err) => {
            console.log("LOG: index.html folder is served.");
        });
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Listening at ${port}`));
