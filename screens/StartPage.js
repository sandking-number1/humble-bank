import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MoneyInput from '../src/components/MoneyInput';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
// import PresetSafeView from '../src/components/PresetSafeView';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function StartPage({ navigation }) {
  const [inputBudget, setInputBudget] = React.useState();
  const postBudget = () => {
    if (inputBudget == 0) {
      alert("it can't be smaller than 0");
    } else {
      postInitialBudget(inputBudget);
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
        amount: 0,
      }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName={`Bankaver`} />
      <MoneyInput
        mainCopy={`What's the most you want to spend?`}
        value={setInputBudget}
        onChangeText={inputBudget}
        placeholder={`Set your goal`}
        styles={styles}
      />
      {/* </View> */}

      {/* btn */}
      <Button
        callBack={postBudget}
        navigation={navigation}
        btnCopy={`Enter`}
      ></Button>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    marginTop: -3,
    borderWidth: 0.5,
    opacity: 0.3,
    // width: 90,
    // borderColor: 'black',
    margin: 10,
  },
});
