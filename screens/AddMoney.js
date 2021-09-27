import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { cos } from 'react-native-reanimated';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';

export default function AddMoney({ navigation }) {
  const [inputAmount, setInputAmount] = React.useState();
  const [inputDescription, setInputDescription] = React.useState();
  const [dataApproved, setDataApproved] = React.useState(false);

  const postAddMoney = async () => {
    try {
      if (inputAmount && inputDescription) {
        setDataApproved(true);
        const addMoney = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: `${inputAmount}`,
            created: Date.now(),
            description: inputDescription,
            addMoney: 'true',
          }),
        };
        await fetch('http://localhost:3001/transaction', addMoney);
        console.log('it has been posted');
        navigation.navigate('Home');
      } else alert('Please fill up inputs');
    } catch (err) {
      console.log(err);
    }
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
        callBack={postAddMoney}
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
    alignItems: 'center',
  },
});
