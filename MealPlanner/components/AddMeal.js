import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, AsyncStorage} from 'react-native';

import Button from './Button'


export default class AddMeal extends React.Component{
    constructor(props){
        super();
        this.state = {
            name: '',
            ingredients: '',
            steps: '',
            servings: '',
            user: ''
        }
    }
    componentDidMount(){
        this.setName('Tacos');
        this.setIngredients('Cheese, ground beef');
        this.setSteps("cook beef, melt cheese");
        this.setServings('5');
        this.setUser("input values");

    }
    setName(value){
        this.setState({name: value});
      }
      setIngredients(value){
        this.setState({ingredients: value});
      }
      setSteps(value){
        this.setState({steps: value});
      }
      setServings(value){
        this.setState({servings: value});
      }
      setUser(value){
        this.setState({user: value});
      }

    render(){
        return(
            <View>
               
                    <TextInput
                    placeholder="Name"
                    onChangeText={value => this.setState({ name: value })}
                    />
                     <TextInput
                    placeholder="Ingredients: eg '4 cloves of garlic'"
                    onChangeText={value => this.setState({ ingredients: value })}
                    />
                     <TextInput
                    placeholder="Steps"
                    onChangeText={value => this.setState({ steps: value })}
                    />
                     <TextInput
                    placeholder="Servings"
                    onChangeText={value => this.setState({ servings: value })}
                    />
                     <Button
                        text={'Add Meal'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=>this.updateDB() }
                    />
                
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    edit:{
        backgroundColor: '#9FC9AE', 
        padding: 10, 
        borderRadius: 10,
        marginHorizontal: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'relative'

    },
})