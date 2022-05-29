// import styles
import { Prediction } from "../../lib/GestureDetection/Prediction";
import { useEffect, useState, useRef } from "react";
import { useAtomValue } from "jotai";
import {
  gestureModelAtom,
  spotifyPlayerAtom,
} from "../../atoms/spotifyPlayerAtom";
import Webcam from "react-webcam";
import { GestureHandler } from "../../lib/GestureDetection/GestureHandler";

// setyp & initialization
// -----------------------------------------------------------------------------
export default function VideoStream() {
  // store a reference to the player video
  const isLoaded = useAtomValue(gestureModelAtom);
  const videoRef = useRef(null);

  const player = useAtomValue(spotifyPlayerAtom);

  useEffect(() => {
    if (isLoaded && spotifyPlayerAtom) {
      const timer = setInterval(() => {
        if (videoRef.current && videoRef.current.video.readyState === 4) {
          detect();
        }
      }, 1500);
      return () => clearInterval(timer);
    }
  });

  const detect = async () => {
    const video = videoRef.current.video;
    const gesture = await Prediction.predictGesture(video, 9);
    //const gesture = await detectPlayerGesture(150, playerVideo, player);
    console.log("Gesture detected!", gesture);
    GestureHandler(player, gesture);
  };

  return (
    <Webcam
      ref={videoRef}
      style={{
        position: "absolute",
        visibility: "hidden",
        marginLeft: "0",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zindex: 0,
        width: "4px",
        height: "3px",
        display: "inline",
      }}
    />
  );
}
