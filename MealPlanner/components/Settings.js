import React from 'react';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet} from 'react-native';


export default class Deck extends React.Component{
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
                                    text="Yes"
                                    onPress={()=>this.removeAll() }
                                />
                                <DialogButton
                                    text="No"
                                    onPress={()=> 
                                        this.setState({visible: false})
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