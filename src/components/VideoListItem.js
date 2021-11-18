import React from "react";
import "../styles/VideoListItem.css";

const VideoListItem = ({ videoItem, setVideosList, thumbnail, index }) => {
    // const videoId = videoItem.id.videoId;
    // const url = "https://youtube.com/embed/" + videoId;

    return (
        <div
            className="VideoListItem"
            onClick={(e) => {
                setVideosList((prev) => {
                    return [
                        prev[index],
                        ...prev.filter((item, ind) => ind !== index),
                    ];
                });
            }}
        >
            <p>
                <img
                    width="100px"
                    height="100px"
                    src={thumbnail}
                    alt={videoItem.snippet.title}
                />
                {videoItem.snippet.title}
            </p>
        </div>
    );
};

export default VideoListItem;
