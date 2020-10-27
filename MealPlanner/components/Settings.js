import React from 'react';
import {View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Card, ListItem, Icon, Text, Input } from 'react-native-elements';
import  {Dialog, DialogFooter, DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';
import Button from './Button'



export default class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            visible: false
        };
    }

    removeAll(){
        this.setState({visible: false})
        // TODO:  remove all meals here
    }
    setStateFalse(){
        this.setState({visible: false})
    }

    render(){
        return(
            <View>
                <Card>  
                    <Text>Settings</Text>
                    <Button
                        text={'Remove All Meals'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visible: true})
                        }
                    />
                    <Dialog
                        visible={this.state.visible}
                        dialogTitle={<DialogTitle title="Are you sure?" />}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    buttonStyle={styles.edit}
                                    text="Yes"
                                    onPress={()=>this.removeAll() }
                                />
                                <DialogButton
                                    text="No"
                                    buttonStyle={styles.edit}
                                    onPress={()=> 
                                        this.setStateFalse()
                                    }
                                />
                            </DialogFooter>
                        }
                    
                    ></Dialog>
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