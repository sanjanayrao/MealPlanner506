import React from 'react';
import {View,  StyleSheet, AsyncStorage, LogBox} from 'react-native';
import { Card, Text } from 'react-native-elements';
import  {Dialog, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
import Button from './Button'
import * as controller from '../backend/controller'

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications




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
            // sremove user 
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
                <Card >  
                 
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
                
                   
                </Card>  
                <Dialog
                        visible={this.state.visibleDeleteMeals}
                        dialogTitle={<DialogTitle title="Are you sure you want to clear all your meals? You will have to log back in after." />}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Yes"
                                    onPress={()=>this.removeAllMeals() }
                                />
                                <DialogButton
                                    text="No"
                                    onPress={()=> 
                                        this.setStateFalseMeals()
                                    }
                                />
                            </DialogFooter>
                        }
                    ></Dialog>
                    <Dialog
                        visible={this.state.visibleDeleteUser}
                        dialogTitle={<DialogTitle title="Are you sure you want to delete your account?" />}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Yes"
                                    onPress={()=>this.removeUser() }
                                />
                                <DialogButton
                                    text="No"
                                    onPress={()=> 
                                        this.setStateFalseLogout()
                                    }
                                />
                            </DialogFooter>
                        }
                    ></Dialog>
                    <Dialog
                        visible={this.state.visibleLogout}
                        dialogTitle={<DialogTitle title="Are you sure you want to log out?" />}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Yes"
                                    onPress={()=>this.logout() }
                                />
                                <DialogButton
                                    text="No"
                                    onPress={()=> 
                                        this.setStateFalseUser()
                                    }
                                />
                            </DialogFooter>
                        }
                    ></Dialog>
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