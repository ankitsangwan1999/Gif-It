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
            {/* <button
                onClick={(e) => {
                    showVideoDescription(e);
                }}
            >
                Description
            </button> */}
            <details>
                <summary><b>Description</b></summary>
                <p style={{'margin': '0.5em 1em'}}>{videoDetails.video.snippet.description}</p>
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
                    style={{'margin': '1em 1em', 'padding': '0.5em 0', 'fontSize': '1rem'}}
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
