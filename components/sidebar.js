import {
  Box,
  Button,
  Divider,
  Flex,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { playlistIdAtom } from "../atoms/spotifyPlayerAtom";
import useSpotify from "../Hooks/useSpotify";
const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useAtom(playlistIdAtom);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
        if (playlistId === "") {
          setPlaylistId(data.body.items[0].id);
        }
      });
    }
  }, [spotifyApi, session]);

  return (
    <VStack minW="220px" align={"start"}>
      <VStack align={"start"} color="gray.400">
        <Button
          variant="ghost"
          onClick={signOut}
          leftIcon={<HomeIcon height={"20"} />}
        >
          Home
        </Button>
        <Button variant="ghost" leftIcon={<SearchIcon height="20" />}>
          Search
        </Button>
        <Button variant="ghost" leftIcon={<LibraryIcon height="20" />}>
          Your Library
        </Button>
        <Button variant="ghost" leftIcon={<PlusCircleIcon height="20" />}>
          Create Playlist
        </Button>
        <Button variant="ghost" leftIcon={<HeartIcon height="20" />}>
          Liked Songs
        </Button>
      </VStack>
      <Divider />
      {/* Playlist items*/}
      <VStack
        align={"start"}
        p="5"
        spacing={"3"}
        overflowY="scroll"
        sx={{
          "&::-webkit-scrollbar": {
            width: "16px",
            borderRadius: "8px",
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
        }}
      >
        {playlists.map((playlist) => (
          <Text
            color={playlist.id === playlistId ? "white" : `gray.400`}
            _hover={{
              color: "white",
              cursor: "pointer",
            }}
            key={playlist.id}
            onClick={() => {
              setPlaylistId(playlist.id);
            }}
          >
            {playlist.name}
          </Text>
        ))}
      </VStack>
    </VStack>
  );
};

export default Sidebar;
