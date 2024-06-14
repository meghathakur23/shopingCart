import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeStack">
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="MensWear"
        component={CategoryScreen}
        initialParams={{category: "men's clothing"}}
      />
      <Drawer.Screen
        name="WomensWear"
        component={CategoryScreen}
        initialParams={{category: "women's clothing"}}
      />
      <Drawer.Screen
        name="Jewelry"
        component={CategoryScreen}
        initialParams={{category: 'jewelery'}}
      />
    </Drawer.Navigator>
  );
}

// Define the HomeStack which includes HomeScreen and DetailsScreen
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};
