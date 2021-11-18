import React from "react";
import VideoListItem from "./VideoListItem";
import "../styles/VideoSuggestions.css";

const VideoSuggestions = ({ videosList, setVideosList }) => {
    return (
        <div className="VideoSuggestions">
            {videosList.map((video, index) => {
                return index > 0 ? (
                    <VideoListItem
                        key={video.etag}
                        videoItem={video}
                        setVideosList={setVideosList}
                        thumbnail={video.snippet.thumbnails.default.url}
                        index={index}
                    />
                ) : (
                    <></>
                );
            })}
        </div>
    );
};

export default VideoSuggestions;
