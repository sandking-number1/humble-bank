import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../src/components/SearchBar';
import TransList from '../src/components/TransList';
import DivideLine from '../src/components/divideLine';
import IconButton from '../src/components/Icon';

export default function TransDetails({ route, navigation }) {
  const { remainingBalance, initialLoading } = route.params;
  const [searchTerm, setSearchTerm] = useState('');
  const renderItem = ({ item }) => {
    if (item.amount) {
      return (
        <TransList
          created={item.created}
          amount={item.amount}
          description={item.description}
          keyExtractor={(item) => item._id}
        />
      );
    }
  };

  const searchResult = initialLoading.filter((i) => {
    if (searchTerm === '') {
      //   console.log(i);
      return i;
    } else if (
      i.description &&
      i.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      //   console.log(i);
      return i;
    }
  });

  //   console.log(testObject);
  //   const handelSearch = (text) => {
  //     console.log(text);
  //   };

  //   const searchResult = remainingBalance.map((item) => console.log(item));

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
            item._id;
          }}
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
