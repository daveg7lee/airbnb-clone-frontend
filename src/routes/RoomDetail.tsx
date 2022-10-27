import "react-calendar/dist/Calendar.css";
import "../calendar.css";
import {
  Avatar,
  Box,
  Button,
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
import Calendar from "react-calendar";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { useState } from "react";

export default function RoomDetail() {
  const { roomId } = useParams();
  const [dates, setDates] = useState<Date[]>();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomId], getRoom);
  const { data: reviewsData } = useQuery<IReview[]>(
    ["rooms", roomId, "reviews"],
    getRoomReviews
  );
  const { data: checkBookingData, isLoading: isCheckingBooking } = useQuery(
    ["check", roomId, dates],
    checkBooking,
    { enabled: dates !== undefined, cacheTime: 0 }
  );

  return (
    <Box pb={10} px={{ base: 10, lg: 40 }} mt={10}>
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
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
              {data?.photos && data.photos.length > 4 ? (
                <Image
                  w="full"
                  h="full"
                  objectFit="cover"
                  src={data?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid gap={20} templateColumns="2fr 1fr" maxW="container.lg">
        <Box>
          <HStack justifyContent="space-between" mt={10} w="60%">
            <VStack alignItems="flex-start">
              <Skeleton height="30px" isLoaded={!isLoading}>
                <Heading fontSize="2xl">
                  House hosted by {data?.owner.name}
                </Heading>
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
              <Avatar
                name={data?.owner.name}
                size="lg"
                src={data?.owner.avatar}
              />
            </SkeletonCircle>
          </HStack>
          <Box mt={10}>
            <Heading mb={5} fontSize="2xl">
              <HStack>
                <FaStar /> <Text>{data?.rating}</Text> <Text>•</Text>
                <Text>
                  {reviewsData?.length} review
                  {reviewsData?.length === 1 ? "" : "s"}
                </Text>
              </HStack>
            </Heading>
            <Grid mt={16} gap={10} templateColumns={"1fr 1fr"}>
              {reviewsData?.map((review, index) => (
                <VStack alignItems="flex-start" key={index}>
                  <HStack>
                    <Avatar
                      name={review.user.name}
                      src={review.user.avatar}
                      size="md"
                    />
                    <VStack spacing={0} alignItems="flex-start">
                      <Heading fontSize={"md"}>{review.user.name}</Heading>
                      <HStack spacing={1}>
                        <FaStar size="12px" />
                        <Text>{review.rating}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Text>{review.payload}</Text>
                </VStack>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box pt={10}>
          <Calendar
            goToRangeStartOnSelect
            onChange={setDates}
            next2Label={null}
            prev2Label={null}
            selectRange
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            minDetail="month"
          />
          <Button
            disabled={!checkBookingData?.ok}
            mt={5}
            w="full"
            colorScheme="red"
            isLoading={isCheckingBooking && dates !== undefined}
          >
            Make Booking
          </Button>
          {!isCheckingBooking && !checkBookingData?.ok ? (
            <Text color="red.500">Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
