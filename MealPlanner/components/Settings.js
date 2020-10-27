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
            visibleTwo: false
        };
    }

    removeAll(){
        this.setState({visible: false})
        // TODO:  remove all meals here
    }
    recoverAll(){
        this.setState({visibleTwo: false})
        //TODOL recover meals here
    }
    setStateFalse(){
        this.setState({visible: false})
    }
    setVisibleTwo(){
        this.setState({visibleTwo: false})
    }

    render(){
        return(
            <View style={{
                alignItems: "center"
            
            }}>
                <Text style={styles.header} h2>  Settings </Text>
                <Card>  
                 
                    <Button style={styles.button}
                        text={'Remove All Meals'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visible: true})
                        }
                    />
                    <View style={styles.space} />
                    <Button style={styles.button}
                        text={'Recover All Meals'}
                        textStyle={{color: 'white'}}
                        buttonStyle={styles.edit}
                        onPress={()=> 
                            this.setState({visibleTwo: true})
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
                    <Dialog
                        visible={this.state.visibleTwo}
                        dialogTitle={<DialogTitle title="Are you sure?" />}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    buttonStyle={styles.edit}
                                    text="Yes"
                                    onPress={()=>this.recoverAll() }
                                />
                                <DialogButton
                                    text="No"
                                    buttonStyle={styles.edit}
                                    onPress={()=> 
                                        this.setVisibleTwo()
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
        padding: 20, 
        borderRadius: 10,
        marginHorizontal: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        position: 'relative'

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