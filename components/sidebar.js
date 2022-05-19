import { Box, Button, Divider, VStack } from "@chakra-ui/react";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
const Sidebar = () => {
  return (
    <Box minH="100vh">
      <VStack align={"start"} color="gray.400" fontSize={"sm"}>
        <Button variant="ghost" leftIcon={<HomeIcon height={"20"} />}>
          Home
        </Button>
        <Button variant="ghost" leftIcon={<SearchIcon height="20" />}>
          Search
        </Button>
        <Button variant="ghost" leftIcon={<LibraryIcon height="20" />}>
          Your Library
        </Button>
        <Button variant={"ghost"} leftIcon={<PlusCircleIcon height="20" />}>
          Create Playlist
        </Button>
        <Button variant={"ghost"} leftIcon={<HeartIcon height="20" />}>
          Liked Songs
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
