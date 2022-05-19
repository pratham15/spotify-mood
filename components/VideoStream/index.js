// import styles
import { Prediction } from "../../lib/GestureDetection/Prediction";
import { useEffect, useState, useRef } from "react";
import { AspectRatio, Button } from "@chakra-ui/react";
import detectPlayerGesture from "./detectGesture";
import { useAtom, useAtomValue } from "jotai";
import {
  gestureModelAtom,
  spotifyPlayerAtom,
} from "../../atoms/spotifyPlayerAtom";
import { GestureHandler } from "./GestureHandler";

// setyp & initialization
// -----------------------------------------------------------------------------
export default function VideoStream() {
  // store a reference to the player video
  const [mediaStream, setMediaStream] = useState(null);
  const [playerVideo, setPlayerVideo] = useState(undefined);
  const [isLoaded, setIsLoading] = useAtom(gestureModelAtom);
  const playerReady = useAtomValue(spotifyPlayerAtom);
  const videoRef = useRef(null);

  const player = useAtomValue(spotifyPlayerAtom);
  useEffect(() => {
    async function setupWebcamVideo() {
      if (!mediaStream) {
        await setupMediaStream();
      } else {
        const videoCurr = videoRef.current;
        if (!videoCurr) return;
        const video = videoCurr;
        if (!video.srcObject) {
          video.srcObject = mediaStream;
        }
      }
    }
    async function setupMediaStream() {
      try {
        const ms = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });
        setMediaStream(ms);
      } catch (e) {
        alert("Camera is disabled");
        throw e;
      }
    }

    setupWebcamVideo();
    async function onInit() {
      //UI.init();
      //UI.setStatusMessage("Initializing - Please wait a moment");
      const videoPromise = videoRef.current;
      const predictPromise = Prediction.init();

      console.log("Initialize game...");

      Promise.all([videoPromise, predictPromise]).then((result) => {
        // result[0] will contain the initialized video element
        setPlayerVideo(result[0]);
        console.log("Initialization finished");
        setIsLoading(true);
        // game is ready
        //waitForPlayer()
      });
    }
    if (mediaStream) onInit();
  }, [mediaStream]);

  useEffect(() => {
    if (isLoaded && spotifyPlayerAtom) {
      const timer = setInterval(() => {
        console.log("Setting Interval!");
        detect();
      }, 1500);
      return () => clearInterval(timer);
    }
  });

  const detect = async () => {
    const gesture = await Prediction.predictGesture(playerVideo, 9);
    //const gesture = await detectPlayerGesture(150, playerVideo, player);
    console.log("Gesture detected!", gesture);
    GestureHandler(player, gesture);
  };
  return (
    <>
      <video
        className="h-full w-full mx-auto"
        id="video"
        ref={videoRef}
        autoPlay
        muted
      />
    </>
  );
}
