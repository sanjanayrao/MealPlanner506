import * as React from 'react';
const { useCallback, useState } = React
import { Text, View, StyleSheet, FlatList, LayoutAnimation, Platform, UIManager, AsyncStorage } from 'react-native';


if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
} 

// NOTE: this implementation is based off of a medium post tutorial on swipeable carde
// https://snack.expo.io/@computerjazz/swipetodelete-rngh-reanimated

class List extends React.Component {

  state = {
    data: [],
  }

  componentDidMount(){
    this._update()

  }

  _update(){
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        this.setState({user: value})
        this.retrieveItems(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  
   

  deleteItem = (item) => {
    const updatedData = this.state.data.filter(d => d !== item)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ data: updatedData })
  }

  renderItem = ({ item, index }) => (
       
        <SwipeRow
          item={item}
          swipeThreshold={-150}
          onSwipe={this.deleteItem} 
        >
            <Text h4 style={styles.swipe}>{item}</Text>
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
          keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  }
}

export default List

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
