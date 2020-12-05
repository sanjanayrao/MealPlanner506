import React from 'react';
import { View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, FlatList, SafeAreaView, AsyncStorage} from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Button from './Button';
import * as controller from '../backend/controller';
import * as helper from '../backend/helper';


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
            this.setState({err: response.err})
        } else {
            this.setState({meals: []})
            this.setState({err: response.err})
        }
    }
    
    
    componentDidMount(){
         this._retrieveData()
         this.focusListener = this.props.navigation.addListener('focus', () => {
            // do something
            this.get_meals(this.state.user)
         })
    }
   
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

    addMeal(){
        this.props.navigation.navigate('Add Meal', {update : this.get_meals})

    }

    render_user_meals(){
        let cards = [];
        let card_data = this.state.meals;

        for(let i = 0; i < card_data.length; i += 2){
                cards.push(
                <View style={{flex: 1, flexDirection: 'row'}}>
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
                </Card>
                {i + 1 != card_data.length &&
                <Card key={i+1}>
                    <Card.Title>
                        {this.state.meals[i+1].name}
                    </Card.Title>
                    <Text>
                        Serves: {this.state.meals[i+1].servings}
                    </Text>
                
                    <Button
                        text={'View Meal'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.mealButton}
                        onPress={()=>this.props.navigation.navigate('Meal View', {'meal' : this.state.meals[i+1] } )}
                        />            
                </Card>
                }
                </View>
                )
        }
        return cards;
    }
    render(){
        return(
            <View>
                <View style={{flex:0, flexDirection:"row", justifyContent:'space-between'}}>
                     <Text style={styles.header} h2>My Meals</Text>
                     <Button text={'+'} textStyle={{color:'white', fontSize: 36}} buttonStyle={styles.add} onPress={()=>this.addMeal()}/>
                </View>   
                {this.state.err ? <Text style={{marginTop: '40%', alignSelf: 'center', color:'grey'}}>{this.state.err}</Text> : <Text></Text>}
                    <SafeAreaView
                        style={{marginBottom: 200, marginLeft: 'auto', marginRight: 'auto'}}
                    >
                    <View>
                    <ScrollView>
                        <View>
                            {this.render_user_meals()}
                        </View>
                    </ScrollView>
                    </View>
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