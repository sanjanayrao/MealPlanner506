  
import React, {Component} from "react";
import {LayoutAnimation, UIManager, Animated, PanResponder, Dimensions, StyleSheet, AsyncStorage} from 'react-native';
import {Body, Container, View, Text, Card, CardItem} from "native-base";
import Button from './Button';
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";


export class SwipeableCard extends Component {
  translateX = new Animated.Value(0);
  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dx: this.translateX}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      const screenWidth = Dimensions.get("window").width;
      if (Math.abs(vx) >= 0.5 || Math.abs(dx) >= 0.5 * screenWidth) {
        Animated.timing(this.translateX, {
          toValue: dx > 0 ? screenWidth : -screenWidth,
          duration: 200
        }).start(this.props.onDismiss);
      } else {
        Animated.spring(this.translateX, {
          toValue: 0,
          bounciness: 10
        }).start();
      }
    }
  });


  render() {
    return (
      <View>
        <Animated.View
          style={{transform: [{translateX: this.translateX}]}} {...this._panResponder.panHandlers}>
          <TouchableOpacity onLongPress={()=>{this.props.edit()}}>
          <Card style={styles.card}>
            <CardItem>
              <Body>
              <Text style={styles.heading}>
                {this.props.header}
              </Text>
              <Text style={styles.paragraph}>
                {this.props.body}
              </Text>
              </Body>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </Animated.View>
      </View>

    );
  }
}


export default class List extends Component {
  state = {
    closedIndices: [],
    items: [],
    user: ''
  };

  constructor() {
    super();
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    this.shouldRender = this.shouldRender.bind(this);
  }

  async deleteItem(id){
  
        
  }

  async fetchList(){
    this.setState({closedIndices: []});
    
    items = [
        {
            'name': 'garlic',
            'amount' : 4
        },
        {
            'name': 'onion',
            'amount' : 4
        },{
            'name': 'lettuc',
            'amount' : 4
        },

    ]
    this.setState({items: items});
  
   
  }



  componentDidMount(){
    this.fetchList
  }
  
  componentWillUnmount(){
  }
 
  toolTip(){
    if(this.state.list){
      return <View style={styles.hint}>
      <Text   style={{color: '#9aa195', fontSize: 12}}> Swipe to remove </Text>
    </View>;
    }
  }
  shouldRender(index) {
    return this.state.closedIndices.indexOf(index) === -1 && !this.state.showEdit && !this.state.showAdd;
  }


  showCardView(){
    if(!this.state.showEdit && !this.state.showAdd){

      return <ScrollView>
      {this.state.items.map((item, i) => this.shouldRender(i) &&
        <TouchableOpacity key={i} ><View key={i}><SwipeableCard id={i}
        header={item["name"]} 
        body={item["amount"]}
              onDismiss={() => {

          if ([...new Array(this.state.items.length)].slice(i + 1, this.state.items.length).some(this.shouldRender)) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring); 
          }          
          this.setState({
            closedIndices: [...this.state.closedIndices, i]
          })
        }}
        />
          </View></TouchableOpacity>)}</ScrollView>;
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <Text style={styles.head}>Today's Grocery List</Text>
            {this.showCardView()}      
            {this.toolTip() }
      </Container>
    );
  }
}

var styles = StyleSheet.create({
  head:{
    marginTop: 60,
    fontSize: 40,
    alignSelf: 'center'
  },
  container: {
    height: '100%',
    backgroundColor: '#ecf0f1',
    padding: 8
    },
  paragraph: {
    fontSize: 12,
    paddingBottom: 5,
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    padding: 0,
  },
  add:{
    backgroundColor: '#9FC9AE', 
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
  hint:{
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end'    
  }
});