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

interface RoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: RoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems="flex-start">
      <Box position="relative" overflow={"hidden"} mb={3} rounded="xl">
        <Image minH="280" src={imageUrl} objectFit="cover" />
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
            {name}
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize="sm" color={gray}>
          {city}, {country}
        </Text>
      </Box>
      <Text fontSize="sm" color={gray}>
        <Text as="b">${price}</Text> / night
      </Text>
    </VStack>
  );
}
