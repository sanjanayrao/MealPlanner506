import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, FlatList, SafeAreaView, AsyncStorage} from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';
import Button from './Button';
import * as controller from '../backend/controller';
import * as helper from '../backend/helper';

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
        "key" : 13,
        "user" : "admin"



    },{
        "name": "A really long recipe name that never seems to end",
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
        "key" : 12,
        "user" : "admin"



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
        "key" : 1   ,
        "user" : "admin"



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
        "key" : 18,
        "user" : "admin"

    }
]

export default class Meals extends React.Component{
    constructor(props){
        super();
        this.state = {
            meals: testMeals,
            user: ''
        }
    }

    async get_meals(){
        // use controller thing
        var response = {};

        await controller.get_meals("admin")
        .then(function(result) {
            response = result;
        });
        
        // overwrite test meals?
        if(response.success){
            this.setState({meals: response.meals});
        }

        //this.setState({meals: data_from_shit})
    }
    
    componentDidMount(){
        this._retrieveData()

        this.get_meals();
    }
    
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // We have data!!
            this.setState({user: value})

          }
        } catch (error) {
          // Error retrieving data
        }
      };

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
                    onPress={()=>this.props.navigation.navigate('Meal View', 
                                                        {'meal' : this.state.meals[i] } )}
                    />            
            </Card>)
        }
        return cards;
    }

    addMeal(){
        this.props.navigation.navigate('Add Meal', {'user' : this.state.user})

    }
    render(){
        return(
            <View>
                <View>
                     <Text style={styles.header} h2>My Meals</Text>
                     <Button text={'+'} textStyle={{color:'white', fontSize: 36}} buttonStyle={styles.add} onPress={()=>this.addMeal()}/>

                </View>   
            
                <SafeAreaView style={styles.container}>
                    <FlatList 
                        data={this.state.meals}
                        numColumns={2} 
                        keyExtractor={(item) => item.key}
                        renderItem={(item) => 
                            <Card key={item.key}>
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
        padding: 10, 
        borderRadius: 50,
        width: '15%',
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