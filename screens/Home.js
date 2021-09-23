// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TransList from '../src/components/TransList';

export default function Home({}) {
  const [initialLoading, setInitialLoading] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

  const [initialBalance, setInitialBalance] = useState();
  const [sum, setSum] = useState();

  //   const [totalSpend, setTotalSpend] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [sum]);

  const fetchData = () => {
    return fetch(`http://localhost:3001/transaction`)
      .then((res) => res.json())
      .then((data) => {
        setInitialLoading(data);
        setTransactionList(data.slice(1));
        setInitialBalance(data[0].account_balance);
        setSum(data.slice(1).reduce((a, b) => a + b.amount, 0));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const initialBalance = initialLoading.length
  //     ? initialLoading[0].account_balance
  //     : 0;
  //   const sum = transactionList.length
  //     ? transactionList.reduce((a, b) => a + b.amount, 0)
  //     : 0;
  //   const remaining = initialBalance + sum;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.navigation}>
          <TouchableOpacity>
            <Text>Back</Text>
          </TouchableOpacity>
          <Text>Home</Text>
          <TouchableOpacity>
            <Text>setting</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* budget indicator */}
      <View>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.cardContainer}>
            <View style={styles.cardElements}>
              <Text style={styles.cardFont}>Balance</Text>
              <Text
                style={styles.cardFont}
                // ${initialLoading[0].account_balance}
              >{`£ ${initialBalance + sum}`}</Text>
              <Text style={styles.cardFont}>18days to go</Text>
            </View>
          </View>
          <View style={styles.budgetADay}>
            <Text>Ideal budget for a day </Text>
            <Text> £ 60</Text>
          </View>
        </View>
        {/* budget buttons */}
        <View>
          <View style={styles.budgetBtnBox}>
            <TouchableOpacity>
              <Text>add spend</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>add Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* recent activities */}
      <View style={styles.activities_container}>
        <View style={styles.activities_bar}>
          <Text>Recent Activities</Text>
          <TouchableOpacity>
            <Text>BTN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activities_list}>
          {/* mapping */}
          {initialLoading.map((i) => {
            if (i.amount) {
              return (
                <TransList
                  key={i._id}
                  created={i.created}
                  amount={i.amount}
                  description={i.description}
                ></TransList>
              );
            }
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigation: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    marginBottom: 70,
  },
  cardContainer: {
    alignItems: 'center',
    backgroundColor: '#8438FF',
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 30,

    // flex: 1,
    // justifyContent: 'space-around',
    // padding:
  },
  cardFont: {
    fontSize: 30,
    color: '#FFFFFF',
  },

  budgetADay: {
    alignItems: 'center',
  },
  budgetBtnBox: {
    // flex: 1,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activities_container: {
    marginTop: 90,
  },
  activities_bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activities_list: {
    marginTop: 40,
    // backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'center',
  },
  activities_item: {
    // flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    width: 400,
  },
});
