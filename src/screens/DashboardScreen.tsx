import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RenderPendingPost from '../components/RenderPendingPost';
import firebase from '../constants/firebase';

const DashboardScreen: FC = () => {
  const [posts, setPosts] = useState<any>(null);

  const fetchPendingPosts = async () => {
    // const posts = await firebase
    //   .firestore()
    //   .collection('posts')
    //   .where('approved', '==', false)
    //   .get();
    // setPosts([...posts.docs]);

    //real-time
    firebase
      .firestore()
      .collection('posts')
      .where('approved', '==', false)
      .onSnapshot(querySnapShot => {
        const documents = querySnapShot.docs;
        setPosts(documents);
      });
  };

  const onApprove = async (id: string) => {
    const post = await firebase.firestore().collection('posts').doc(id).get();
    post.ref.set({approved: true}, {merge: true});
  };
  const onReject = async (id: string) => {
    await firebase.firestore().collection('posts').doc(id).delete();
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Dashboard Screen</Text>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <RenderPendingPost
            msg={item.data().msg}
            timeStamp={item.data().timestamp}
            approved={item.data().approved}
            onApprove={() => onApprove(item.id)}
            onReject={() => onReject(item.id)}
          />
        )}
      />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
