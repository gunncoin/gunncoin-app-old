import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { Text, View } from '../Themed';
import { API_URL } from '../../utils/constants';

export interface LeaderboardSlot {
  name: string;
  eliminations: number;
}

interface LeaderboardProps {
  setMenuState: React.Dispatch<React.SetStateAction<number>>;
}

export default function Leaderboard(props: LeaderboardProps) {
  const { setMenuState } = props;
  const [leaderboard, setLeaderboard] = useState<LeaderboardSlot[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/leaderboard`);
      setLeaderboard(await res.json());
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats Page</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.board} darkColor="rgba(255,255,255,0.1)">
        {leaderboard.map((v) => (
          <View style={styles.entry} darkColor='#2d2d2d' key={v.name}>
            <Text
              style={styles.entryText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >{v.name}
            </Text>
            <Text
              style={styles.entryText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
            >
              {v.eliminations}
            </Text>
          </View>
        ))}
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
          <Button
            variant="outlined"
            style={{ width: '50%' }}
            onTouchEnd={() => {
              setMenuState((v) => (v == 1 ? 0 : 1));
            }}
          >
            RULES
          </Button>
          <Button
            style={{ width: '50%' }}
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
  board: {
    overflow: 'scroll',
    minHeight: '100%',
    width: '100%',
  },
  entry: {
    marginVertical: '2%',
    height: '5%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: "2%",
  },
  bottomContainer: {
    height: '7%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  entryText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
});
