import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  VStack,
} from "native-base";
import { View } from "../components/Themed";

export const WalletScreen = () => {
  return (
    <Center px={3}>
      <Heading size="xl" color="white">
        {"$100.00"}
      </Heading>
      <Heading size="m">{"95012345"}</Heading>
      <HStack space={3} justifyContent={"center"}>
        <Button>Send</Button>
        <Button>Receive</Button>
      </HStack>
    </Center>
  );
};

export default WalletScreen;
