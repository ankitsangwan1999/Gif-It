import React, { useRef } from "react";
import "../styles/EditControls.css";

/**
 * TODO: ISSUE: Alert the Cases when user provides invalid number in duration input
 * E.g. a Negative Number, number of seconds > REACT_APP_MAX_ALLOWED_GIF_LENGTH
 */
const EditControls = ({ videoDetails, setVideoDetails }) => {
    const startRef = useRef(null); // ref for the start-time input element
    const videoClipDurationRef = useRef(null); // ref for video-clip-duration input element

    const showInvalidPrompt = () => {
        alert("Invalid start time!!\nThe start time should be in range of the video duration!")
        startRef.current.value = 0;
    }

    return (
        <div className="EditControls">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Start Time</label>
                        </td>
                        <td>
                            <input
                                ref={startRef}
                                type="number"
                                min="0"
                                defaultValue="0"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Clip Duration</label>
                        </td>
                        <td>
                            <input
                                ref={videoClipDurationRef}
                                type="number"
                                min="0"
                                max={Math.min(
                                    process.env
                                        .REACT_APP_MAX_ALLOWED_GIF_LENGTH,
                                    videoDetails.videoDuration -
                                        videoDetails.start
                                )}
                                defaultValue="0"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button
                                onClick={(e) => {
                                    if(startRef.current.value >= 0 && startRef.current.value < videoDetails.videoDuration) {
                                        setVideoDetails((prev) => {
                                            return {
                                                ...prev,
                                                start: startRef.current.value,
                                                videoClipDuration:
                                                    videoClipDurationRef.current
                                                        .value,
                                                isPreview: true,
                                                shouldCreateGif: false,
                                            };
                                        });
                                    } else 
                                        showInvalidPrompt();
                                }}
                            >
                                Show Preview
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={(e) => {
                                    if(startRef.current.value >= 0 && startRef.current.value < videoDetails.videoDuration) {
                                        setVideoDetails((prev) => {
                                            return {
                                                ...prev,
                                                start: startRef.current.value,
                                                videoClipDuration:
                                                    videoClipDurationRef.current
                                                        .value,
                                                isPreview: false,
                                                shouldCreateGif: true,
                                            };
                                        });
                                    } else 
                                        showInvalidPrompt();
                                }}
                            >
                                Gif-It Now!
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EditControls;
