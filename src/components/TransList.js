import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

export default function TransList(props) {
  const formatDate = (original) => {
    const date = moment(original).format('D.M.YYYY');
    console.log(moment());
    console.log('start', moment().endOf('month'));
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
    // flex: 1,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    width: 400,
  },
});
