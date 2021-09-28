import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../src/components/Header';
import HomeMain from '../src/components/home/HomeMain';
import TransList from '../src/components/TransItem';
import { IconButton, IconBtnOnly } from '../src/components/Icon';
import { font } from '../src/components/GlobalStyles';

export default function Home({ navigation }) {
  const [initialLoading, setInitialLoading] = useState([]);
  const [initialBalance, setInitialBalance] = useState(0);
  const [sum, setSum] = useState();
  const remainingBalance = initialBalance.account_balance + sum;
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/transaction`);
      const data = await res.json();
      setInitialLoading(sortDate(data));
      setInitialBalance(data[0]);
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

  function goToDetailsScreen() {
    navigation.navigate('TransDetails', {
      initialLoading: initialLoading,
      remainingBalance: remainingBalance,
    });
  }

  function goToSettingScreen() {
    navigation.navigate('Setting', {
      initialBalance: initialBalance,
      //   remainingBalance: remainingBalance,
    });
  }

  const renderItem = ({ item }) => {
    if (item.amount) {
      return (
        <TransList
          created={item.created}
          amount={item.amount}
          description={item.description}
          id={item._id}
          keyExtractor={(item) => item._id}
          deleteItem={deleteItem}
        ></TransList>
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
            setInitialLoading(
              initialLoading.filter((i) => {
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

  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            zIndex: 1,
            position: 'absolute',
            left: 20,
            padding: 14,
            bottom: 20,
          }}
          onPress={() => {
            goToSettingScreen();
          }}
        >
          <IconButton name="setting" />
        </TouchableOpacity>

        <Header
          pageName={'Home'}
          icon={'setting'}
          navigateTo={'Setting'}
          navigation={navigation}
          initialBalance={initialBalance}
          iconDisplay={false}
        />
      </View>

      {/* budget card  */}
      <HomeMain
        key={1}
        initialBalance={initialBalance.account_balance}
        sum={sum}
      ></HomeMain>

      {/* btn container  NEED REFACTORING*/}
      <View style={styles.budgetBtnBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddSpend');
          }}
        >
          <View>
            <IconButton style={{ paddingLeft: 10 }} name={'tago'} />
            <Text style={[font.primary, { paddingTop: 10 }]}>Add Spend</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddMoney');
          }}
        >
          <IconButton name={'plussquare'} />
          <Text style={[font.primary, { paddingTop: 10 }]}>Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* recent activities bar  NEED REFACTORING */}
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
            return item._id.toString();
          }}
          extraData={initialLoading}
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
