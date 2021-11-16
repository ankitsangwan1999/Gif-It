import React from "react";
import "../styles/VideoActions.css";

const VideoActions = ({
    videoDetails,
    setVideoDetails,
    showEditControls,
    setShowEditControls,
}) => {
    return (
        <div className="VideoActions">
            <details className="btn btn0">
                <summary>
                    <b>Description</b>
                </summary>
                <p className="VideoDescriptionPara">
                    {videoDetails.video.snippet.description}
                </p>
            </details>
            {showEditControls === true ? (
                <button
                    className="btn btn1"
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
                    className="btn btn2"
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
