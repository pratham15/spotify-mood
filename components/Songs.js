import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { Spinner } from "phosphor-react";
import { playlistStateAtom, trackIdAtom } from "../atoms/spotifyPlayerAtom";
import useSpotify from "../Hooks/useSpotify";
import milisecondsToMinutes from "../utils/convertTime";

export default function Songs() {
  const playlistState = useAtomValue(playlistStateAtom);
  const [currentId, setCurrentId] = useAtom(trackIdAtom);
  const spotifyApi = useSpotify();

  const playSong = async (id) => {
    setCurrentId(id);
    spotifyApi.play({
      uris: [`spotify:track:${id}`],
    });
  };

  return playlistState === null ? (
    <Spinner />
  ) : (
    <VStack w="full" align={"flex-start"}>
      {playlistState.body.tracks.items.map((item, index) => (
        // <Grid  templateColumns="repeat(3, 1fr)" w="full" key={item.id}>
        //Spotify Song
        <Grid
          onClick={() => playSong(item.track.id)}
          borderRadius={"md"}
          _hover={{
            backgroundColor: "gray.900",
            cursor: "pointer",
          }}
          py="2"
          templateColumns="[first] 4fr [line2] 4fr [line3] 2fr [end]"
          w="full"
          key={item.track.id}
          columnGap="10"
        >
          {/* <HStack align={"center"} gap="5"> */}
          <Grid
            columnGap={"20px"}
            templateColumns="[first] 10% [line2] auto [end]"
          >
            <Flex align="center" justify={"flex-end"}>
              <Text color="white">{index + 1}</Text>
            </Flex>
            <Flex gap="5">
              <Image
                boxSize={"50px"}
                src={item.track.album.images[0].url}
                alt="Song image"
              />
              <Flex direction={"column"} justify="start" align={"start"}>
                <Text noOfLines={1} color="white">
                  {item.track.name}
                </Text>
                <Text noOfLines={1} color="gray.500">
                  {item.track.artists[0].name}
                </Text>
              </Flex>
            </Flex>
          </Grid>
          {/* </HStack> */}
          <Flex align={"center"}>
            <Text noOfLines={1} color="gray.400">
              {item.track.album.name}
            </Text>
          </Flex>
          <Flex align={"center"}>
            <Text color="gray.400">
              {milisecondsToMinutes(item.track.duration_ms)}
            </Text>
          </Flex>
        </Grid>
      ))}
    </VStack>
  );
}

// import {
//   Flex,
//   Grid,
//   GridItem,
//   HStack,
//   Image,
//   Spacer,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import { useAtomValue } from "jotai";
// import { Spinner } from "phosphor-react";
// import { playlistStateAtom } from "../atoms/spotifyPlayerAtom";

// export default function Songs() {
//   const playlistState = useAtomValue(playlistStateAtom);

//   return playlistState === null ? (
//     <Spinner />
//   ) : (
//     <VStack ml="10" align={"flex-start"}>
//       {playlistState.body.tracks.items.map((item, index) => (
//         // <Grid  templateColumns="repeat(3, 1fr)" w="full" key={item.id}>
//         <Grid
//           templateColumns="[index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(120px,1fr)"
//           w="full"
//           key={item.id}
//           columnGap="10"
//         >
//           <Text color="white" w="32px">
//             {index + 1}
//           </Text>
//           <Flex>
//             <Image
//               boxSize={"50px"}
//               src={item.track.album.images[0].url}
//               alt="Song image"
//             />
//             <Flex direction={"column"} justify="start" align={"start"}>
//               <Text noOfLines={1} color="white">
//                 {item.track.name}
//               </Text>
//               <Text noOfLines={1} color="gray.500">
//                 {item.track.artists[0].name}
//               </Text>
//             </Flex>
//           </Flex>
//           <Flex align={"center"}>
//             <Text color="white"> Album</Text>
//           </Flex>
//           <Flex align={"center"}>
//             <Text color="white">Duration</Text>
//           </Flex>
//           <Text color="white">Date Added</Text>
//         </Grid>
//       ))}
//     </VStack>
//   );
// }
