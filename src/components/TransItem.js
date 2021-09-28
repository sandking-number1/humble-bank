import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import { IconBtnOnly } from './Icon';
import { font } from './GlobalStyles';

export default function TransList(props) {
  const formatDate = (original) => {
    const date = moment(original).format('D.M.YYYY');
    return date;
  };

  return (
    <View style={styles.activities_item}>
      <TouchableOpacity onPress={() => props.deleteItem(props.id)}>
        <View style={styles.icon}>
          <IconBtnOnly name={'isv'} />
        </View>
      </TouchableOpacity>

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
  },
  transList: {
    flex: 4,
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: 200,
    paddingLeft: 20,
  },
  icon: {
    alignContent: 'flex-end',
    padding: 18,
    borderRadius: 14,
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    marginLeft: -10,
  },
  amount: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    // borderWidth: 1,
    marginRight: 10,
  },
});
