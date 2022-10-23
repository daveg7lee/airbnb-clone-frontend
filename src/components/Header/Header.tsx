import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { logOut } from "../../api";
import useUser from "../../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { userLoading, user, isLoggedIn } = useUser();

  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();

  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();

  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);

  const onLogOut = async () => {
    const toastId = toast({
      title: "Login out...",
      description: "Sad to see you go...",
      status: "loading",
      position: "bottom-right",
    });

    await logOut();

    queryClient.refetchQueries(["me"]);

    toast.update(toastId, {
      status: "success",
      title: "Done!",
      description: "See you later!",
      duration: 1000,
    });
  };

  return (
    <Stack
      py="5"
      px="40"
      borderBottomWidth={1}
      justifyContent="space-between"
      direction={{ sm: "column", md: "row" }}
      alignItems="center"
      spacing={{ sm: 4, md: 0 }}
    >
      <Box color={logoColor}>
        <FaAirbnb size={48} />
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Toggle dark mode"
          icon={<Icon />}
          variant="ghost"
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size={"sm"} name={user?.name} src={user?.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : (
          <SkeletonCircle size="8" />
        )}
      </HStack>
      <LoginModal onClose={onLoginClose} isOpen={isLoginOpen} />
      <SignUpModal onClose={onSignUpClose} isOpen={isSignUpOpen} />
    </Stack>
  );
}
