import { useAtom } from "jotai";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { trackIdAtom } from "../atoms/spotifyPlayerAtom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
export default function useSpotify() {
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useAtom(trackIdAtom);
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") signIn();
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);
  return spotifyApi;
}
