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

export default function StartPage({ navigation }) {
  const [inputBudget, setInputBudget] = React.useState();
  const [budget, setBudget] = React.useState(0);

  const saveBudget = () => {
    if (inputBudget == 0) {
      alert("it can't be smaller than 0");
    } else {
      setBudget(inputBudget);
      //   alert(budget);
    }
  };

  const postInitialBudget = (inputBudget) => {
    return fetch('http://localhost:3001/transaction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_balance: inputBudget,
      }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.budget_copy}>Budget</Text>
        <Text style={{ marginTop: 220 }}>
          What's the most you want to spend?
        </Text>
      </View>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setInputBudget}
          placeholder="Set your goal"
          value={inputBudget}
        />
        <View style={styles.lineStyle} />
      </View>
      <View style={styles.btn_container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveBudget();
            postInitialBudget(inputBudget);
            navigation.navigate('Home');
          }}
          underlayColor="#fff"
        >
          <Text style={styles.enter}>Enter</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flex: 1, margin: 20 },
  budget_copy: { textAlign: 'center', marginBottom: 200, marginBottom: 50 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    padding: 20,
  },
  input: {
    height: 40,
    width: 280,
    // borderWidth: 0.6,
    padding: 10,
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 130,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 70,
    backgroundColor: '#8438FF',
    borderRadius: 55,
    borderWidth: 1,
    borderColor: '#8438FF',
  },
  btn_container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  enter: {
    color: 'white',
  },
  lineStyle: {
    marginTop: -3,
    borderWidth: 0.6,
    opacity: 0.3,
    // width: 90,
    borderColor: 'black',

    margin: 10,
  },
});
