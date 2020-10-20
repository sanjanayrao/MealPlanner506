import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet} from 'react-native';


export default class MealInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            name: '',
            ingredients: {},
            steps: '',
            servings: 0
        }
    }

    render(){
        return(
            <View>
                <Text>A specific meal</Text>
            </View>
        )
    }

}