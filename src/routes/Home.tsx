import { Grid } from "@chakra-ui/react";
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
      {[
        1, 1, 11, 1, 1, 1, 1, 1, 11, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
      ].map((index) => (
        <Room key={index} />
      ))}
    </Grid>
  );
}
