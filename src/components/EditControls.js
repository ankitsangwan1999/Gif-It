import React, { useRef } from "react";
import "../styles/EditControls.css";

/**
 * TODO: ISSUE: Alert the Cases when user provides invalid number in start-time input
 * E.g. a Negative Number, number of seconds > Duration of the Video
 */
/**
 * TODO: ISSUE: Alert the Cases when user provides invalid number in duration input
 * E.g. a Negative Number, number of seconds > REACT_APP_MAX_ALLOWED_GIF_LENGTH
 */
const EditControls = ({ videoDetails, setVideoDetails }) => {
    const startRef = useRef(null); // ref for the start-time input element
    const videoClipDurationRef = useRef(null); // ref for video-clip-duration input element

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
                                autoFocus
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
                                }}
                            >
                                Show Preview
                            </button>
                        </td>
                        <td>
                            <button
                                onClick={(e) => {
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
