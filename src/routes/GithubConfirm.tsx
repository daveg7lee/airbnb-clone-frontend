import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();

  const confirmLogin = async () => {
    const code = new URLSearchParams(search).get("code");

    if (code) {
      await githubLogIn(code);
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} minH="80vh" spacing={3}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere</Text>
      <Spinner size="md" />
    </VStack>
  );
}
