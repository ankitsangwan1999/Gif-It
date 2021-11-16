import React from "react";
import "../styles/VideoActions.css";

// TODO: ISSUE: Style the buttons used in this Component
const VideoActions = ({
    setVideoDetails,
    showEditControls,
    setShowEditControls,
}) => {
    const showVideoDescription = (e) => {
        alert(
            "Issue: Make a Collapsible Paragraph(having description of the video) and show/hide it as this button is Clicked."
        );
    };
    return (
        <div className="VideoActions">
            <button
                onClick={(e) => {
                    showVideoDescription(e);
                }}
            >
                Description
            </button>
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
                    onClick={(e) => {
                        setShowEditControls(true);
                    }}
                >
                    Use Video for making Gif
                </button>
            )}
        </div>
    );
};

export default VideoActions;
