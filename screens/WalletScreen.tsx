import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
} from "native-base";
import { View } from "../components/Themed";

export const WalletScreen = () => {
  return (
    <Center px={3} height="100%" width="100%">
      <Center bg="gray.700" rounded="md" width="100%" paddingTop={30}>
        <Heading size="xl" color="white">
          {"$100.00"}
        </Heading>
        <HStack
          space={3}
          justifyContent={"center"}
          marginTop={5}
          marginBottom={15}
        >
          <Button rounded={"sm"}>Send</Button>
          <Button rounded={"sm"}>Receive</Button>
        </HStack>
        <Text color={"gray.100"}>{"95030486"}</Text>
      </Center>
    </Center>
  );
};

export default WalletScreen;
