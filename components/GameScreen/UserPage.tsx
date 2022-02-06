import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { Text, View } from '../Themed';
import { UserData } from '../../screens/GameScreen';

export default function UserPage(props: {
  userProfile: UserData;
  exitFromHere: () => void;
}) {
  const { userProfile, exitFromHere } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile ({userProfile.name})</Text>
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
        <View style={styles.enlistContainer}>
          <Button
            bgColor={'red.600'}
            rounded={'lg'}
            onTouchEnd={() => {
              exitFromHere();
            }}
          >
            LOGOUT
          </Button>
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
