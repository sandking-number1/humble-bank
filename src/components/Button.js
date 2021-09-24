import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Button(props) {
  return (
    <View style={styles.btn_container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.callBack();
          props.navigation.navigate('Home');
        }}
        underlayColor="#fff"
      >
        <Text style={styles.enter}>{props.btnCopy}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    // marginRight: 40,
    // marginLeft: 40,
    // marginTop: 130,
    // paddingTop: 30,
    // paddingBottom: 10,
    // padding: 70,
    width: 200,
    height: 60,
    backgroundColor: '#8438FF',
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#8438FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  enter: {
    color: 'white',
  },
});
