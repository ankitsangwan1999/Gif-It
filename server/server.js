import express from "express";
import path from "path";
import makeGif from "./helpers/makeGif.mjs";
import dotenv from "dotenv";
import sendEvent from "./helpers/sendEvent.mjs";
const __dirname = path.resolve(); // __dirname here represent the absolute path to the root of the Project
dotenv.config();
const app = express();
/**
 * Check All env vars currently Used
 */
console.log(process.env);

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

app.get("/gifit", (req, res) => {
    /**
     * Example Values:
     * const watchUrl = "http://www.youtube.com/watch?v=jeaTOlDATzg";
     * const seekingTime = 5;
     * const duration = 10;
     */
    const watchUrl = req.query.watchUrl;
    const seekingTime = req.query.seekingTime; // in seconds
    const duration = req.query.duration; // in seconds
    const seekingTimeFormatted = getFormatedTimeInput(seekingTime);
    const durationFormatted = getFormatedTimeInput(duration);
    console.log("Log: Query:", watchUrl, seekingTime, duration);

    const headers = {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN, // Origin where React App is running, to Allow Cross-Origin receiving of response sent from here.
        "Content-Type": "text/event-stream",
    };
    res.set(headers);

    // When Connection is Closed from Client Side.
    res.on("close", () => {
        console.log("Closed From the Client.");
        res.end(); // We cannot do res.send() or res.write() after this.
    });

    sendEvent(res, {
        message: `Will Seek for: ${seekingTimeFormatted}, and duration is: ${durationFormatted}`,
        state: "Pending",
    });

    makeGif(res, watchUrl, seekingTimeFormatted, durationFormatted)
        .then(() => {
            sendEvent(res, {
                message: `Your Gif is Ready for Download...`,
                state: "Completed",
            });
        })
        .catch((err) => {
            sendEvent(res, {
                message: `Try Again.`,
                state: "Failed",
            });
        });
});

app.get("/download", (req, res) => {
    if (process.env.NODE_ENV === "production") {
        res.set({
            "Content-Type": "image/jpg", // mime-type for gif file
            "Content-Disposition": "attachment;filename=GifIt.gif", // Making the File donwloadable
        });
    } else {
        res.set({
            "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN, // Origin where React App is running, to Allow Cross-Origin receiving of response sent from here.
            "Content-Type": "image/jpg", // mime-type for gif file
            "Content-Disposition": "attachment;filename=GifIt.gif", // Making the File donwloadable
        });
    }
    res.sendFile("out.gif", { root: __dirname }, (err) => {
        if (err) {
            console.log("LOG: Error: Couldn't Send the File");
        } else {
            console.log("LOG: Success: Sent the Output Gif File.");
        }
    });
});

if (process.env.NODE_ENV === "production") {
    console.log("LOG: Running in Production.");
    app.use(express.static("build"));
    app.get("/", (req, res) => {
        res.sendFile("index.html", (err) => {
            console.log("LOG: index.html folder is served.");
        });
    });
} else {
    console.log("LOG: Running in Development.");
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Listening at ${port}`));
