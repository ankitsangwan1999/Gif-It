import React, { useState, useEffect } from "react";
import Video from "./Video.js";
import Progress from "./Progress.js";
import getVideoDetails from "../api/getVideoDetails.js";
import EditControls from "./EditControls.js";
import VideoSuggestions from "./VideoSuggestions.js";
import downloadGif from "../api/downloadGif.js";
import "../styles/MainContent.css";
import LoadingGif from "../static/loading.gif";
import Loader from "react-loader-spinner";

let PROGRESS_EVENTS_ENDPOINT =
    process.env.REACT_APP_BACKEND_ORIGIN_DEV + "/gifit";
if (process.env.NODE_ENV === "production") {
    PROGRESS_EVENTS_ENDPOINT =
        process.env.REACT_APP_BACKEND_ORIGIN_PROD + "/gifit";
}

const MainContent = ({ videosList }) => {
    const [messages, setMessages] = useState([]);
    const [showEditControls, setShowEditControls] = useState(false);
    const [videoDetails, setVideoDetails] = useState({
        video: null,
        videoDuration: 0, // Duration of original video
        start: 0, // Start Time of Video Clip set by User
        videoClipDuration: 0, // Clip duration set by user
        isPreview: false, // whether to show preview in Video Component
        shouldCreateGif: false, // whether to convert to gif?
    });

    const getDurationInSeconds = (duration) => {
        // e.g. duration = "PT11M52S", "PT1H33M1S", "PT3M", "PT1H1S"
        let ans = 0;

        let hr = 0,
            min = 0,
            sec = 0;
        let list = duration.split(/PT/);
        duration = list[1];

        list = duration.split(/H/);
        if (list.length === 1) duration = list[0];
        else {
            duration = list[1];
            if (list[0] !== "") hr = parseInt(list[0]);
        }

        list = duration.split(/M/);
        if (list.length === 1) duration = list[0];
        else {
            duration = list[1];
            if (list[0] !== "") min = parseInt(list[0]);
        }

        list = duration.split(/S/);
        if (list.length === 1) duration = list[0];
        else {
            duration = list[1];
            if (list[0] !== "") sec = parseInt(list[0]);
        }

        ans = sec + min * 60 + hr * 60 * 60;
        return ans;
    };

    useEffect(() => {
        // Getting Video Details of the video to be played inside the Video Component
        getVideoDetails(
            {
                key: process.env.REACT_APP_YT_API_KEY,
                id: videosList[0].id.videoId,
            },
            (videoDetailsResponse) => {
                const videoDuration = getDurationInSeconds(
                    videoDetailsResponse.contentDetails.duration
                );
                setVideoDetails((prev) => {
                    return {
                        ...prev,
                        video: videosList[0],
                        videoDuration: videoDuration,
                        videoClipDuration: videoDuration,
                    };
                });
            }
        );
    }, [videosList]);

    /**
     * This useEffect have 4 dependency item, though we care about only shouldCreateGif.
     */
    useEffect(() => {
        if (videoDetails.shouldCreateGif === true) {
            const videoId = videoDetails.video.id.videoId;
            const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const url = `${PROGRESS_EVENTS_ENDPOINT}?seekingTime=${videoDetails.start}&watchUrl=${watchUrl}&duration=${videoDetails.videoClipDuration}`;
            const eventSrc = new EventSource(url);

            /**
             * Event handler for when sse-connection receives event-message from server
             */
            eventSrc.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setMessages((prevState) => [...prevState, parsedData.message]);
                if (parsedData.state === "Completed") {
                    setMessages((prevState) => [
                        ...prevState,
                        "Downloading...",
                    ]);
                    downloadGif({}, () => {
                        // This Function will be called by getGif after Gif is Downloaded.
                        setMessages([]);
                        setVideoDetails((prev) => {
                            return { ...prev, shouldCreateGif: false };
                        });
                    });
                    eventSrc.close();
                } else if (parsedData.state === "Failed") {
                    setMessages([]);
                    setVideoDetails((prev) => {
                        return { ...prev, shouldCreateGif: false };
                    });
                    eventSrc.close();
                    alert(parsedData.message);
                }
            };

            /**
             * Event handler for when sse-connection is just opened.
             */
            eventSrc.onopen = (event) => {
                // console.log("LOG: Open:", event);
            };

            /**
             * Event handler for when error occured while connecting with server.
             */
            eventSrc.onerror = (event) => {
                console.log("LOG: Error:", event);
                eventSrc.close();
            };
            return () => {
                eventSrc.close();
                console.log("LOG: EventSrc Closed");
            };
        }
    }, [
        videoDetails.shouldCreateGif,
        videoDetails.video,
        videoDetails.start,
        videoDetails.videoClipDuration,
    ]);

    return (
        <>
            {videoDetails.video === null ? (
                <div className="MainContentLoading">
                    <img
                        src={LoadingGif}
                        className="MainContentLoader"
                        alt="Loading..."
                    />
                </div>
            ) : videoDetails.shouldCreateGif === true ? (
                <div className="MainContentLoading">
                    <Loader
                        type="Bars"
                        color="red"
                        secondaryColor="black"
                        height={40}
                        width={40}
                    />
                    <Progress messages={messages} />
                </div>
            ) : (
                <div className="MainContent">
                    <Video
                        videoDetails={videoDetails}
                        setVideoDetails={setVideoDetails}
                        showEditControls={showEditControls}
                        setShowEditControls={setShowEditControls}
                    />
                    {showEditControls === false ? (
                        <VideoSuggestions
                            videosList={videosList}
                            setVideoDetails={setVideoDetails}
                        />
                    ) : (
                        <EditControls
                            videoDetails={videoDetails}
                            setVideoDetails={setVideoDetails}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default MainContent;
