import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';

export default function AddSpend({ navigation }) {
  const [inputAmount, setInputAmount] = React.useState();
  const [inputDescription, setInputDescription] = React.useState();
  const [dataApproved, setDataApproved] = React.useState(false);

  const postSpending = () => {
    if (inputAmount && inputDescription) {
      setDataApproved(true);
      navigation.navigate('Home');
      return fetch('http://localhost:3001/transaction', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: `-${inputAmount}`,
          created: Date.now(),
          description: inputDescription,
          spending: 'true',
        }),
      });
    } else alert('Please fill up inputs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName={`Add Spending`} iconName={'left'} />
      <MoneyInput
        mainCopy={`How much did you spend?`}
        placeholder={`£`}
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType={`numeric`}
        styles={styles}
      />
      <MoneyInput
        mainCopy={`Where did you spend?`}
        placeholder={`ex. Netflix`}
        value={inputDescription}
        onChangeText={setInputDescription}
        styles={styles}
      />
      <Button
        callBack={postSpending}
        navigation={navigation}
        dataApproved={dataApproved}
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
