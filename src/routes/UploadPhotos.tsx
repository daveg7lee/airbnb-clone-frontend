import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getUploadURL, uploadImage } from "../api";
import HostOnlyPage from "../components/ProtectedPages/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPages/ProtectedPage";

interface IForm {
  file: FileList;
}

interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export default function UploadPhotos() {
  const { register, handleSubmit, watch } = useForm<IForm>();
  const { roomPk } = useParams();
  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const uploadURLMutataion = useMutation(getUploadURL, {
    onSuccess: (data) => {
      uploadImageMutation.mutate({
        uploadURL: data.uploadURL,
        file: watch("file"),
      });
    },
  });

  const onSubmit = (data: IForm) => {
    uploadURLMutataion.mutate();
  };

  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box
          pb={40}
          mt={10}
          px={{
            base: 10,
            lg: 40,
          }}
        >
          <Container>
            <Heading textAlign={"center"}>Upload a Photo</Heading>
            <VStack
              spacing={5}
              mt={10}
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <Input {...register("file")} type="file" accept="image/*" />
              </FormControl>
              <Button type="submit" w="full" colorScheme={"red"}>
                Upload photos
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
