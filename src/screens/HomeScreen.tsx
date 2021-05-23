import React, {FC, useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import InputComponent from '../components/InputComponent';

interface Props {
  navigation: any;
}

const HomeScreen: FC<Props> = ({navigation}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const fetchCurrentUser = async () => {
    const uid = firebase.auth().currentUser?.uid;
    const user = await firebase.firestore().collection('users').doc(uid).get();
    setUser({id: user.id, ...user.data()});
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  const post = async () => {
    if (msg) {
      const data = {
        msg,
        timestamp: Date.now(),
        approved: false,
      };
      await firebase.firestore().collection('posts').add(data);
    } else {
      Alert.alert('Missing fields');
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <ButtonComponent title="logout" onPress={logout} />
      <View>
        <InputComponent
          placeholder="Write something here"
          onChangeText={text => setMsg(text)}
        />
        <ButtonComponent title="Post" onPress={post} />
      </View>
      {user && user.isAdmin && (
        <View>
          <ButtonComponent
            onPress={() => navigation.navigate('DashboardScreen')}
            title="Dashboard"
          />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
