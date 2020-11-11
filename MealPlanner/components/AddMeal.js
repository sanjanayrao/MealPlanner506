import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, AsyncStorage} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import Button from './Button'
import * as controller from '../backend/controller'
import * as helper from '../backend/helper'

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

    async updateDB(){
        var response = {};
        await controller.add_meal(
            this.state.user, 
            this.state.name, 
            helper.string_to_array(this.state.ingredients), 
            this.state.steps,
            this.state.servings
        )
        .then(function(result) {
            response = result
        })
        
        if(response.success) {
            // TODO: Do something with the id because the meal was added
        }
        this.props.route.params.update()
        this.props.navigation.goBack();
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

    componentDidMount(){
        this._retrieveData()
    }

    render(){
        return(
            <View>
                <Card>
                    <Input
                    placeholder="Name"
                    onChangeText={value => this.setState({ name: value })}
                    />
                     <Input
                    placeholder="Ingredients: eg '4 cloves of garlic'"
                    onChangeText={value => this.setState({ ingredients: value })}
                    />
                     <Input
                    placeholder="Steps"
                    onChangeText={value => this.setState({ steps: value })}
                    />
                     <Input
                    placeholder="Servings"
                    onChangeText={value => this.setState({ servings: value })}
                    />
                     <Button
                        text={'Add Meal'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=>this.updateDB() }
                    />
                </Card>
                
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