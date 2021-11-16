import React from "react";
import VideoListItem from "./VideoListItem";
import "../styles/VideoSuggestions.css";

const VideoSuggestions = ({ videosList }) => {
    return (
        <div className="VideoSuggestions">
            {videosList.map((video) => (
                <VideoListItem key={video.etag} videoItem={video} />
            ))}
        </div>
    );
};

export default VideoSuggestions;
