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
import IconButton from '../src/components/iconButton';

export default function TransDetails({ route, navigation }) {
  const { remainingBalance, initialLoading } = route.params;
  const renderItem = ({ item }) => {
    if (item.amount) {
      return (
        <TransList
          created={item.created}
          amount={item.amount}
          description={item.description}
          keyExtractor={(item) => item._id}
        ></TransList>
      );
    }
  };

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
      <SearchBar />

      {/* transaction list */}
      <View style={{ height: 500 }}>
        <FlatList
          data={initialLoading}
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
