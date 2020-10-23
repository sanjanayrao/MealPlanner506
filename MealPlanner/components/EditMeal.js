import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';


// TODO: MAKE THIS A MODAL INSTEAD to avoid navigation
export default class EditMeal extends React.Component{
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
        // update the database with the added meal here
    }

    componentDidMount(){
        this.setState({ : this.props.route.params.})

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
                </Card>
                
            </View>
        )
    }
}