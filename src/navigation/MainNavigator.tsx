import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import firebase from 'firebase';

const Stack = createStackNavigator();

const MainNavigator: FC = () => {
  const [user, setUser] = useState<any>(null);

  const bootstrap = () => {
    firebase.auth().onAuthStateChanged(_user => {
      if (_user) {
        setUser(_user);
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;

const styles = StyleSheet.create({});
