import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SearchBar from '../src/components/SearchBar';
import TransList from '../src/components/TransItem';
import DivideLine from '../src/components/DivideLine';
import IconButton from '../src/components/Icon';

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
      <View
        style={{
          borderWidth: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <IconButton name={'home'} />
        </TouchableOpacity>
        <Text>Details</Text>
      </View>

      {/* header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 24,
        }}
      >
        <Text>Remaining Balance</Text>
        <Text>{`£ ${remainingBalance}`}</Text>
      </View>
      <DivideLine />
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
