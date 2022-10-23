import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  SkeletonCircle,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import useUser from "../../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
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
            <Avatar size={"sm"} name={user?.name} src={user?.avatar} />
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
