import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from '../Themed';
import { API_URL } from '../../utils/constants';

export default function RuleScreen(props: {
  setMenuState: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setMenuState } = props;
  const [loggingIn, setLoggingIn] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validateSignIn = async () => {
    if (loggingIn) {
      let res = await fetch(
        `${API_URL}/user/self?username=${username}&password=${password}`
      );
      if (res.status != 200) {
        setFailedLogin(true);
        return;
      }

      AsyncStorage.setItem('username', username);
      AsyncStorage.setItem('password', password);
      setMenuState(0);
      return;
    }
    let res = await fetch(
      `${API_URL}/user/create?username=${username}&password=${password}`,
      {
        method: 'POST',
      }
    );
    if (res.status != 200) {
      setFailedLogin(true);
      return;
    }

    AsyncStorage.setItem('username', username);
    AsyncStorage.setItem('password', password);
    setMenuState(0);
    return;
  };

  const handleUsernameChange = (text: string) => setUsername(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{loggingIn ? 'CHECK IN' : 'ENLIST'}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {failedLogin && (
        <View style={{ marginBottom: '5%' }}>
          <Text
            style={styles.errorText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {loggingIn ? 'Login' : 'Sign up'} failed
          </Text>
        </View>
      )}
      <View>
        <Input
          value={username}
          onChangeText={handleUsernameChange}
          style={styles.inputs}
          wrapperRef={username}
          placeholder="Username"
          w="75%"
          minW="75%"
        />
        <Input
          style={styles.inputs}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Password"
          w="75%"
          marginTop="5%"
          InputRightElement={
            <Icon
              as={<MaterialIcons name="visibility-off" />}
              size={5}
              mr="2"
              color="muted.400"
            />
          }
          type="password"
        />
      </View>
      <View style={styles.enlistContainer}>
        <Button rounded={'lg'} onTouchEnd={validateSignIn}>
          {loggingIn ? 'LOG IN' : 'SIGN UP'}
        </Button>
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
              setLoggingIn((v) => !v);
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
  errorText: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    color: 'red',
  },
  inputs: {
    color: 'white',
  },
});
