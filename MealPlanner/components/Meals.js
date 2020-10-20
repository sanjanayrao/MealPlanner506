import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements'

const testMeals = [
    {
        "name": "poo",
        "ingredients": {
            "garlic" : "5",
            "potato" : "1"
        },
        "steps" : "hfrihferigherigrjtijrt",
        "servings" : 5

    },
    {
        "name": "poo",
        "ingredients": {
            "garlic" : "5",
            "potato" : "1"
        },
        "steps" : "hfrihferigherigrjtijrt",
        "servings" : 5

    },  {
        "name": "poo",
        "ingredients": {
            "garlic" : "5",
            "potato" : "1"
        },
        "steps" : "hfrihferigherigrjtijrt",
        "servings" : 5

    },  {
        "name": "poo",
        "ingredients": {
            "garlic" : "5",
            "potato" : "1"
        },
        "steps" : "hfrihferigherigrjtijrt",
        "servings" : 5

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
            console.log(this.state.meals[i])
            cards.push(
            <Card key={i}>
                <Card.Title>
                    {this.state.meals[i].name}
                </Card.Title>
                <Text>
                    Serves: {this.state.meals[i].servings}
                </Text>
                <Button
                    title="View Meal"
                    type="outline"
                    buttonStyle={styles.mealButton}
                    />            
            </Card>)
        }
        return cards;
    }
    render(){
        return(
           <ScrollView>
               <Text h2>My Meals</Text>
               {this.getMealCards()}
           </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    mealButton:{
      color: 'black', 
      padding: 10, 
      borderRadius: 10,
      height: 60,
      alignSelf: 'center',
      alignItems: 'center',
      margin:10,
      justifyContent: 'center',
      alignContent: 'center'
  
    }
  });