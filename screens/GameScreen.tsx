import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "native-base";

import { Text, View } from "../components/Themed";
import Leaderboard from "../components/GameScreen/Leaderboard";
import RuleScreen from "../components/GameScreen/RuleScreen";
import Enlist from "../components/GameScreen/Enlist";
import { API_URL } from "../utils/constants";
import UserPage from "../components/GameScreen/UserPage";
import RequestLocation from "../components/GameScreen/RequestLocation";

export interface UserData {
  name: string;
}

export default function TabTwoScreen() {
  const originalDate = Date.now() + 100000000;
  const [dateDiff, setDateDiff] = useState(originalDate - Date.now());
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [menuState, setMenuState] = useState<number>(0);

  const exitFromUserProfile = () => {
    setUserProfile(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDateDiff(originalDate - Date.now());
    }, 1000);

    (async () => {
      let username = await AsyncStorage.getItem("username");
      let password = await AsyncStorage.getItem("password");

      if (username && password) {
        let res = await fetch(
          `${API_URL}/user/self?username=${username}&password=${password}`
        );
        if (res.status != 200) {
          return;
        }
        setUserProfile({ ...(await res.json()), name: username });
        return;
      }
    })();

    return () => {
      interval && clearInterval(interval);
    };
  }, [menuState]);

  if (userProfile) {
    return (
      <UserPage userProfile={userProfile} exitFromHere={exitFromUserProfile} />
    );
  }

  const convertMillisToDate = (dateDiff: number) => {
    const seconds = Math.floor(dateDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days}:${
      (hours % 24).toString().length < 2
        ? "0" + (hours % 24).toString()
        : (hours % 24).toString()
    }:${
      (minutes % 60).toString().length < 2
        ? "0" + (minutes % 60).toString()
        : (minutes % 60).toString()
    }:${
      (seconds % 60).toString().length < 2
        ? "0" + (seconds % 60).toString()
        : (seconds % 60).toString()
    }`;
  };

  if (menuState == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Gunn Recon</Text>
        <RequestLocation />
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
          <Button
            rounded={"lg"}
            onTouchEnd={() => {
              setMenuState(3);
            }}
          >
            ENLIST
          </Button>
        </View>
        <View style={styles.bottomContainer}>
          <Button.Group
            isAttached
            mx={{
              base: "auto",
              md: 0,
            }}
            size="sm"
          >
            <Button
              variant="outlined"
              style={{ width: "50%" }}
              onTouchEnd={() => {
                setMenuState((v) => (v == 1 ? 0 : 1));
              }}
            >
              RULES
            </Button>
            <Button
              variant="outlined"
              style={{ width: "50%" }}
              onTouchEnd={() => {
                setMenuState((v) => (v == 2 ? 0 : 2));
              }}
            >
              STATS
            </Button>
          </Button.Group>
        </View>
      </View>
    );
  } else if (menuState == 1) {
    return <RuleScreen setMenuState={setMenuState} />;
  } else if (menuState == 2) {
    return <Leaderboard setMenuState={setMenuState} />;
  } else if (menuState == 3) {
    return <Enlist setMenuState={setMenuState} />;
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "15%",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: "10%",
    height: 1,
    width: "80%",
  },
  timer: {
    marginVertical: "10%",
    height: "10%",
    width: "40%",
  },
  bottomContainer: {
    height: "7%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
  },
  enlistContainer: {
    marginVertical: 30,
    height: "20%",
    width: "60%",
  },
  timerText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
});
