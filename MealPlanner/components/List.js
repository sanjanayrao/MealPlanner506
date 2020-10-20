import * as React from 'react';
const { useCallback, useState } = React
import {  View, StyleSheet, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';

import SwipeRow from './SwipeRow'

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} 

// NOTE: this implementation is based off of a medium post tutorial on swipeable carde
// https://snack.expo.io/@computerjazz/swipetodelete-rngh-reanimated




// grocery list if a payload of array of ingredient objects, NO DUPLICATES
const test = [
  
    {
      'name': 'egg',
      'amount' : '2',
      'unit' : 'cartons',
       'key' : 13
  },
  {
    'name': 'rice',
    'amount' : '4',
    'unit' : 'bags',
    'key' : 1

},
{
  'name': 'garlic',
  'amount' : '2',
  'unit' : 'cloves',
  'key' : 14

}, {
  'name': 'onion',
  'amount' : '7',
  'unit' : 'pounds',
  'key' : 11

}, {
  'name': 'tomato',
  'amount' : '3',
  'unit' : 'pounds',
  'key' : 18

}, {
  'name': 'potato',
  'amount' : '9',
  'unit' : 'pounds',
  'key' : 122

},
]

class App extends React.Component {

  state = {
    data: [],
  }

  componentDidMount(){
    // reduce meals to just 
    let temp = test;
   
    this.setState({data: temp})
  }
  deleteItem = (item) => {
    const updatedData = this.state.data.filter(d => d !== item)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ data: updatedData })
    // TODO: MAKE API CALL HERE TO DELETE ITEM
  }

  renderItem = ({ item, index }) => (
       
        <SwipeRow
          key={item.key}
          item={item}
          swipeThreshold={-150}
          onSwipe={this.deleteItem} 
        >
            <Text h4 style={styles.swipe}>{item.name} - {item.amount} {item.unit}</Text>
        </SwipeRow>
      ) 

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.header} h2>
          Grocery List
        </Text>
       <FlatList 
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipe:{  
    backgroundColor: "white",
    color: 'black',
    fontSize: 16,
    flex: 1,
    padding: 25,
    textAlign: 'center',
    margin: 2
  } ,
  header:{
    margin: 15
  }
});
