import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAmenities,
  getCategories,
  IUploadRoomVariables,
  uploadRoom,
} from "../api";
import HostOnlyPage from "../components/ProtectedPages/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPages/ProtectedPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";

export default function UploadRoom() {
  const toast = useToast();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IUploadRoomVariables>();
  const { data: amenities } = useQuery<IAmenity[]>(["amenities"], getAmenities);
  const { data: categories } = useQuery<ICategory[]>(
    ["categories"],
    getCategories
  );
  const mutation = useMutation(uploadRoom, {
    onSuccess: (data: IRoomDetail) => {
      toast({
        status: "success",
        title: "Room created",
        position: "bottom-right",
      });
      navigate(`/rooms/${data.id}`);
    },
  });

  const onSubmit = (data: IUploadRoomVariables) => {
    mutation.mutate(data);
  };

  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Container>
            <Heading textAlign="center">Upload Room</Heading>
            <VStack
              spacing={7}
              as="form"
              mt={5}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("name", { required: true })}
                  required
                  type="text"
                />
                <FormHelperText>Write the name of your room</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register("city", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("address", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaDollarSign />} />
                  <Input
                    {...register("price", { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register("rooms", { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaToilet />} />
                  <Input
                    {...register("toilets", { required: true })}
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description", { required: true })} />
              </FormControl>
              <FormControl>
                <Checkbox {...register("pet_friendly", { required: true })}>
                  Pet friendly
                </Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select
                  {...register("kind", { required: true })}
                  placeholder="Choose a kind"
                >
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </Select>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Choose a category"
                  {...register("category", { required: true })}
                >
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  What category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns="1fr 1fr" gap={4}>
                  {amenities?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox
                        value={amenity.pk}
                        {...register("amenities", { required: true })}
                      >
                        {amenity.name}
                      </Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              {mutation.isError ? (
                <Text color="red.500">Something went wrong</Text>
              ) : null}
              <Button
                type="submit"
                isLoading={mutation.isLoading}
                colorScheme="red"
                size="lg"
                w="full"
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
