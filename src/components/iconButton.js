import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialIcons';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

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
    // padding: 18,
    borderWidth: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
