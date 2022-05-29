import { atom } from "jotai";

// spotify player
export const spotifyPlayerAtom = atom(null);
export const SDKReady = atom(null);

// Gesture Model initialize atom
// true or false value
export const gestureModelAtom = atom(false);

export const readyAtom = atom((get) =>
  get(gestureModelAtom) === true && get(spotifyPlayerAtom) != null
    ? true
    : false
);

// playlist atoms
export const playlistIdAtom = atom("");
export const playlistStateAtom = atom(null);

// current track atoms
export const trackIdAtom = atom("");
export const trackStateAtom = atom(null);
