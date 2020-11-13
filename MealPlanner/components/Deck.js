import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, Picker, FlatList, AsyncStorage} from 'react-native';
//import { Card, ListItem, Icon, Text } from 'react-native-elements';
import Button from './Button';
//import * as controller from '../backend/controller'



export default class Meals extends React.Component{
    constructor(){
        super();
        this.state = {
            meals: [],
            servings: '4',
            user: ''
        }
    }
/*
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

        //this.setState({meals: data_from_shit})
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
*/
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
        console.log(itemValue)
    }
    render(){
        return(
           <ScrollView>
               <View  style={{
                                flexDirection: 'row',
                                margin: 10
                            }}> 
                    <Text style={styles.header} h2>Meals on Deck</Text>
                    
                    <Picker
                        selectedValue={this.state.servings}
                        style={{ height: 5, width: 50,
                            
                        marginTop: -68,
                
                        }}
                        onValueChange={(itemValue) => this.picker(itemValue) }
                    >
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                        <Picker.Item label="9" value="9" />
                        <Picker.Item label="10" value="10" />
                        <Picker.Item label="11" value="11" />
                        <Picker.Item label="12" value="12" />
                        <Picker.Item label="13" value="13" />
                        <Picker.Item label="14" value="14" />
                        <Picker.Item label="15" value="15" />
                        <Picker.Item label="16" value="16" />
                        <Picker.Item label="17" value="17" />
                        <Picker.Item label="18" value="18" />
                        <Picker.Item label="19" value="19" />
                        <Picker.Item label="20" value="20" />
                    </Picker>
                    <Button text={'↺'} textStyle={{color:'white', fontSize: 36}} buttonStyle={styles.generate} onPress={()=>this.generate()}/>
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
        width: '15%',
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin:10,
      }
  });