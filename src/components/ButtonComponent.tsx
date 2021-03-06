import React, {FC} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {height, width} = Dimensions.get('screen');

interface IStyleProps {
  [key: string]: string | number;
}
interface Props {
  title: String;
  onPress: () => void;
  styleProps?: IStyleProps;
}

const ButtonComponent: FC<Props> = ({title, onPress, styleProps}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        styleProps !== undefined ? {...styleProps} : null,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
  },
});
