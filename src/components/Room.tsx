import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems="flex-start">
      <Box position="relative" overflow={"hidden"} mb={3} rounded="3xl">
        <Image
          minH="280"
          src="https://a0.muscache.com/im/pictures/miso/Hosting-47181423/original/39c9d4e7-78d0-4807-9f0d-3029d987d02a.jpeg?im_w=720"
        />
        <Button
          variant="unstyled"
          color="white"
          position="absolute"
          top={0}
          right={0}
        >
          <FaRegHeart size={20} />
        </Button>
      </Box>
      <Box>
        <Grid templateColumns={"6fr 1fr"} gap={2}>
          <Text noOfLines={1} fontSize="md" as="b">
            Sindun-myeon, Icheon-si, 경기도, 한국
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize="sm" color={gray}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize="sm" color={gray}>
        <Text as="b">$72</Text> / night
      </Text>
    </VStack>
  );
}
