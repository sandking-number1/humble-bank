import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';
import IconButton from '../../src/components/iconButton';
import { font } from './GlobalStyles';

export default function TransList(props) {
  const formatDate = (original) => {
    const date = moment(original).format('D.M.YYYY');
    return date;
  };

  return (
    <View style={styles.activities_item}>
      <View style={styles.icon}>
        <IconButton name={'isv'} />
      </View>

      <View style={[styles.transList]}>
        <Text style={font.primary}>{props.description}</Text>
        <Text style={font.date}>{formatDate(props.created)}</Text>
      </View>

      <View style={styles.amount}>
        <Text style={[font.primary, { textAlign: 'center' }]}>
          £ {props.amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activities_item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    width: 400,
    marginBottom: 1,
    // backgroundColor: 'yellow',
    // borderWidth: 1,
  },
  transList: {
    flex: 4,
    justifyContent: 'center',
    alignContent: 'flex-start',
    // borderWidth: 1,
    width: 200,
    paddingLeft: 20,
  },
  icon: {
    alignContent: 'flex-end',
    justifyContent: 'center',
    marginLeft: -10,
  },
  amount: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // borderWidth: 1,
    marginRight: 10,
  },
});
