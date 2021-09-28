import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import Button from '../src/components/Button';
import Header from '../src/components/Header';
import MoneyInput from '../src/components/MoneyInput';
import { font } from '../src/components/GlobalStyles';

export default function AddSpend({ route, navigation }) {
  const { initialBalance } = route.params;
  const [inputAmount, setInputAmount] = React.useState();
  const [currentBudget, setCurrentBudget] = React.useState(
    initialBalance.account_balance
  );
  const [dataApproved, setDataApproved] = React.useState(false);

  const putRequest = async (targetId) => {
    try {
      if (inputAmount) {
        setDataApproved(true);
        const putItem = {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: targetId,
            account_balance: inputAmount,
          }),
        };
        await fetch(`http://localhost:3001/transaction/${targetId}`, putItem);
        setCurrentBudget(inputAmount);
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
        pageName={'Setting'}
        icon={'home'}
        navigateTo={'Home'}
        iconDisplay={true}
      />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderTopStartRadius: 70,
          borderTopEndRadius: 4,
          borderBottomStartRadius: 4,
          borderBottomEndRadius: 4,
          backgroundColor: '#8438FF',
          padding: 50,
          marginBottom: 100,
          marginTop: 30,
          // shadow
          //   shadowColor: '#D8C0FF',
          shadowColor: '#9F8EBC',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.7,
          shadowRadius: 1.41,

          elevation: 2,
        }}
      >
        <Text style={[font.cardFont, { paddingBottom: 20 }]}>
          Your current budget goal{' '}
        </Text>
        <Text style={[font.bigWhite]}>{`£ ${currentBudget}`}</Text>
      </View>

      <MoneyInput
        mainCopy={`Change it to`}
        placeholder={`£`}
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType={`numeric`}
        styles={styles}
      />
      <Button
        callBack={putRequest}
        navigation={navigation}
        dataApproved={dataApproved}
        btnCopy={`Save your change`}
        id={initialBalance._id}
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
