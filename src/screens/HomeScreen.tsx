import React, {FC, useEffect, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import firebase from '../constants/firebase';
import 'firebase/firestore';
import InputComponent from '../components/InputComponent';
import RenderPosts from '../components/RenderPendingPost';
interface Props {
  navigation: any;
}

const HomeScreen: FC<Props> = ({navigation}) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);

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

  const fetchPosts = async () => {
    // const posts = await firebase
    //   .firestore()
    //   .collection('posts')
    //   .where('approved', '==', true)
    //   .get();
    // setPosts([...posts.docs]);

    //real-time
    firebase
      .firestore()
      .collection('posts')
      .where('approved', '==', true)
      .onSnapshot(querySnapShot => {
        const documents = querySnapShot.docs;
        setPosts(documents);
      });
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <FlatList
        ListFooterComponent={() => (
          <>
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
                  styleProps={{marginTop: 10}}
                  onPress={() => navigation.navigate('DashboardScreen')}
                  title="Dashboard"
                />
              </View>
            )}
            <ButtonComponent
              styleProps={{marginTop: 10}}
              title="logout"
              onPress={logout}
            />
          </>
        )}
        data={posts}
        renderItem={({item}) => (
          <RenderPosts
            timeStamp={item.data().timestamp}
            approved={true}
            msg={item.data().msg}
          />
        )}
      />
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
