import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Icon } from 'native-base';

import { Text, View } from '../Themed';
import { MaterialIcons } from '@expo/vector-icons';

export default function RuleScreen(props: {
  setMenuState: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setMenuState } = props;
  const [loggingIn, setLoggingIn] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{loggingIn ? 'CHECK IN' : 'ENLIST'}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
           <Input placeholder="Username" w="75%" minW="75%" />
           <Input placeholder="Password" w="75%" marginTop="5%" 
            InputRightElement={
              <Icon
                as={<MaterialIcons name="visibility-off" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            } />
      </View>
      <View style={styles.enlistContainer}>
        <Button rounded={'lg'}>{loggingIn ? 'LOG IN' : 'SIGN UP'}</Button>
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
            style={{ width: '50%' }}
            onTouchEnd={() => {
              setLoggingIn(v => !v);
            }}
          >
            {loggingIn ? 'SIGN UP INSTEAD' : 'LOG IN INSTEAD'}
          </Button>
          <Button
            variant="outlined"
            style={{ width: '50%' }}
            onTouchEnd={() => {
              setMenuState(0);
            }}
          >
            BACK
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
