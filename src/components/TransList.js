import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';

export default function TransList(props) {
  const formatDate = (original) => {
    const date = moment(original).format('D.M.YYYY');
    const d = moment();
    const today = d.get('date');
    const daysInMonth = d.daysInMonth();
    const remainingDays = daysInMonth - today;
    return date;
  };

  return (
    <View style={styles.activities_item}>
      <Text>icon</Text>
      <View>
        <Text>{props.description}</Text>
        <Text>{formatDate(props.created)}</Text>
      </View>

      <Text>£ {props.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  activities_item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    width: 400,
  },
});
