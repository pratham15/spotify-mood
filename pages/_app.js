import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" async></Script>

      <SessionProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
