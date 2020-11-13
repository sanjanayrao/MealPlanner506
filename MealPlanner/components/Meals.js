import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, FlatList, SafeAreaView, AsyncStorage} from 'react-native';
//import { Card, ListItem, Icon, Text } from 'react-native-elements';
//import { useFocusEffect } from '@react-navigation/native';
import Button from './Button';
//import * as controller from '../backend/controller';
//import * as helper from '../backend/helper';


export default class Meals extends React.Component{
    constructor(props){
        super();
        this.state = {
            meals: [],
            user: '',
            err: ''
        }
        this.get_meals = this.get_meals.bind(this)
    }
    get_meals(){
        
    }
    
    
    
//    componentDidMount(){
 //        this._retrieveData()
  //       this.focusListener = this.props.navigation.addListener('focus', () => {
   //         // do something
     //       this.get_meals(this.state.user)
       //  })
   // }
   
    componentWillUnmount(){
        this.focusListener()
    }
  
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // We have data!!
            this.setState({user: value})
            this.get_meals(value)

          }
        } catch (error) {
          // Error retrieving data
        }
      };

    getMealCards(){
        let cards = [];

        for(const i in this.state.meals){
            cards.push(
            <View key={this.state.meals[i].id}>
                <Text>
                    {this.state.meals[i].name}
                </Text>
                <Text>
                    Serves: {this.state.meals[i].servings}
                </Text>
                <Button
                    text={'View Meal'}
                    textStyle={{color: 'white'}}
                    buttonStyle={styles.mealButton}
                    onPress={()=>this.props.navigation.navigate('Meal View', 
                                                        {'meal' : this.state.meals[i] } )}
                    />            
            </View>)
        }
        return cards;
    }

    addMeal(){
        this.props.navigation.navigate('Add Meal', {update : this.get_meals})

    }
    render(){
        return(
            <View>
                <View>
                     <Text style={styles.header} h2>My Meals</Text>
                     <Button text={'+'} textStyle={{color:'white', fontSize: 36}} buttonStyle={styles.add} onPress={()=>this.addMeal()}/>

                </View>   
                {this.state.err ? <Text style={{marginTop: '40%', alignSelf: 'center', color:'grey'}}>{this.state.err}</Text> : <Text></Text>}
                <SafeAreaView style={styles.container}>
                    <FlatList 
                        data={this.state.meals}
                        numColumns={2} 
                        keyExtractor={(item) => item.id}
                        renderItem={(item) => 
                            <Card key={item.id}>
                                <Card.Title>
                                    {item.item.name}
                                </Card.Title>
                               
                                <Button
                                    text={'View Meal'}
                                    textStyle={{color: 'white'}}
                                    buttonStyle={styles.mealButton}
                                    onPress={()=>{
                                        this.props.navigation.navigate('Meal View', {'meal' : item.item} ) ;
                                    }}
                                    /> 
                            </Card>  
                    }
                    />
                </SafeAreaView>
                </View>
        )
    }

}
const styles = StyleSheet.create({
    mealButton:{
      backgroundColor: '#9FC9AE', 
      padding: 10, 
      borderRadius: 10,
      height: 60,
      width: "75%",
      alignSelf: 'center',
      alignItems: 'center',
      margin:10,
      justifyContent: 'center',
      alignContent: 'center'
  
    },
    add:{
        backgroundColor: '#553555', 
        paddingTop: 7,
        borderRadius: 100,
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin:10,
    
      },
      
    container:
    {
        alignSelf: 'center',
        alignItems: 'center',
        margin:10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    header:{
        margin: 15
      }
    
  });