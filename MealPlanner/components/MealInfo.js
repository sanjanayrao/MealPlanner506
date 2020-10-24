import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';
import Button from './Button';


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

    deleteMeal(){
        // TODO: MAKE API CALL HERE AND HANDLE DELETION OF MEAL
    }
    edit(){
        // display edit modal    
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
                        
                        {/* <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
                            <View >
                                <Text style={styles.title} h2> {this.state.meal.name} </Text>
                            </View>
                            <View >
                            <Button
                                text={'Edit'}
                                textStyle={{color: 'white'}}
                                buttonStyle={styles.edit}
                                onPress={()=>this.edit() }
                            />
                            </View>
                            <View >
                            <Button
                                text={'Delete'}
                                textStyle={{color: 'white'}}
                                buttonStyle={styles.delete}
                                onPress={()=>this.deleteMeal() }
                            /> 
                            </View>
                           
                        </View> */}
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'space-between',
                            }}>
                                <Text style={styles.title} h2> {this.state.meal.name} </Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Button
                                        text={'Edit'}
                                        textStyle={{color: 'white'}}
                                        buttonStyle={styles.edit}
                                        onPress={()=>this.edit() }
                                    />
                                </View>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Button
                                        text={'Delete'}
                                        textStyle={{color: 'white'}}
                                        buttonStyle={styles.delete}
                                        onPress={()=>this.deleteMeal() }
                                    /> 
                                </View>
                            </View>
                        </View>
                        );
                         
                         
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
    },
    delete:{
        backgroundColor: 'red', 
        padding: 10, 
        borderRadius: 10,
        marginHorizontal: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'relative'

    },
    edit:{
        backgroundColor: '#9FC9AE', 
        padding: 10, 
        borderRadius: 10,
        marginHorizontal: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'relative'

    },
    
});