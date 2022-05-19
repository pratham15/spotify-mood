import { useState } from "react";
import useSpotify from "../../hooks/useSpotify";
import Home from "../../pages";
import { Prediction } from "../../lib/GestureDetection/Prediction";
import { useRecoilState } from "recoil";
import { songInfo } from "../../atoms/songInfo";

export default function detectPlayerGesture(requiredDuration, playerVideo) {
  let lastGesture = "";
  let gestureDuration = 0;
  console.log("Predicting!");
  const maxTime = Date.now();
  const predictNonblocking = () => {
    //setTimeout(() => {
    const predictionStartTS = Date.now();
    // if time more then 2 secs then return not found
    if (Date.now() - maxTime > 2000) {
      console.log("Time out!");
      return;
    }
    // predict gesture (require high confidence)
    Prediction.predictGesture(playerVideo, 9).then((playerGesture) => {
      //console.log(playerGesture);
      if (playerGesture != "") {
        if (playerGesture == lastGesture) {
          // keeps holding the same gesture
          // -> keep timer running
          const deltaTime = Date.now() - predictionStartTS;
          gestureDuration += deltaTime;
        } else {
          // detected a different gesture
          // -> reset timer
          lastGesture = playerGesture;
          gestureDuration = 0;
        }
      } else {
        lastGesture = "";
        gestureDuration = 0;
      }

      if (gestureDuration < requiredDuration) {
        // update timer and repeat
        predictNonblocking();
      } else {
        console.log("Gesture detected!", playerGesture);
        //player.nextTrack();
      }
    });
    //}, 0);
  };
  predictNonblocking();
  //console.log(gestureFinal);
}
