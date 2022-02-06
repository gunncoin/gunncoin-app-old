import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
} from "native-base";

import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const originalDate = Date.now() + 100000000
  const [dateDiff, setDateDiff] = useState(originalDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateDiff(originalDate - Date.now());
    }, 1000);

    return () => {
      interval && clearInterval(interval)
    }
  }, []);

  const convertMillisToDate = (dateDiff: number) => {
    const seconds = Math.floor(dateDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days}:${
      (hours % 24).toString().length < 2
        ? '0' + (hours % 24).toString()
        : (hours % 24).toString()
    }:${
      (minutes % 60).toString().length < 2
        ? '0' + (minutes % 60).toString()
        : (minutes % 60).toString()
    }:${
      (seconds % 60).toString().length < 2
        ? '0' + (seconds % 60).toString()
        : (seconds % 60).toString()
    }`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gunn Reconnaisance</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.timer} darkColor="rgba(255,255,255,0.1)">
        <Text
          style={styles.timerText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Next Round In: {convertMillisToDate(dateDiff)}
        </Text>
      </View>
      <View style={styles.enlistContainer }>
          <Button rounded={"lg"}>ENLIST</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: "15%"
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  timer: {
    marginVertical: 30,
    height: '10%',
    width: '40%',
  },
  enlistContainer: {
    marginVertical: 30,
    height: '20%',
    width: '60%',
  },
  timerText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
});
