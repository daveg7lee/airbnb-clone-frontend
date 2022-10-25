import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "7b335f7c50a7e2703e1e47f3994b3852",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };

  const params = new URLSearchParams(kakaoParams).toString();
  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text textTransform="uppercase" color="gray.500" fontSize="xs" as="b">
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          href="https://github.com/login/oauth/authorize?client_id=87a54ca322e125a95351&scope=read:user,user:email"
          leftIcon={<FaGithub />}
          colorScheme="gray"
          w="full"
        >
          Continue with Gihub
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          leftIcon={<FaComment />}
          colorScheme="yellow"
          w="full"
        >
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
