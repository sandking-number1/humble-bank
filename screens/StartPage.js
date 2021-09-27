import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MoneyInput from '../src/components/MoneyInput';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function StartPage({ navigation }) {
  const [inputBudget, setInputBudget] = React.useState();
  const [dataApproved, setDataApproved] = React.useState(false);

  const postBudget = () => {
    if (inputBudget > 0) {
      postInitialBudget(inputBudget);
      setDataApproved(true);
      navigation.navigate('Home');
    } else if (typeof inputBudget === '') {
      alert('Please add your goal');
    } else alert('Please check your goal again');
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
        value={inputBudget}
        onChangeText={setInputBudget}
        placeholder={`Set your goal`}
        keyboardType="numeric"
      />

      {/* </View> */}

      {/* btn */}
      <Button
        callBack={postBudget}
        navigation={navigation}
        btnCopy={`Enter`}
        dataApproved={dataApproved}
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
    margin: 10,
  },
});
