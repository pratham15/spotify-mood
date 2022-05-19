import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";

export default function useSpotify() {
  const [spotify, setPlayer] = useState();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const { data: session, status } = useSession();
  const [current_track, setTrack] = useState();

  // token usememo
  const token = useMemo(() => {
    if (session != null && session != undefined) {
      return session.user.accessToken;
    }
  }, [session]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (session != null && session != undefined) {
        console.log("Player Recreated!");
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        setPlayer(player);
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("player_state_changed", async (state) => {
          if (!state) {
            return;
          }
          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then((state) => {
            !state ? setActive(false) : setActive(true);
          });
        });

        player.connect();
        player.activateElement();
      }
    };
  }, [token]);
  return spotify;
}
