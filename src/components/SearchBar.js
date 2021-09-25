import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, TextInput, SafeAreaView } from 'react-native';
import { font } from './GlobalStyles';
import { IconButton, IconBtnOnly } from './iconButton';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <IconBtnOnly name="search1" />
      <TextInput
        style={(font.searchBarPlaceholder, { marginLeft: 10 })}
        placeholder="Search"
        placeholderTextColor="#8B98B1"
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    borderWidth: 0.5,
  },
  container: {
    flexDirection: 'row',
    width: 310,
    height: 45,
    backgroundColor: '#F9FAFB',
    paddingLeft: 20,
    borderColor: '#D7DCE4',
    borderWidth: 0.5,
    borderRadius: 16,
  },
});
