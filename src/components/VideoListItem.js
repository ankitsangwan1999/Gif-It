import React from "react";
import "../styles/VideoListItem.css";

const VideoListItem = ({ videoItem }) => {
    const videoId = videoItem.id.videoId;
    const url = "https://youtube.com/embed/" + videoId;

    return (
        <div className="VideoListItem">
            <img
                width="100px"
                height="100px"
                // TODO: ISSUE: Make this image to be the thumbnail of the Current Video
                src="http://github.com/ankitsangwan1999.png"
                alt="Ankit"
            ></img>

            {/* TODO: ISSUE: Make this Video to Open inside the Player, instead
            of playing in separate Page. */}
            <a style={{ padding: "5px" }} href={url}>
                {videoItem.snippet.title}
            </a>
        </div>
    );
};

export default VideoListItem;
