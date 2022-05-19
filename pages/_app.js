import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script src="https://sdk.scdn.co/spotify-player.js" async></Script>

      <SessionProvider>
        <RecoilRoot>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
