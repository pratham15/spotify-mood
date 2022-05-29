import { Button, Center, Link } from "@chakra-ui/react";
import { getProviders, signIn } from "next-auth/react";

export default function Login({ providers }) {
  return (
    <Center minHeight="100vh" bg="black" minWidth="100vw">
      <Button
        variant="outline"
        bg="#1DB954"
        color="#191414"
        _hover={{}}
        onClick={() => signIn(providers.spotify.id, { callbackUrl: "/" })}
      >
        Login with {providers.spotify.name}
      </Button>
    </Center>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
