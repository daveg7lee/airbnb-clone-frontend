import {
  Box,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      columnGap={4}
      rowGap={8}
      px={40}
      mt={10}
    >
      <VStack alignItems="flex-start">
        <Box overflow={"hidden"} mb={3} rounded="3xl">
          <Image
            h="280"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-47181423/original/39c9d4e7-78d0-4807-9f0d-3029d987d02a.jpeg?im_w=720"
          />
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
          <Text fontSize="sm" color="gray.600">
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize="sm" color="gray.600">
          <Text as="b">$72</Text> / night
        </Text>
      </VStack>
    </Grid>
  );
}
