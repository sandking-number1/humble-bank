import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { cos } from 'react-native-reanimated';
import HomeMain from '../src/components/home/HomeMain';
import TransList from '../src/components/TransList';

export default function AddMoney() {
  return (
    <SafeAreaView>
      <View>
        <Text>AddMoney</Text>
      </View>
    </SafeAreaView>
  );
}
