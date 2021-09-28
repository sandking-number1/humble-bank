import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
export default function AddSpend({ navigation }) {
  const [inputAmount, setInputAmount] = React.useState();
  const [inputDescription, setInputDescription] = React.useState();
  const [dataApproved, setDataApproved] = React.useState(false);

  const postSpending = async () => {
    try {
      if (inputAmount && inputDescription) {
        setDataApproved(true);
        const addSpending = {
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
        };
        await fetch('http://localhost:3001/transaction', addSpending);
        navigation.navigate('Home');
      } else alert('Please fill up inputs');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerName={`Add Spending`}
        style={styles}
        navigation={navigation}
        pageName={'Add Spend'}
        icon={'home'}
        navigateTo={'Home'}
      />
      <MoneyInput
        mainCopy={`How much did you spend?`}
        placeholder={`£`}
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType={`numeric`}
        styles={styles}
      />
      <MoneyInput
       mainCopy={`How much did you spend?`}
        placeholder={`£`}
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType={`numeric`}
        styles={styles}
      />
      <Button
        callBack={postSpending}
        navigation={navigation}
        dataApproved={dataApproved}
        btnCopy={`Save it as today`}
      />
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
