import { useAtom, useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { spotifyPlayerAtom, trackIdAtom } from "../atoms/spotifyPlayerAtom";
import useSpotify from "./useSpotify";

export default function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setTrackId] = useAtom(trackIdAtom);
  const [songInfo, setSongInfo] = useState(null);
  const { data: session } = useSession();
  const spotifyPlayer = useAtomValue(spotifyPlayerAtom);
  const getState = async (token) => {
    const data = fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json());
  };
  useEffect(() => {
    if (spotifyApi.getAccessToken() && currentTrackId) {
      console.log("getting song info");
      spotifyApi.getTrack(currentTrackId).then((data) => {
        setSongInfo({
          name: data.body.name,
          album: data.body.album.name,
          artists: data.body.artists.map((artist) => artist.name).join(", "),
          image: data.body.album.images[0].url,
          id: data.body.id,
        });
      });
    }
  }, [currentTrackId, spotifyApi]);
  return songInfo;
}
