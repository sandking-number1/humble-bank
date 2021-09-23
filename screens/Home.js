// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Home({}) {
  const [transLists, setTransList] = useState([]);
  const [remaining, setRemaining] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    return fetch(`http://localhost:3001/transaction`)
      .then((res) => res.json())
      .then((data) => {
        setTransList(data);
        setRemaining(transLists[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log('remain   ', remaining);

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
              <Text style={styles.cardFont}>{`£`}</Text>
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
            <Text>add spend</Text>
            <Text>add Money</Text>
          </View>
        </View>
      </View>
      {/* recent activities */}
      <View style={styles.activities_container}>
        <View style={styles.activities_bar}>
          <Text>recent activities</Text>
          <Text>button</Text>
        </View>
        <View style={styles.activities_list}>
          <View style={styles.activities_item}>
            <Text>icon</Text>
            <Text>Netflix Membership</Text>
            <Text>amount</Text>
          </View>
          <View style={styles.activities_item}>
            <Text>icon</Text>
            <Text>Netflix Membership</Text>
            <Text>amount</Text>
          </View>
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
