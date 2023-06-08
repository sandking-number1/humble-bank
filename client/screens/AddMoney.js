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
import Check from '../src/components/Check';
import { font } from '../src/components/GlobalStyles';
import moment from 'moment';

export default function AddMoney({ navigation }) {
  const [inputAmount, setInputAmount] = React.useState();
  const [inputDescription, setInputDescription] = React.useState();
  const [dataApproved, setDataApproved] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [inputDate, setInputDate] = useState(moment().format('D.M.YYYY'));
  const [dateForPost, setDateForPost] = useState(new Date());
  const [checkIsShowing, setCheckIsShowing] = React.useState(false);

  const placeholder = 'click to change the date';

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
            created: dateForPost,
            description: inputDescription,
            addMoney: 'true',
          }),
        };
        await fetch('http://localhost:3001/transaction', addMoney);
        setCheckIsShowing(true);
        setTimeout(function () {
          navigation.navigate('Home');
        }, 1000);
        // navigation.navigate('Home');
      } else alert('Please fill up inputs');
    } catch (err) {
      console.log(err);
    }
  };

  //

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formateDate = moment(date).format('D.M.YYYY');
    setDateForPost(date);
    setInputDate(formateDate);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* check png */}
      {checkIsShowing ? (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            zIndex: '1',
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 600,
            paddingHorizontal: 140,
          }}
        >
          <Check />
        </View>
      ) : null}

      <Header
        headerName={`Add Money`}
        style={styles}
        navigation={navigation}
        pageName={'Add Money'}
        icon={'home'}
        navigateTo={'Home'}
        iconDisplay={true}
      />

      <View
        style={{
          alignItems: 'center',
          marginTop: '34%',
        }}
      >
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

        <Text style={font.primary}>{'Pick your date'}</Text>

        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput1}
            placeholder={inputDate.toString()}
            editable={false}
            placeholderTextColor="#A1A1A1"
            value={inputDate.toString()}
          />
          <View style={styles.lineStyle} />
          <DateTimePickerModal
            headerTextIOS={placeholder}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            textColor="black"
            isDarkModeEnabled={false}
          />
        </TouchableOpacity>
      </View>
      <Button
        callBack={postAddMoney}
        dataApproved={dataApproved}
        btnCopy={`Save`}
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
  input_container: {
    alignItems: 'center',
  },
  textInput1: {
    fontSize: 16,
    height: 50,
    width: 260,
    opacity: 0.4,
    padding: 8,
    marginBottom: -3,
    textAlign: 'center',
  },
  lineStyle: {
    marginTop: -2,
    borderWidth: 0.5,
    width: 240,
    opacity: 0.5,
    margin: 10,
  },
});
