import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { useSession } from "next-auth/react";
import { Spinner } from "phosphor-react";
import { useEffect, useState } from "react";
import { playlistIdAtom, playlistStateAtom } from "../atoms/spotifyPlayerAtom";
import useSpotify from "../Hooks/useSpotify";
import Songs from "./Songs";

export default function Middle({ children }) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const playlistId = useAtomValue(playlistIdAtom);
  const [playlist, setPlaylist] = useAtom(playlistStateAtom);
  useEffect(() => {
    if (spotifyApi.getAccessToken())
      spotifyApi.getPlaylist(playlistId).then((data) => {
        setPlaylist(data);
      });
  }, [spotifyApi, playlistId]);

  return playlist === null ? (
    <Center>
      <Spinner></Spinner>
    </Center>
  ) : (
    <>
      <Flex
        align="flex-start"
        bg="#121212"
        overflowY={"scroll"}
        direction={"column"}
        w="full"
        pb="100px"
      >
        <Flex
          align="flex-end"
          bgGradient="linear(to-b, white, black)"
          color="white"
          w="full"
        >
          <HStack mt="100px" align={"flex-end"} ml="4" mb="10">
            <Image
              boxSize={"200"}
              src={playlist?.body.images[0].url}
              alt="Playlist image"
              boxShadow={"2xl"}
            />
            <VStack align={"flex-start"} ml="2">
              <Text>Playlist</Text>
              <Text fontSize={"5xl"}>{playlist?.body.name}</Text>
            </VStack>
          </HStack>
        </Flex>
        <Songs />
      </Flex>
    </>
  );
}
