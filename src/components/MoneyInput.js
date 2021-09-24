import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function MoneyInput(props) {
  return (
    <View style={styles.input_container}>
      <Text>{props.mainCopy}</Text>
      <TextInput
        style={styles.input}
        keyboardType={props.keyboardType}
        returnKeyType={'done'}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        value={props.value}
      />
      <View style={styles.lineStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  input_container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
    height: 40,
    width: 280,
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  lineStyle: {
    marginTop: -2,
    borderWidth: 0.5,
    width: 240,
    opacity: 0.5,
    margin: 10,
  },
});
