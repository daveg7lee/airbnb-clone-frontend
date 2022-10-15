import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import Room from "../components/Room/Room";
import RoomSkeleton from "../components/Room/RoomSkeleton";

interface IPhoto {
  pk: string;
  file: string;
  description: string;
}

interface IRoom {
  pk: number;
  name: string;
  country: string;
  city: string;
  price: number;
  rating: number;
  is_owner: boolean;
  photos: IPhoto[];
}

export default function Home() {
  const { data, isLoading } = useQuery<IRoom[]>(["rooms"], getRooms);
  return (
    <Grid
      templateColumns={{
        sm: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
      columnGap={6}
      rowGap={8}
      px={{ base: 10, lg: 40 }}
      mt={10}
    >
      {isLoading && (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      )}
      {data?.map((room: IRoom) => (
        <Room
          key={room.pk}
          imageUrl={room.photos[0].file}
          name={room.name}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
        />
      ))}
    </Grid>
  );
}
