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
      <Heading size="4xl" color="white">
        {"$100.00"}
      </Heading>
      <HStack
        space={3}
        justifyContent={"center"}
        marginTop={5}
        marginBottom={15}
        width="100%"
      >
        <Button rounded={"sm"} width="40%" height={50} variant="outline">
          Send
        </Button>
        <Button rounded={"sm"} width="40%" height={50} variant="solid">
          Receive
        </Button>
      </HStack>
      <Text color={"gray.100"}>{"95030486"}</Text>
    </Center>
  );
};

export default WalletScreen;
