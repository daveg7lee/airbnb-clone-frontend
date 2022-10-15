import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
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
        <Button leftIcon={<FaGithub />} colorScheme="gray" w="full">
          Continue with Gihub
        </Button>
        <Button leftIcon={<FaComment />} colorScheme="yellow" w="full">
          Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
