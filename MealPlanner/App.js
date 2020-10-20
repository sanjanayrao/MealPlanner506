import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './components/Home';
import Meals from './components/Meals';
import Deck from './components/Deck';
import List from './components/List';
import Settings from './components/Settings'



function Homescreen() {
  return (
    <Home/>
  );
}

function Mealscreen() {
  return (
    <Meals/>
  );
}

function Deckscreen() {
  return (
    <Deck/>
  );
}

function Listscreen() {
  return (
    <List/>
  );
}

function Settingscreen(){
  return (
    <Settings/>
  );
}

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Meals" component={Mealscreen} />
      <Tab.Screen name="Deck" component={Deckscreen} />
      <Tab.Screen name="List" component={Listscreen} />
      <Tab.Screen name="Settings" component={Settingscreen} />
 
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Log In" component={Homescreen} />
      <Stack.Screen name="Profile" component={BottomTabs} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
