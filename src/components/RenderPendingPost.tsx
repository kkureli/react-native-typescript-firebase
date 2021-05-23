import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from './ButtonComponent';

interface Props {
  msg: string;
  approved: boolean;
  timeStamp: number;
  onApprove: () => void;
  onReject: () => void;
}

const {width, height} = Dimensions.get('screen');

const formatTime = (timeStamp: number): any => {
  const calculatedTime = Date.now() - timeStamp;
  if (calculatedTime > 1000) {
    return `${calculatedTime / 1000} s`;
  }
  if (calculatedTime / 1000 > 60) {
    return `${calculatedTime / 1000 / 60} min`;
  }
  if (calculatedTime / 1000 / 60 > 60) {
    return `${calculatedTime / 1000 / 60 / 60} hr`;
  } else {
    `${calculatedTime / 1000 / 60 / 60 / 24} d`;
  }
};

const RenderPendingPost: FC<Props> = ({
  msg,
  approved,
  timeStamp,
  onApprove,
  onReject,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{msg}</Text>
        <Text>{formatTime(timeStamp)}</Text>
      </View>
      <View style={styles.buttons}>
        <ButtonComponent title="Approve" onPress={onApprove} />
        <ButtonComponent title="Reject" onPress={onReject} />
      </View>
    </View>
  );
};

export default RenderPendingPost;

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: 'center',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: '#ccc',
    shadowOpacity: 0.9,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
