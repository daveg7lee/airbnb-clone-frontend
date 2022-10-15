import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      templateColumns={{
        sm: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
      columnGap={4}
      rowGap={8}
      px={{ base: 10, lg: 40 }}
      mt={10}
    >
      <Box>
        <Skeleton height={280} rounded="2xl" mb={6} />
        <SkeletonText w="50%" noOfLines={2} mb={6} />
        <SkeletonText w="20%" noOfLines={1} />
      </Box>
      <Room />
    </Grid>
  );
}
