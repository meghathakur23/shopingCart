/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/Navigation';
import {DataProvider} from './src/context/DataContext';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
function App(): React.JSX.Element {
  // const Stack = createNativeStackNavigator();

  return (
    <DataProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;
