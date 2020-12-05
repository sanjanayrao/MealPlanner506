import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, FlatList, AsyncStorage} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import NumericInput from 'react-native-numeric-input'

import { Card, ListItem, Icon, Text } from 'react-native-elements';
import Button from './Button';
import * as controller from '../backend/controller'



export default class Meals extends React.Component{
    constructor(){
        super();
        this.state = {
            meals: [],
            servings: 4,
            user: ''
        }
    }

    async get_meals(user){
        // use controller thing
        var response = {};

        if(!user){
            user = this.state.user
        }
        await controller.get_meals(user)
        .then(function(result) {
            response = result;
        });
        
        // overwrite test meals?
        if(response.success){
            this.setState({meals: response.meals});
            //testMeals = response.meals;
        }

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
    componentDidMount(){
        this._retrieveData()
    }
    async generate(){
        console.log("GENERATE");
        //  GET GENERATED MEALS FROM API using the number of servings in the stateS
        var response = {};
        await controller.generate_deck(this.state.user, this.state.servings)
        .then(function(result) {
            response = result
        })

        if(response.success) {
            this.setState({meals: response.deck})
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
    
    picker(itemValue){
        this.setState({servings: itemValue})
    }
    render(){
        return(
           <ScrollView>
               <Text style={styles.header} h2 >Meals on Deck</Text>
               <Text style={styles.header}h5>Select the number of meals you'd like to randomly generate</Text>
               <View  style={{
                                flexDirection: 'row',
                                margin: 10,
                            }}> 
                    
                    <NumericInput minValue={4} maxValue={80} value={this.state.servings} onChange={value => this.picker(value)} />

                  
                    <Button text={'GENERATE'} textStyle={{color:'white'}} buttonStyle={styles.generate} onPress={()=>this.generate()}/>
               </View>
                <View>
                    {this.getMealCards()}
                </View>
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
      },
      generate:{
        backgroundColor: '#553555', 
        padding: 10, 
        borderRadius: 50,
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin:10,
        marginTop: 25,
        marginLeft: 140
      }
  });