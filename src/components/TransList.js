import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function TransList(props) {
  return (
    <View style={styles.activities_item}>
      <Text>icon</Text>
      <Text>{props.description}</Text>
      <Text>£ {props.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activities_item: {
    // flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    width: 400,
  },
});
