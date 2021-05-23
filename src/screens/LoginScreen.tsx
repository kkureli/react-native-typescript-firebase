/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import firebase from '../constants/firebase';

interface Props {
  navigation: any;
}

const LoginScreen: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async () => {
    if (email && password) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        Alert.alert('Missing Fields');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>

      <InputComponent placeholder="Email" onChangeText={e => setEmail(e)} />
      <InputComponent
        placeholder="Password"
        secureTextEntry
        onChangeText={e => setPassword(e)}
      />
      <ButtonComponent title="Login" onPress={login} />
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Don't Have an Account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignupScreen')}
          style={{marginHorizontal: 5}}>
          <Text style={{color: 'blue'}}>Signup Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    flexDirection: 'row',
    marginVertical: 20,
  },
});
