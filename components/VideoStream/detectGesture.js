import { useState } from "react";
import Home from "../../pages";
import { Prediction } from "../../lib/GestureDetection/Prediction";
import { useAtom } from "jotai";
import { spotifyPlayerAtom } from "../../atoms/spotifyPlayerAtom";

let globalValue = "";
export default async function detectPlayerGesture(
  requiredDuration,
  playerVideo
) {
  let lastGesture = "";
  let gestureDuration = 0;
  console.log("Predicting!");
  const maxTime = Date.now();

  console.log("LG TOP", lastGesture);
  const predictNonblocking = async () => {
    const predictionStartTS = Date.now();
    // if time more then 2 secs then return not found
    if (Date.now() - maxTime > 2000) {
      console.log("Time out!");
    }
    // predict gesture (require high confidence)
    await Prediction.predictGesture(playerVideo, 9).then(
      async (playerGesture) => {
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
          await predictNonblocking();
        } else {
          console.log("Gesture detected!", playerGesture);
        }
      }
    );
    return lastGesture;
  };

  return await predictNonblocking();
}
