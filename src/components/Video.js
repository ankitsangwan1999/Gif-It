import React, { useEffect, useState } from "react";
import "../styles/Video.css";
import VideoActions from "./VideoActions";
import YouTube from "react-youtube"; // https://www.npmjs.com/package/react-youtube

const Video = ({
    videoDetails,
    setVideoDetails,
    showEditControls,
    setShowEditControls,
}) => {
    const { video, start, videoClipDuration, isPreview } = videoDetails;

    /**
     * Details Required in Youtube Iframe API
     */
    const videoId = video.id.videoId;
    const options = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            controls: 1,
        },
    };

    /**
     * State representing the player object
     */
    const [player, setPlayer] = useState(undefined);

    /**
     * Event-Handler for when the Player is Ready to Play the Video
     */
    const onReadyVideo = (e) => {
        console.log("LOG: Player: Ready:");
        setPlayer(e.target);
    };

    /**
     * If it's a preview, seek to start point and then play the video.
     * Note: Normally player will be defined by now, because first player is loaded
     * and after that "Use Video to Make Gif." Button is Shown which eventually contains the Preview Button.
     */
    if (isPreview) {
        player.seekTo(start);
        player.playVideo();
    }
    /**
     * It contains the TimeOut Timer Value. It is helpful in clearing the Timer, whenever we want.
     */
    let currentTimer = 0;

    /**
     * Event-Handler for when the Player's state is Changed
     * Refer: https://developers.google.com/youtube/iframe_api_reference
     * -1 – unstarted
     *  0 – ended
     *  1 – playing
     *  2 – paused
     *  3 – buffering
     *  5 – video cued
     */
    const onStateChangeVideo = (e) => {
        if (player.getPlayerState() === 1) {
            if (isPreview) {
                // console.log(
                //     "LOG: Preview:",
                //     start,
                //     Number(start) + Number(videoClipDuration)
                // );

                // get the rate at which the video is being played
                const rate = player.getPlaybackRate();

                // Time Remaining in ending of the Preview
                const remainingTime =
                    (Number(start) +
                        Number(videoClipDuration) -
                        player.getCurrentTime()) /
                    rate;

                /**
                 * Starting a new Timer for the rest of the Time Remaining
                 * 0.4 is just a thesold value for accounting slight delay in actual/practical play/pause operation
                 */
                currentTimer = setTimeout(() => {
                    player.pauseVideo();
                }, Number(remainingTime + 0.4) * 1000);
            }
        } else if (player.getPlayerState() === 2) {
            // Removing the Current Timer
            clearTimeout(currentTimer);
        }
    };

    // Removing the Timer, in componentWillUnmount phase
    useEffect(() => {
        return () => {
            clearTimeout(currentTimer);
        };
    }, []);

    return (
        <div className="Video">
            <YouTube
                videoId={videoId} // defaults -> null
                opts={options} // defaults -> {}
                onReady={(e) => onReadyVideo(e)} // defaults -> noop
                onStateChange={onStateChangeVideo} // defaults -> noop
            />
            {player !== undefined && (
                <VideoActions
                    setVideoDetails={setVideoDetails}
                    showEditControls={showEditControls}
                    setShowEditControls={setShowEditControls}
                />
            )}
        </div>
    );
};

export default Video;
