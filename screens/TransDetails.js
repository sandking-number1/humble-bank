import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Picker,
} from 'react-native';
import SearchBar from '../src/components/SearchBar';
import TransList from '../src/components/TransItem';
import DivideLine from '../src/components/DivideLine';
import Header from '../src/components/Header';

export default function TransDetails({ route, navigation }) {
  const { remainingBalance, initialLoading } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const [arrayToBeSearched, SetArrayToBeSearched] = useState([]);

  useEffect(() => {
    SetArrayToBeSearched(initialLoading);
  }, []);

  const renderItem = ({ item }) => {
    if (item.amount) {
      return (
        <TransList
          created={item.created}
          amount={item.amount}
          description={item.description}
          id={item._id}
          deleteItem={deleteItem}
        />
      );
    }
  };

  const deleteItem = (targetId) => {
    const deleteItem = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: targetId,
      }),
    };
    return Alert.alert(
      'Confirmation',
      'Do you want to remove this transaction?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            fetch(`http://localhost:3001/transaction/${targetId}`, deleteItem);
            SetArrayToBeSearched(
              arrayToBeSearched.filter((i) => {
                return i._id !== targetId;
              })
            );
          },
        },
        {
          text: 'No',
        },
      ]
    );
  };

  const searchResult = arrayToBeSearched.filter((i) => {
    if (searchTerm === '') {
      return i;
    } else if (
      i.description &&
      i.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return i;
    }
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          justifyContent: 'center',
          flexDirection: 'column',
        },
      ]}
    >
      <Header
        navigation={navigation}
        pageName={'Details'}
        icon={'home'}
        navigateTo={'Home'}
      />

      {/* header */}
      <View
        style={{
          //   flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
          marginBottom: 24,
        }}
      >
        <Text>Remaining Balance</Text>
        <Text>{`£ ${remainingBalance}`}</Text>
      </View>

      <View style={{ marginTop: 10, marginBottom: 14 }}>
        <DivideLine />
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
          marginBottom: 14,
        }}
      >
        <Text>Activities</Text>
        <Text>Activities</Text>
      </View> */}

      {/* searchbar */}
      <SearchBar onChangeText={setSearchTerm} value={searchTerm} />

      {/* transaction list */}
      <View style={{ height: 500 }}>
        <FlatList
          data={searchResult}
          renderItem={renderItem}
          keyExtractor={(item) => {
            return item._id.toString();
          }}
          extraData={arrayToBeSearched}
        />
      </View>
      <DivideLine />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
