import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, FlatList} from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';
import Button from './Button';


const testMeals = [
    {
        "name": "poo",
        "ingredients": [
            {
                'name': 'garlic',
                'amount' : '4',
                'unit' : 'cloves'
            },
            {
                'name': 'garpotatolic',
                'amount' : '4',
                'unit' : 'pounds'
            },
            

        ],
        "steps" : "hfrihferigherigrjtijrt",
        "servings" : 5,
        "key" : 13


    },{
        "name": "yummyneww",
        "ingredients": [
            {
                'name': 'water',
                'amount' : '12',
                'unit' : 'gallons'
            },
            {
                'name': 'tomato',
                'amount' : '4',
                'unit' : 'pounds'
            },
            

        ],
        "steps" : "stir it a lot",
        "servings" : 5,
        "key" : 12


    },{
        "name": "brandt",
        "ingredients": [
            {
                'name': 'salt',
                'amount' : '4',
                'unit' : 'tons'
            },
            {
                'name': 'evil',
                'amount' : '32',
                'unit' : 'centimeters'
            },
            

        ],
        "steps" : "boil until he ded",
        "servings" : 5,
        "key" : 1   


    },{
        "name": "not food",
        "ingredients": [
            {
                'name': 'garlic',
                'amount' : '4',
                'unit' : 'cloves'
            },
            {
                'name': 'mustard',
                'amount' : '4',
                'unit' : 'cups'
            },
            

        ],
        "steps" : "bake it",
        "servings" : 5,
        "key" : 18

    }
]

export default class Meals extends React.Component{
    constructor(){
        super();
        this.state = {
            meals: testMeals
        }
    }

    getMealCards(){
        let cards = [];

        for(const i in this.state.meals){
            cards.push(
            <Card key={i}>
                <Card.Title>
                    {this.state.meals[i].name}
                </Card.Title>
                <Text>
                    Serves: {this.state.meals[i].servings}
                </Text>
                <Button
                    text={'View Meal'}
                    textStyle={{color: 'white'}}
                    buttonStyle={styles.mealButton}
                    onPress={()=>this.props.navigation.navigate('Meal View', {'meal' : this.state.meals[i] } )}
                    />            
            </Card>)
        }
        return cards;
    }
    
    render(){
        return(
           <ScrollView>
                <Text style={styles.header} h2>Meals on Deck</Text>
                {this.getMealCards()}
                
           </ScrollView>
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
    list:{
        width: '100%'

    },
    header:{
        margin: 15
      }
  });