import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';


export default class MealInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            meal : { 
                name: '',
                ingredients: {},
                steps: '',
                servings: 0
            }
        }
    }

    componentDidMount(){
        this.setState({meal : this.props.route.params.meal})
    }
    getIngredients(){
        let ingreds = [];
        if(this.state.meal.ingredients){
            for(const i in this.state.meal.ingredients){
                let ing = this.state.meal.ingredients[i];
                ingreds.push(
                <Text>➤ {ing.name} -  x{ing.amount} {ing.unit}</Text>
                )
            }
        }
        return ingreds
    }
    render(){
        return(
            <ScrollView>
                <Card>
                    <Card.Title> 
                        <Text h2> {this.state.meal.name} </Text>
                    </Card.Title>
                    <View style={styles.textArea}>
                        <Text  style={styles.header} h4>
                            Ingredients:
                        </Text>
                        <Text style={styles.header}>Serves: {this.state.meal.servings}</Text>
                        {this.getIngredients()}
                    </View>
                    <View style={styles.textArea}>
                        <Text style={styles.header} h4>
                            Steps:
                        </Text>
                        <Text>
                            {this.state.meal.steps} 
                        </Text>
                   </View>

                </Card>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    textArea: {
        margin: 20
    },
    header:{
        marginBottom: 10
    }
});