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
import IconButton from './Icon';

export default function Header(props) {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 20,
          padding: 14,
          bottom: 20,
        }}
        onPress={() => {
          props.navigation.navigate(props.navigateTo);
        }}
      >
        <IconButton name={props.icon} />
      </TouchableOpacity>
      <Text
        style={{ justifyContent: 'flex-end', padding: 30, marginBottom: 20 }}
      >
        {props.pageName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { marginTop: 20, marginBottom: 250, flexDirection: 'row' },
  //   budget_copy: { textAlign: 'center', marginBottom: 200, marginBottom: 50 },
});
