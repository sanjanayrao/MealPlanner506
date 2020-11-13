import React from 'react'; //passes
import {Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, AsyncStorage} from 'react-native'; //passes
//import { Card, ListItem, Icon, Text, Input } from 'react-native-elements'; //fails
//import  {Dialog, DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';//fails
import Button from './Button' //passes
//import * as controller from '../backend/controller' 


export default class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            visibleDeleteMeals: false,
            visibleDeleteUser: false,
            visibleLogout: false,
            user : ''
        };
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
      }

    componentDidMount(){
        this._retrieveData()
    }


    async removeAllMeals(){
        this.setStateFalseMeals()
        // remove all meals here
        await controller.delete_all_meals(this.state.user)
        this.props.navigation.navigate("Log In")

    }
    async removeUser(){
        this.setStateFalseUser()
            // TODO:  remove user 
        await controller.delete_user(this.state.user)
        this.props.navigation.navigate("Log In")

    }
    logout(){
        this.props.navigation.navigate("Log In")
        this.setStateFalseUser()
    }

    setStateFalseMeals(){
        // hide the modal
        this.setState({visibleDeleteMeals: false})
    }
    setStateFalseLogout(){
        // hide the modal
        this.setState({visibleDeleteUser: false})
    }
    setStateFalseUser(){
        // hide the modal
        this.setState({visibleLogout: false})
    }
    

    render(){
        return(
            <View>
                <Text style={styles.header} h2>  Settings </Text>
                <View >  
                 
                    <Button style={styles.button}
                        text={'Remove all meals'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visibleDeleteMeals: true})
                        }
                    />
                    <Button style={styles.button}
                        text={'Delete my account'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visibleDeleteUser: true})
                        }
                    />
                    <Button style={styles.button}
                        text={'Log out'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visibleLogout: true})
                        }
                    />
                    <View style={styles.space} />
                
                   
                </View>  
                
            </View>
        )
    }

}
const styles = StyleSheet.create({
    edit:{
        backgroundColor: '#9FC9AE', 
        padding: 20, 
        borderRadius: 10,
        marginHorizontal: 5,
        margin: 10

    },
    button:{
        backgroundColor: '#9FC9AE', 
        padding: 10, 
        borderRadius: 10,
        height: 60,
        width: "75%",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10
    
      },
      space: {
        width: 20, // or whatever size you need
        height: 20,
      },
   
})