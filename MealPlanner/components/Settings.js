import React from 'react'; 
import {Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet, ScrollView, AsyncStorage} from 'react-native'; 
import Button from './Button' 



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


    
    logout(){
        this.props.navigation.navigate("Log In")
        this.setStateFalseUser()
    }

    setStateFalseMeals(){
        // hide the modal
        this.setState({visibleDeleteMeals: true})
    }
    setStateFalseLogout(){
        // hide the modal
        this.setState({visibleDeleteUser: false})
    }
    setStateFalseUser(){
        // hide the modal
        this.setState({visibleLogout: false})
    }
    setStateMeals(){
        // hide the modal
        this.setState({visibleDeleteMeals: false})
    }
    setStateLogout(){
        // hide the modal
        this.setState({visibleDeleteUser: true})
    }
    setStateUser(){
        // hide the modal
        this.setState({visibleLogout: true})
    }
    

    render(){
        return(
            <View>
                <Text>  Settings </Text>
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