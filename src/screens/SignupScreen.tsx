/* eslint-disable react-native/no-inline-styles */

import React, {FC, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import InputComponent from '../components/InputComponent';
import firebase from '../constants/firebase';
interface Props {
  navigation: any;
}

const SignupScreen: FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signup = async () => {
    if (name && email && password) {
      try {
        const {user} = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        if (user) {
          await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .set({name, email, password});
        }
      } catch (error) {
        console.log({error});
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <InputComponent placeholder="Name" onChangeText={e => setName(e)} />
      <InputComponent placeholder="Email" onChangeText={e => setEmail(e)} />
      <InputComponent
        placeholder="Password"
        secureTextEntry
        onChangeText={e => setPassword(e)}
      />
      <ButtonComponent title="Sign Up" onPress={signup} />
      <View style={styles.loginText}>
        <Text style={{marginHorizontal: 5}}>Already Have an Account</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={{marginHorizontal: 5}}>
          <Text style={{color: 'blue'}}>Login Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

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
