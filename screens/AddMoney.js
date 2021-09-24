import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { cos } from 'react-native-reanimated';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';

export default function AddMoney({ navigation }) {
  const [inputAmount, setInputAmount] = React.useState(1235);
  const [inputDescription, setInputDescription] = React.useState();

  const postSpending = () => {
    return fetch('http://localhost:3001/transaction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: `${inputAmount}`,
        created: Date.now(),
        description: inputDescription,
      }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName={`Add Money`} style={styles} />
      <MoneyInput
        mainCopy={`How much do you want to put?`}
        placeholder={`£`}
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType={`numeric`}
        styles={styles}
      />
      <MoneyInput
        mainCopy={` Description?`}
        placeholder={`ex. Refund from Apple `}
        value={inputDescription}
        onChangeText={setInputDescription}
        styles={styles}
      />
      <Button
        callBack={postSpending}
        navigation={navigation}
        btnCopy={`Save it as today`}
      />
      {/* <Button btnCopy={`Set a date`} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    borderWidth: 1,
  },
  input_container: {
    // marginTop: 300,
    alignItems: 'center',
  },
});
