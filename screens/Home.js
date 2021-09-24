// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { cos } from 'react-native-reanimated';
import HomeMain from '../src/components/home/HomeMain';
import TransList from '../src/components/TransList';
import IconButton from '../src/components/iconButton';

export default function Home({ navigation }) {
  const [initialLoading, setInitialLoading] = useState([]);
  const [initialBalance, setInitialBalance] = useState();
  const [sum, setSum] = useState();

  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
      console.log('revisit');
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/transaction`);
      const data = await res.json();
      setInitialLoading(data);
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.navigation}>
          <TouchableOpacity>
            <Text>Back</Text>
            <IconButton />
          </TouchableOpacity>
          <Text>Home</Text>
          <TouchableOpacity>
            <Text>setting</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* budget indicator */}
      <HomeMain key={1} initialBalance={initialBalance} sum={sum}></HomeMain>
      {/* add btns */}
      <View>
        <View style={styles.budgetBtnBox}>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('AddSpend');
              }}
            >
              add spend
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('AddMoney');
              }}
            >
              add Money
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* recent activities */}
      <View style={styles.activities_container}>
        <View style={styles.activities_bar}>
          <Text>Recent Activities</Text>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('TransDetails');
              }}
            >
              BTN
            </Text>
          </TouchableOpacity>
        </View>
        {/* mapping */}
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={initialLoading}
            renderItem={({ item }) => {
              if (item.amount) {
                return (
                  <TransList
                    key={item._id}
                    created={item.created}
                    amount={item.amount}
                    description={item.description}
                  ></TransList>
                );
              }
            }}
          />
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
  listContainer: {
    height: 270,
  },
});
