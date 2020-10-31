import React from 'react';
import {View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import  {Dialog, DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Button from './Button'



export default class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: false,
        };
    }

    removeAll(){
        this.setState({visible: false})
        // TODO:  remove all meals here
    }
   
    setStateFalse(){
        // hide the modal
        this.setState({visible: false})
    }
    

    render(){
        return(
            <View style={{
                
               
            }}>
                <Text style={styles.header} h2>  Settings </Text>
                <Card >  
                 
                    <Button style={styles.button}
                        text={'Remove All Meals'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visible: true})
                        }
                    />
                    <View style={styles.space} />
                
                   
                </Card>  
                <Dialog
                        visible={this.state.visible}
                        dialogTitle={<DialogTitle title="Are you sure?" />}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="Yes"
                                    onPress={()=>this.removeAll() }
                                />
                                <DialogButton
                                    text="No"
                                    onPress={()=> 
                                        this.setStateFalse()
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
        marginHorizontal: 5

    },
    button:{
        backgroundColor: '#9FC9AE', 
        padding: 10, 
        borderRadius: 10,
        height: 60,
        width: "75%",
        alignSelf: 'center',
        alignItems: 'center',
        margin:1000,
        justifyContent: 'center',
        alignContent: 'center'
    
      },
      space: {
        width: 20, // or whatever size you need
        height: 20,
      },
   
})