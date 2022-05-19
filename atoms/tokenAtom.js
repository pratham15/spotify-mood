import { atom } from "jotai";
import { get } from "spotify-web-api-node/src/http-manager";

export const tokenAtom = atom("");
export const spotifySDKPlayerAtom = atom(async (get) => {
  const token = await tokenAtom.get();
  if (token === "") return null;

  const player = new window.Spotify.Player({
    name: "Web Playback SDK",
    getOAuthToken: (cb) => {
      cb(token);
    },
  });

  player.addListener("ready", ({ device_id }) => {
    setPlayer(player);
    console.log("Ready with Device ID", device_id);
  });

  player.addListener("not_ready", ({ device_id }) => {
    console.log("Device ID has gone offline", device_id);
  });
});
