import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomId } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomId], getRoom);

  return (
    <Box px={{ base: 10, lg: 40 }} mt={10}>
      <Skeleton height="43px" width="50%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={4}
        gap={2}
        rounded="xl"
        overflow="hidden"
        height="50vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow="hidden"
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="full" w="full">
              <Image
                w="full"
                h="full"
                objectFit="cover"
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
