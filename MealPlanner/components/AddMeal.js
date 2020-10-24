import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import Button from './Button'

export default class AddMeal extends React.Component{
    constructor(props){
        super();
        this.state = {
            name: '',
            ingredients: '',
            steps: '',
            servings: ''
        }
    }

    updateDB(){
        // TODO:  update the database with the added meal here

        
        this.props.navigation.goBack();


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