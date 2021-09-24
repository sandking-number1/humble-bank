import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

export default function TransList(props) {
  const d = moment();
  const today = d.get('date');
  const daysInMonth = d.daysInMonth();
  const remainingDays = daysInMonth - today;

  const remainingBalance = props.initialBalance + props.sum;
  //   console.log(props.sum);
  const budgetADay = Math.round(remainingBalance / remainingDays);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.cardFont}>Balance</Text>
          <Text style={styles.cardFont}>{`£ ${remainingBalance}`}</Text>
          <Text style={styles.cardFont}>{`${remainingDays} day(s) to go`}</Text>
        </View>
      </View>
      <View style={styles.budgetADay}>
        <Text>Ideal budget for a day </Text>
        <Text>{`£ ${budgetADay}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    backgroundColor: '#8438FF',
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 30,
  },
  cardFont: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});
