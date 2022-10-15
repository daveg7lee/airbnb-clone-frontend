import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { FaAirbnb, FaLock, FaMoon, FaUserAlt } from "react-icons/fa";

export default function Root() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <HStack
        py="5"
        px="10"
        borderBottomWidth={1}
        justifyContent="space-between"
      >
        <Box color="red.500">
          <FaAirbnb size={48} />
        </Box>
        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle dark mode"
            icon={<FaMoon />}
            variant="ghost"
          />
          <Button onClick={onOpen}>Log in</Button>
          <Button colorScheme={"red"}>Sign up</Button>
        </HStack>
        <Modal onClose={onClose} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Log in</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Box color="gray.500">
                        <FaUserAlt />
                      </Box>
                    }
                  />
                  <Input placeholder="username" variant="filled" />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    children={
                      <Box color="gray.500">
                        <FaLock />
                      </Box>
                    }
                  />
                  <Input placeholder="password" variant="filled" />
                </InputGroup>
              </VStack>
              <Button w="full" colorScheme="red" mt={4}>
                Log in
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </HStack>
      <Outlet />
    </Box>
  );
}
