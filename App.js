import React from 'react';
import StartPage from './screens/StartPage';
import Home from './screens/Home';
import AddMoney from './screens/AddMoney';
import AddSpend from './screens/AddSpend';
import TransDetails from './screens/TransDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <AddSpend />
    <NavigationContainer>
      <Stack.Navigator //
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddSpend" component={AddSpend} />
        <Stack.Screen name="AddMoney" component={AddMoney} />
        <Stack.Screen name="TransDetails" component={TransDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
