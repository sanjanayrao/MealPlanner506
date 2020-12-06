import React from 'react';
import { View, TouchableWithoutFeedback, Linking, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet, ScrollView, FlatList, SafeAreaView, AsyncStorage} from 'react-native';
import { Card, ListItem, Icon, Text } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import Button from './Button';
import * as controller from '../backend/controller';
import * as helper from '../backend/helper';

export default class Meals extends React.Component{
    constructor(props){
        super();
        this.state = {
            meals: [],
            user: '',
            err: ''
        }
        this.get_meals = this.get_meals.bind(this)
    }

    async get_meals(user){
        // use controller thing
        var response = {};
        if(!user){
            user = this.state.user
        }
        await controller.get_meals(user)
        .then(function(result) {
            response = result;
        });
        
        // overwrite test meals?
        if(response.success){
            this.setState({meals: response.meals});
            this.setState({err: response.err})
        } else {
            this.setState({meals: []})
            this.setState({err: response.err})
        }
    }
    
    
    componentDidMount(){
         this._retrieveData()
         this.focusListener = this.props.navigation.addListener('focus', () => {
            // do something
            this.get_meals(this.state.user)
         })
    }
   
    componentWillUnmount(){
        this.focusListener()
    }
  
    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            // We have data!!
            this.setState({user: value})
            this.get_meals(value)

          }
        } catch (error) {
          // Error retrieving data
        }
      };

    addMeal(){
        this.props.navigation.navigate('Add Meal', {update : this.get_meals})

    }

    render_user_meals(){
        let imgs = [
          require('../images/PNG/3x/Asset1.png'),
          require('../images/PNG/3x/Asset2.png'),
          require('../images/PNG/3x/Asset3.png'),
          require('../images/PNG/3x/Asset5.png'),
          require('../images/PNG/3x/Asset6.png'),
          require('../images/PNG/3x/Asset7.png'),
          require('../images/PNG/3x/Asset8.png'),
          require('../images/PNG/3x/Asset9.png'),
          require('../images/PNG/3x/Asset10.png'),
          require('../images/PNG/3x/Asset11.png'),
          require('../images/PNG/3x/Asset12.png'),
          require('../images/PNG/3x/Asset13.png'),
          require('../images/PNG/3x/Asset14.png'),
          require('../images/PNG/3x/Asset15.png'),
          require('../images/PNG/3x/Asset16.png'),
          require('../images/PNG/3x/Asset17.png')]

        let cards = [];
        let card_data = this.state.meals;

        for(let i = 0; i < card_data.length; i += 2){
                let img1 = i % 16;
                let img2 = i+1 % 16;
                cards.push(
                <View key={i} style={{flex: 1, flexDirection: 'row', paddingLeft:10, paddingRight:10}}>
                <View style={{display: 'inline-block', position:'relative', width:'50%'}}>
                  <View style={{marginTop:'100%'}}></View>
                  <View style={{ position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                  <Card key={i}
                  containerStyle={{width: '100%', height:'100%', margin:0}}>
                    <Card.Title>
                          {this.state.meals[i].name}
                      </Card.Title>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Meal View', {'meal' : this.state.meals[i]} )}
                      style={styles.touchable}>
                        <View style={styles.view}>
                          <Text style={styles.text}>{this.props.title}</Text>
                        </View>
                        <Image
                          source={imgs[img1]}
                          style={styles.image} />
                        </TouchableOpacity> 
                  </Card>
                  </View>
                </View>
                {i + 1 != card_data.length &&

              <View style={{display: 'inline-block', position:'relative', width:'50%'}}>
                <View style={{marginTop:'100%'}}></View>
                <View style={{ position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                  <Card key={i+1}
                  containerStyle={{width: '100%', height:'100%', margin:0}}>
                      <Card.Title>
                          {this.state.meals[i+1].name}
                      </Card.Title>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('Meal View', {'meal' : this.state.meals[i+1]} )}
                      style={styles.touchable}>
                        <View style={styles.view}>
                          <Text style={styles.text}>{this.props.title}</Text>
                        </View>
                        <Image
                          source={imgs[img2]}
                          style={styles.image} />
                      </TouchableOpacity>          
                  </Card>
                  </View>
                  </View>
                }
                {i + 1 == card_data.length &&
                  <View style={{display: 'inline-block', position:'relative', width:'50%'}}>
                  <View style={{marginTop:'100%'}}></View>
                  <View style={{ position:'absolute', top: 0, bottom: 0, left: 0, right: 0}}>
                    <Card key={'empty'}
                    containerStyle={{width: '100%', height:'100%', margin:0, display:'none'}}>
                    </Card>
                    </View></View>
                }
                </View>
                )
        }
        return cards;
    }
    render(){
        return(
            <View>
                <View style={{flex:0, flexDirection:"row", justifyContent:'space-between'}}>
                     <Text style={styles.header} h2>My Meals</Text>
                     <Button text={'+'} textStyle={{color:'white', fontSize: 36}} buttonStyle={styles.add} onPress={()=>this.addMeal()}/>
                </View>   

                {this.state.err ? <Text style={{marginTop: '40%', alignSelf: 'center', color:'grey'}}>{this.state.err}</Text> : <Text></Text>}
                    <SafeAreaView
                        style={{marginBottom: 200, marginLeft: 'auto', marginRight: 'auto'}}
                    >
                    <View>
                    <ScrollView>
                        <View>
                            {this.render_user_meals()}
                        </View>
                    </ScrollView>
                    <Text onPress={() => Linking.openURL('https://www.freepik.com/vectors/pattern')} style={{fontWeight: 'bold'}}>
                      &emsp;Patter vector created by&nbsp;
                      <Text style={{color: '#0645AD'}}>
                        freepik
                      </Text>
                    </Text>
                    </View>
                    </SafeAreaView>
                </View>
        )
    }

}
const styles = StyleSheet.create({
    mealButton:{
      backgroundColor: '#9FC9AE', 
      padding: 10, 
      borderRadius: 10,
      height: 60,
      width: "75%",
      alignSelf: 'center',
      alignItems: 'center',
      margin:10,
      justifyContent: 'center',
      alignContent: 'center'
  
    },
    add:{
        backgroundColor: '#553555', 
        paddingTop: 7,
        borderRadius: 100,
        width: 60,
        height: 60,
        alignSelf: 'flex-end',
        alignItems: 'center',
        margin:10,
    
      },
      
    container:
    {
        alignSelf: 'center',
        alignItems: 'center',
        margin:10,
        justifyContent: 'center',
        alignContent: 'center'
    },
    header:{
        margin: 15
      },

      view: {
        position: 'absolute',
        backgroundColor: 'transparent'
      },
      image: {
        width: '80%',
        height: '80%',
        resizeMode : 'contain'
      },
      touchable: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {
        fontSize: 18,
        textAlign: 'center'
      }
    
  });