import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const originalDate = Date.now() + 100000000;
  const [dateDiff, setDateDiff] = useState(originalDate - Date.now());
  const [menuState, setMenuState] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateDiff(originalDate - Date.now());
    }, 1000);

    return () => {
      interval && clearInterval(interval);
    };
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

  if (menuState == 0) {
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
        <View style={styles.enlistContainer}>
          <Button rounded={'lg'}>ENLIST</Button>
        </View>
        <View style={styles.bottomContainer}>
          <Button.Group
            isAttached
            mx={{
              base: 'auto',
              md: 0,
            }}
            size="sm"
          >
            <Button variant="outlined" style={{ width: '50%' }} onTouchEnd={() => {
              setMenuState(v => v == 1 ? 0 : 1)
            }}>
              RULES
            </Button>
            <Button variant="outlined" style={{ width: '50%' }} onTouchEnd={() => {
              setMenuState(v => v == 2 ? 0 : 2)
            }}>
              STATS
            </Button>
          </Button.Group>
        </View>
      </View>
    );
  } else if (menuState == 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rules</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View>
          <Text
            style={styles.timerText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            rules here lmao i dont know the rules please help
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <Button.Group
            isAttached
            mx={{
              base: 'auto',
              md: 0,
            }}
            size="sm"
          >
            <Button style={{ width: '50%' }} onTouchEnd={() => {
              setMenuState(v => v == 1 ? 0 : 1)
            }}>
              RULES
            </Button>
            <Button variant="outlined" style={{ width: '50%' }} onTouchEnd={() => {
              setMenuState(v => v == 2 ? 0 : 2)
            }}>
              STATS
            </Button>
          </Button.Group>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Stats Page</Text>
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
        <View style={styles.enlistContainer}>
          <Button rounded={'lg'}>ENLIST</Button>
        </View>
        <View style={styles.bottomContainer}>
          <Button.Group
            isAttached
            mx={{
              base: 'auto',
              md: 0,
            }}
            size="sm"
          >
            <Button variant="outlined" style={{ width: '50%' }} onTouchEnd={() => {
              setMenuState(v => v == 1 ? 0 : 1)
            }}>
              RULES
            </Button>
            <Button style={{ width: '50%' }} onTouchEnd={() => {
              setMenuState(v => v == 2 ? 0 : 2)
            }}>
              STATS
            </Button>
          </Button.Group>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '15%',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: '10%',
    height: 1,
    width: '80%',
  },
  timer: {
    marginVertical: '10%',
    height: '10%',
    width: '40%',
  },
  bottomContainer: {
    height: '7%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
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
