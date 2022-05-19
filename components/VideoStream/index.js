// import styles
import { Prediction } from "../../lib/GestureDetection/Prediction";
import { useEffect, useState, useRef } from "react";
import { Button } from "@chakra-ui/react";
import detectPlayerGesture from "./detectGesture";
import { useAtomValue } from "jotai";
import { spotifyPlayerAtom } from "../../atoms/spotifyPlayerAtom";

// setyp & initialization
// -----------------------------------------------------------------------------
export default function VideoStream() {
  // store a reference to the player video
  const [mediaStream, setMediaStream] = useState(null);
  const [playerVideo, setPlayerVideo] = useState(undefined);
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

        // game is ready
        //waitForPlayer()
      });
    }
    if (mediaStream) onInit();
  }, [mediaStream]);

  const detGes = async () => {
    const gesture = await detectPlayerGesture(150, playerVideo, player);
    console.log(gesture);
    if (gesture == "scissors") {
      player.nextTrack();
    }
  };
  return (
    <>
      <div className="w-full h-full relative z-0">
        <video
          className="h-full w-full mx-auto"
          id="video"
          ref={videoRef}
          autoPlay
          muted
        />
      </div>
      <Button onClick={detGes}>Detect!</Button>
    </>
  );
}
