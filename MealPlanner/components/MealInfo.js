import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, Modal, TouchableHighlight} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import Button from './Button';
import * as helper from '../backend/helper'

export default class MealInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            meal : { 
                name: '',
                ingredients: '',
                steps: '',
                servings: 0,
                user: ''
            },
            modal: false,
            modalVals : {
                name: '',
                ingredients: '',
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
        this.showModal();

    }
    updateMeal(){
        let mealObj = this.state.meal;
        if(this.state.meal.name != this.state.modalVals.name){
            mealObj['name'] = this.state.modalVals.name;
        }
        if(this.state.meal.ingredients != this.state.modalVals.ingredients){
            mealObj['ingredients'] = this.parseIngredients(this.state.modalVals.ingredients);
        }
        if(this.state.meal.steps != this.state.modalVals.steps){
            mealObj['steps'] = this.state.modalVals.steps;
        }
        if(this.state.meal.servings.toString() != this.state.modalVals.servings.toString()){
            mealObj['servings'] = this.state.modalVals.servings;
        }
        this.setState({meal: mealObj})
        // MAKE API CALL HERE TO UPDATE THE MEAL W THE CURRENT STATE
    }
    
    parseIngredients(ingred_string){
        let arr = ingred_string.split(",")
       
        return arr

    }
    componentDidMount(){
        
        this.setState({meal : this.props.route.params.meal})
    }
    getIngredients(){
        let ingreds = [];
        if(this.state.meal.ingredients){
            var ingr_arr = helper.string_to_array(this.state.meal.ingredients);
            for(const i in ingr_arr){
                let ing = ingr_arr[i];
                ingreds.push(
                <Text key={i}>➤{ing}</Text>
                )
            }
        }
        return ingreds
    }
   returnCurrIngredientsString(){
       let s = ""
       /*
       for(const i in this.state.meal.ingredients){
            let ing = this.state.meal.ingredients[i];
            let add = ing.amount + " " + ing.unit + " of " + ing.name + ", "
            s += add;
       }
       
       return s;
       */
      return this.state.meal.ingredients
   }
    hideModalAndSave = () =>{
        this.updateMeal();
        this.setState({modal: false})
    }

    hideModal = () => {
        this.setState({modal: false})
    }

    showModal = () =>{
        
        this.setState({modalVals: Object.assign({}, this.state.meal)})
        this.setState({modal: true})
    }

    changeName(val){
        let myObj = this.state.modalVals
        myObj.name = val
        this.setState({modalVals: myObj})
    }

    changeIngredients(val){
        let myObj = this.state.modalVals
        myObj.ingredients = val
        this.setState({modalVals: myObj})
    }
    changeSteps(val){
        let myObj = this.state.modalVals
        myObj.steps = val
        this.setState({modalVals: myObj})
    }
    changeServings(val){
        let myObj = this.state.modalVals
        myObj.servings = val
        this.setState({modalVals: myObj})
    }
    render(){
        return(
            <ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Input
                        placeholder={this.state.modalVals.name}
                        onChangeText={value => this.changeName(value)}
                        />
                        <Input
                        placeholder={this.returnCurrIngredientsString()}
                        onChangeText={value => this.changeIngredients(value)}
                        />
                        <Input
                        placeholder={this.state.modalVals.steps}
                        onChangeText={value => this.changeSteps(value)}
                        />
                        <Input
                        placeholder={this.state.modalVals.servings.toString()}
                        onChangeText={value => this.changeServings(value)}
                        />

                        <TouchableHighlight
                        style={{ ...styles.openButton}}
                        onPress={() => {
                            this.hideModalAndSave();
                        }}
                        >
                        <Text style={{color: 'white'}}>Save Changes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                        style={{ ...styles.cancel}}
                        onPress={() => {
                            this.hideModal();
                        }}
                        >
                        <Text style={{color: 'white'}} >Cancel</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
                <Card>
                    <Card.Title> 
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
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'relative'

    },
    edit:{
        backgroundColor: '#9FC9AE', 
        padding: 10, 
        borderRadius: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'relative'

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "90%"
      },
      openButton: {
        backgroundColor: "#553555",
        borderRadius: 10,
        padding: 10,
        margin: 5,
        elevation: 2,
      },
      cancel:{
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    
});