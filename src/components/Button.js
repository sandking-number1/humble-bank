import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Button(props) {
  return (
    <View style={styles.btn_container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.callBack();
        }}
      >
        <Text style={styles.enter}>{props.btnCopy}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
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
