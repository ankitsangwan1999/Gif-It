import React from "react";
import "../styles/VideoActions.css";

// TODO: ISSUE: Style the buttons used in this Component
const VideoActions = ({
    videoDetails,
    setVideoDetails,
    showEditControls,
    setShowEditControls,
}) => {
    return (
        <div className="VideoActions">
            <details>
                <summary><b>Description</b></summary>
                <p className="VideoDescriptionPara">{videoDetails.video.snippet.description}</p>
            </details>
            {showEditControls === true ? (
                <button
                    onClick={(e) => {
                        setVideoDetails((prev) => {
                            return {
                                ...prev,
                                isPreview: false,
                            };
                        });
                        setShowEditControls(false);
                    }}
                >
                    Show Suggestions
                </button>
            ) : (
                <button
                    className="GifItButton"
                    onClick={(e) => {
                        setShowEditControls(true);
                    }}
                >
                    Use Video For Making GIF
                </button>
            )}
        </div>
    );
};

export default VideoActions;
