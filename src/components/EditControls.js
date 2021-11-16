import React, { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/EditControls.css";

const EditControls = ({ videoDetails, setVideoDetails }) => {
    const startRef = useRef(null); // ref for the start-time input element
    const videoClipDurationRef = useRef(null); // ref for video-clip-duration input element

    const showInvalidPrompt = () => {
        toast.configure();
        toast(
            `Invalid start time & duration !!\nThe start time should be in range [0, ${videoDetails.videoDuration}].\nThe duration should be in range of
         [0,${process.env.REACT_APP_MAX_ALLOWED_GIF_LENGTH}].`,
            { position: toast.POSITION.TOP_CENTER }
        );
        startRef.current.value = 0;
        videoClipDurationRef.current.value = 0;
    };

    const checkTimeValidity = () => {
        let StartTime = parseInt(startRef.current.value);
        let Duration = parseInt(videoClipDurationRef.current.value);
        return (
            StartTime >= 0 &&
            StartTime <= videoDetails.videoDuration &&
            Duration >= 0 &&
            Duration <= process.env.REACT_APP_MAX_ALLOWED_GIF_LENGTH &&
            StartTime + Duration <= videoDetails.videoDuration
        );
    };

    return (
        <div className="EditControls">
            <table>
                <colgroup>
                    <col span="1" style={{ width: "55%" }} />
                    <col span="1" style={{ width: "45%" }} />
                </colgroup>
                <tbody>
                    <tr>
                        <td align="right">Start Time</td>
                        <td align="left">
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
                        <td align="right">
                            <label>Clip Duration</label>
                        </td>
                        <td align="left">
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
                        <td align="right">
                            <button
                                onClick={(e) => {
                                    if (checkTimeValidity()) {
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
                                    } else showInvalidPrompt();
                                }}
                            >
                                Show Preview
                            </button>
                        </td>
                        <td align="left">
                            <button
                                onClick={(e) => {
                                    if (checkTimeValidity()) {
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
                                    } else showInvalidPrompt();
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
