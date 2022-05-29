import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { Play, SkipBack, SkipForward } from "phosphor-react";
import { spotifyPlayerAtom } from "../atoms/spotifyPlayerAtom";
import useSongInfo from "../Hooks/useSongInfo";

export default function Player(props) {
  const songInfo = useSongInfo();
  //console.log("Player.js: songInfo:", songInfo);
  //console.log("Player.js songinfo", songInfo);
  const player = useAtomValue(spotifyPlayerAtom);
  const nextSong = () => {
    player.togglePlay();
  };
  return (
    <Box
      pos="absolute"
      height="100px"
      w="100vw"
      bottom="0"
      left="0"
      as="footer"
      bg="#181818"
    >
      <HStack color="white" h="full" justifyContent="center" align="center">
        <Flex w="30%" gap="5" pl="20px">
          {songInfo && (
            <>
              <Image boxSize={"50px"} src={songInfo?.image} alt="Song image" />
              <Flex direction={"column"} justify="start" align={"start"}>
                <Text noOfLines={1} color="white">
                  {songInfo?.name}
                </Text>
                <Text noOfLines={1} color="gray.500">
                  {songInfo?.artists}
                </Text>
              </Flex>
            </>
          )}
        </Flex>

        <Flex justify={"center"} align="center" w="40%" gap="40px">
          <IconButton
            variant={"ghost"}
            _hover={{}}
            _focus={{}}
            onClick={nextSong}
            icon={<SkipBack size={20} />}
          />
          <IconButton
            _focus={{}}
            variant={"ghost"}
            _hover={{}}
            icon={<Play size={32} />}
          />
          <IconButton
            variant={"ghost"}
            _hover={{}}
            _focus={{}}
            icon={<SkipForward size={20} />}
          />
        </Flex>
        <Box w="30%">
          <Text align="center">Right</Text>
        </Box>
      </HStack>
    </Box>
  );
}
