import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import { StyleSheet, View } from 'react-native';

function IconBtnOnly(props) {
  return (
    <View style={styles.iconBtnOnly}>
      <Icon name={props.name} size={20} color="#60708F" />
      {/* <Text style={styles.budget_copy}>S</Text> */}
    </View>
  );
}

export default function IconButton(props) {
  return (
    <View style={styles.iconBtnContainer}>
      <Icon name={props.name} size={20} color="#60708F" />
      {/* <Text style={styles.budget_copy}>S</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtnContainer: {
    // flex: 1,
    width: 50,
    height: 50,
    borderRadius: 16,
    borderColor: '#CACBCC',
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBtnOnly: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { IconBtnOnly, IconButton };
