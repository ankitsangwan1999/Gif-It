import React from "react";
import VideoListItem from "./VideoListItem";
import "../styles/VideoSuggestions.css";

const VideoSuggestions = ({ videosList }) => {
    return (
        <div className="VideoSuggestions">
            {videosList.map((video, index) => {
                return index > 0 ?
                    < VideoListItem key={video.etag} videoItem={video} />
                    :
                    <div></div>
            })}
        </div>
    );
};

export default VideoSuggestions;
