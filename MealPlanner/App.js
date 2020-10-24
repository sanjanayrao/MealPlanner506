import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './components/Home';
import Meals from './components/Meals';
import MealInfo from './components/MealInfo';
import Deck from './components/Deck';
import List from './components/List';
import Settings from './components/Settings';
import AddMeal from './components/AddMeal';


function Homescreen({navigation}) {
  return (
    <Home navigation={navigation}/>
  );
}


function Mealsscreen({navigation}) {
  return (
    <Meals navigation={navigation} />
  );
}

function Mealscreen( {route}) {
  return (
    <MealInfo route={route}  />
  );
}

function Deckscreen({navigation}) {
  return (
    <Deck navigation={navigation}  />
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

function AddMealScreen({navigation}){
  return(
    <AddMeal navigation={navigation}/>
  );
}


const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Meals" component={Mealsscreen} />
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
      <Stack.Screen name="Meal View" component={Mealscreen}/>
      <Stack.Screen name="Deck" component={Deckscreen} />
      <Stack.Screen name="Meals" component={Mealsscreen} />
      <Stack.Screen name="My Meal Planner" component={BottomTabs} />
      <Stack.Screen name="Add Meal" component={AddMealScreen} />
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
