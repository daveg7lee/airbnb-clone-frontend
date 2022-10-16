import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomId } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomId], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >(["rooms", roomId, "reviews"], getRoomReviews);

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
      <HStack justifyContent="space-between" mt={10} w="60%">
        <VStack alignItems="flex-start">
          <Skeleton height="30px" isLoaded={!isLoading}>
            <Heading fontSize="2xl">House hosted by {data?.owner.name}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <HStack justifyContent="flex-start" w="full">
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <SkeletonCircle isLoaded={!isLoading} size={"59.5"}>
          <Avatar name={data?.owner.name} size="lg" src={data?.owner.avatar} />
        </SkeletonCircle>
      </HStack>
      <Box mt={10}>
        <Heading fontSize="2xl">
          <HStack>
            <FaStar /> <Text>{data?.rating}</Text> <Text>•</Text>
            <Text>
              {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
            </Text>
          </HStack>
        </Heading>
      </Box>
    </Box>
  );
}
