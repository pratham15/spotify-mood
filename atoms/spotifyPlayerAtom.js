import { atom } from "jotai";

export const spotifyPlayerAtom = atom(null);

export const gestureModelAtom = atom(false);

export const readyAtom = atom((get) =>
  get(gestureModelAtom) != false && get(spotifyPlayerAtom) != null
    ? true
    : false
);
