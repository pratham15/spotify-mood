import { ChakraProvider } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { useEffect, useCallback } from "react";

import { gestureModelAtom, SDKReady } from "../atoms/spotifyPlayerAtom";
import { GestureInitializer } from "../lib/GestureDetection/Initializer";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [_, setIsLoading] = useAtom(gestureModelAtom);
  const [__, setIsSDKReady] = useAtom(SDKReady);
  //useEffect(() => {
  //GestureInitializer(setIsLoading);
  //}, []);
  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      setIsSDKReady(true);
    };
    GestureInitializer(setIsLoading);
  }, []);

  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" async></Script>

      <SessionProvider session={session}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
