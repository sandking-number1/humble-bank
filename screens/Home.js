import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HomeMain from '../src/components/home/HomeMain';
import TransList from '../src/components/TransList';
import { IconButton, IconBtnOnly } from '../src/components/iconButton';
import { font } from '../src/components/GlobalStyles';

export default function Home({ navigation }) {
  const [initialLoading, setInitialLoading] = useState([]);
  //   const [filterTrans, setFilterTrans] = useState([]);
  const [initialBalance, setInitialBalance] = useState();
  const [sum, setSum] = useState();
  const remainingBalance = initialBalance + sum;

  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/transaction`);
      const data = await res.json();
      setInitialLoading(sortDate(data));
      setInitialBalance(data[0].account_balance);
      if (data.slice(1).length >= 1) {
        const amountArray = [];
        data.slice(1).map((i) => {
          amountArray.push(i.amount);
        });
        setSum(amountArray.reduce(reducer));
      } else {
        setSum(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  function sortDate(data) {
    return data.sort((a, b) => {
      if (b.created && a.created) {
        const dateA = new Date(a.created).getTime();
        const dateB = new Date(b.created).getTime();
        return dateB - dateA;
      }
    });
  }

  function goToDetailsScreen(params) {
    navigation.navigate('TransDetails', {
      initialLoading: initialLoading,
      remainingBalance: remainingBalance,
    });
  }

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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.navigation}>
        {/* <TouchableOpacity>
          <IconButton name={'left'} />
        </TouchableOpacity> */}
        <Text>Home</Text>
        {/* <TouchableOpacity>
          <IconButton name={'setting'} />
        </TouchableOpacity> */}
      </View>
      {/* budget indicator */}
      <HomeMain key={1} initialBalance={initialBalance} sum={sum}></HomeMain>

      {/* add btns */}
      <View style={styles.budgetBtnBox}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            navigation.navigate('AddSpend');
          }}
        >
          <View>
            <IconButton style={{ paddingLeft: 10 }} name={'tago'} />
            <Text style={[font.primary, { paddingTop: 10 }]}>AddSpend</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddMoney');
          }}
        >
          <IconButton name={'plussquare'} />
          <Text style={[font.primary, { paddingTop: 10 }]}>AddMoney</Text>
        </TouchableOpacity>
      </View>
      {/* recent activities bar */}
      <View style={styles.activities_bar}>
        <Text style={styles.idealSpend}>Recent Activities</Text>
        <TouchableOpacity>
          <Text
            onPress={() => {
              goToDetailsScreen();
            }}
          >
            <IconBtnOnly name={'bars'} />
          </Text>
        </TouchableOpacity>
      </View>
      {/* mapping for transaction list */}
      <View style={styles.listContainer}>
        <FlatList
          data={initialLoading}
          renderItem={renderItem}
          keyExtractor={(item) => {
            item._id;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    marginBottom: 70,
  },
  budgetADay: {
    alignItems: 'center',
  },
  budgetBtnBox: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  activities_container: {},
  activities_bar: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 10,
  },
  listContainer: {
    height: 270,
  },
  idealSpend: {
    fontSize: 12,
    color: '#60708F',
    fontWeight: '700',
  },
});
