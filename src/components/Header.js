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

export default function Header(props) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.budget_copy}>{`${props.headerName}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: { marginTop: 20, marginBottom: 250 },
  //   budget_copy: { textAlign: 'center', marginBottom: 200, marginBottom: 50 },
});
