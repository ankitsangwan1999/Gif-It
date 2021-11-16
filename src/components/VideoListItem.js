import React from "react";
import nextId from "react-id-generator";
import "../styles/VideoListItem.css";
const VideoListItem = ({ videoItem, setVideoDetails, thumbnail }) => {
    const videoId = videoItem.id.videoId;
    const url = "https://youtube.com/embed/" + videoId;
    var htmlId = nextId();
    const handleList = (e) => {
        var list = document.querySelectorAll(".VideoListItem");
        var item = document.querySelectorAll("p");
        for (let i = 0; i < list.length; i++) {
            list[i].style.backgroundColor = "white";
            list[i].style.boxShadow = "0 0 0px 5px white";
        }
        document.getElementById(e.htmlId).style.backgroundColor =
            "rgb(125, 177, 240)";
        document.getElementById(e.htmlId).style.boxShadow =
            "0 0 10px 5px rgba(108, 2, 134, 0.7)";
    };
    return (
        <div
            id={htmlId}
            className="VideoListItem"
            onClick={(e) => {
                handleList({ htmlId });
                setVideoDetails((prev) => {
                    return {
                        ...prev,
                        video: videoItem,
                    };
                });
            }}
        >
            <p>
                <img
                    width="100px"
                    height="100px"
                    // TODO: ISSUE: Make this image to be the thumbnail of the Current Video
                    src={thumbnail}
                    alt="Ankit"
                />
                {videoItem.snippet.title}
            </p>
        </div>
    );
};

export default VideoListItem;
