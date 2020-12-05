import React from 'react';
import { Text, View, TouchableWithoutFeedback, Dimensions, TextInput, StyleSheet} from 'react-native';
import Button from './Button';
import base64 from 'base-64';
import * as controller from '../backend/controller';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  async createAccount(){
      /*
    if( this.state.username && this.state.password){
       this.setState({username: this.state.username});

        this.setState({error: '' });
     
    }else{
      this.setState({error: 'Please fill out all required fields!'})
    }
    */
    var signup_result
    await controller.user_signup(this.state.username, this.state.password).then(function(result){
    	signup_result = result
    })

    if(signup_result.success) {
      this.setState({username: this.state.username}, ()=>{this.props.auth(this.state.username)});
      this.setState({error: ''})
    } else {
			this.setState({username: ''});
      this.setState({password: ''});
      this.setState({error: signup_result.err });
    }
  }
 

  render() {
    if(this.props.show) {
      const screenWidth = Math.round(Dimensions.get('window').width);
      const screenHeight = Math.round(Dimensions.get('window').height);

      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => this.props.hide()}>
            <View style={{width: screenWidth, height: screenHeight, backgroundColor: 'black', opacity: 0.75}}>
            </View>
          </TouchableWithoutFeedback>
          
          <View style={{position: 'absolute', width: this.props.width, height: this.props.height * 0.75, left: (screenWidth - this.props.width)/2, top: (screenHeight - this.props.height + 100)/2, backgroundColor: 'white', borderRadius: 10}}>
            <Text style={{fontSize: 25, marginLeft: 20, marginTop: 15}}>Sign Up</Text>
            <Button buttonStyle={styles.XButton} textStyle={{fontSize: 25}} text={'✕'} onPress={() => this.props.hide()}/>
            <View style={styles.inputFields}> 
              <View style={styles.userField}>
                <TextInput style={styles.textInput, {width: (this.props.width/2)}}
                  placeholder="Enter a Username"  
                  textAlign={'center'}
                  onChangeText={(username) => this.setState({username})}
                  value={this.state.username}/>
                  
              </View>
              <View style={styles.passField}>
                <TextInput secureTextEntry={true}  style={styles.textInput, {width: (this.props.width/2)}}
                  placeholder="Enter a Password" 
                  textAlign={'center'}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}/>
              </View>
            </View>
            <Text style={styles.error}> {this.state.error} </Text>
            <Button textStyle={{color: 'white'}} buttonStyle={styles.createAccountButton} onPress={()=>{this.createAccount()}} text={'Create Account'}/>
            <Button textStyle={{color: 'white'}} buttonStyle={styles.loginButton} onPress={this.props.switch} text={'Already have an account?'}/>
          </View>
          
        </View>
      )
    }
    return (<View></View>)
  }
}




const styles = StyleSheet.create({
  container:{
    position: 'absolute'
  },
  textInput:{
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userField:{
    margin: 10
  },
  passField:{
    margin: 10
  },
  XButton:{
    alignItems: 'center', 
    justifyContent: 'center',
    width: 70,
    height: 70, 
    position: 'absolute', 
    right: 0
  },
  loginButton:{
    backgroundColor: '#553555', 
    padding: 10, 
    borderRadius: 10,
    height: 60,
    width: 175,
    alignSelf: 'center',
    alignItems: 'center',
    margin:10,
    justifyContent: 'center',
    alignContent: 'center'

  },
  createAccountButton:{
    backgroundColor: '#9FC9AE', 
    padding: 10, 
    borderRadius: 10,
    height: 60,
    width: 175,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 10
  },
  error: {
    color: 'red',
    alignSelf: 'center'
  },
  inputFields:{
    marginTop: 70,
    alignItems: 'center'
    }
});
export default Signup;