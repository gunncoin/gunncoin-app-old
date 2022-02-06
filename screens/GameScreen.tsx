import { Center, Heading } from "native-base";
import { Text, View } from "../components/Themed";

export const GameScreen = () => {
  return (
    <Center height={"100%"} width="100%">
      <Heading>{"Deadline $DD:MM:YY"}</Heading>
    </Center>
  );
};

export default GameScreen;
