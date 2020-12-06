import React from 'react';
import {  View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, Modal, TouchableHighlight, AsyncStorage, LogBox} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import Button from './Button';
import * as helper from '../backend/helper'
import * as controller from '../backend/controller'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default class MealInfo extends React.Component{
    constructor(){
        super();
        this.state = {
            meal : { 
                name: '',
                ingredients: '',
                steps: '',
                servings: 0,
                id: ''
            },
            user: '',
            modal: false,
            modalVals : {
                name: '',
                ingredients: '',
                steps: '',
                servings: 0
            }
        }
    }

    componentDidMount(){
        this._retrieveData()
        this.setState({meal : this.props.route.params.meal})
        console.log(this.props.route.params.meal)
    }
    
    async deleteMeal(){
        var response = {};
        await controller.delete_meal(this.state.user, this.state.meal.id)
        .then(function(result) {
            response = result;
        })
        if(response.success) {
            for(let i =0; i < 1000000; i++){}
            this.props.navigation.goBack()
            console.log("DELETED");
        }
        if(!response.success)
            console.error("UHOH in delete");
       
    }
   
    edit(){
        // display edit modal   
        this.showModal();

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

    
    updateMeal(){
        let mealObj = this.state.meal;
        if(this.state.meal.name != this.state.modalVals.name){
            mealObj['name'] = this.state.modalVals.name;
        }
        if(this.state.meal.ingredients != this.state.modalVals.ingredients){
            mealObj['ingredients'] = this.state.modalVals.ingredients;
        }
        if(this.state.meal.steps != this.state.modalVals.steps){
            mealObj['steps'] = this.state.modalVals.steps;
        }
        if(this.state.meal.servings.toString() != this.state.modalVals.servings.toString()){
            mealObj['servings'] = this.state.modalVals.servings;
        }
        this.setState({meal: Object.assign({}, mealObj)}, ()=>{this.sendUpdate(mealObj)})
    }

    async sendUpdate(mealObj){
        var response = {};
        mealObj.ingredients = helper.string_to_array(mealObj.ingredients);
        await controller.update_meal(this.state.user, mealObj)
        .then(function(result) {
            response = result;
        })

        if(!response.success)
            console.error("UHOH in update");
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
       
    //    for(const i in this.state.modalVals.ingredients){
    //         let ing = this.state.modalVals.ingredients[i];
    //         let add = ing.amount + " " + ing.unit + " of " + ing.name + ", "
    //         s += add;
    //    }
      
       return this.state.modalVals.ingredients;
       
     // return this.state.meal.ingredients
   }
    hideModalAndSave = () =>{
        this.updateMeal();
        this.setState({modal: false})
    }

    hideModal = () => {
        this.setState({modal: false})
    }

    showModal = () =>{
        console.log(this.state.meal)

        this.setState({modalVals: Object.assign({}, this.state.meal)})
        this.setState({modal: true})
        //console.log(this.state.meals.ingredients)
      
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
                      
                        <TextInput
                        onChangeText={value => this.changeName(value)}
                        value={this.state.modalVals.name}
                        style={styles.input}
                        />
                        <TextInput
                        onChangeText={value => this.changeIngredients(value)}
                        value={this.returnCurrIngredientsString()}
                        style={styles.input}
                        />
                        <TextInput
                        onChangeText={value => this.changeSteps(value)}
                        value={this.state.modalVals.steps}
                        style={styles.input}
                        />
                        <TextInput
                        onChangeText={value => this.changeServings(value)}
                        value={this.state.modalVals.servings.toString()}
                        style={styles.input}
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
                        
                        <Text style={styles.header}>Serves: {this.state.meal.servings}</Text>
                        <Text  style={styles.header} h4>
                            Ingredients:
                        </Text>
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
      },
      input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
      },
    
});