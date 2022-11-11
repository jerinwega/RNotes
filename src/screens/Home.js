import React from "react";
import { View, StyleSheet, TextInput, Input, Image, TouchableOpacity, Text} from "react-native";
import { Container, Header, Title, Left, Right, Button, Body, Content, Spinner} from "native-base";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from "react-native-vector-icons/FontAwesome";

import { getNotes, getSearch, getSort } from '../publics/redux/actions/notes'
import { getCategory } from '../publics/redux/actions/category'
import { connect } from 'react-redux'
import ListData from '../Components/listData';

console.disableYellowBox = true;

const debounce = require('lodash.debounce');

class HomeScreen extends React.Component {

  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu(){
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      sortBy: 'DESC',
      search: ''
    }
  }

  changeText = (value) => {
    this.setState({search:value})
    this.Search()
  }

  Search = () => {
    this.props.dispatch(getNotes(this.state.search, this.state.sortBy))
  }

  // endEditing() {
  //   const Text = this.state.text;
  //   this.props.dispatch(getSearch(Text))
  // }

  componentDidMount = () => {
    this.getDataCategory()
    this.getDataNotes()
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.open == true && this.state.open == false) {
  //     this.endEditing()
  //   }
  // }
  pickSort(value){
    this.setState({sortBy: value})
    this.props.dispatch(getNotes(this.state.search ,value))
  }

  getDataNotes = () => {
    this.props.dispatch(getNotes())
  }

  getDataCategory = () => {
    this.props.dispatch(getCategory())
  }  

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#FFFFFF'}}>
          <Left style={{flex:1}}>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                style={{height: 40, width: 40, borderRadius: 30 }}
                source={
                  require('../Assets/images/images.jpg')
                }
              />
            </Button>
          </Left>
          <Body>
            <Title style={{alignSelf:'center', color:'#000000'}}>NOTE APP</Title>
          </Body>
          <Right>
            <View style={{right:10}}>
              <Menu
                ref={this.setMenuRef}
                button={<Icon onPress={this.showMenu} name="sort-amount-asc" style={{ fontSize:20, color: "#000000" }}/>}>
                <MenuItem onPress={()=>{this.hideMenu(), this.pickSort('ASC')}}>ASCENDING</MenuItem>
                <MenuItem onPress={()=>{this.hideMenu(), this.pickSort('DESC')}}>DESCENDING</MenuItem>
              </Menu>
            </View>
          </Right>
        </Header>
        <View style={{padding: 10}}>
            <TextInput 
              style={styles.textInput}
              onChangeText={debounce(this.changeText,900)}
              //onEndEditing={() => this.changeText(text)}
              placeholder="Search Here!"
            />
            <Text>{this.state.text}</Text>
        </View>
        <View style={{ flex:1}}>
          { this.props.notes.isLoading == true ? 
            <Spinner color='blue' /> :
            ( 
              <ListData navigation={this.props.navigation}/>
            )
          }
        </View>
        <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.navigate('AddNote')}>
          <Icon name="plus"  size={21} color="#000" />
        </TouchableOpacity>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 23,
    margin: 10,
    marginBottom: 5,
    marginTop: 15,
    padding: 10,
    paddingLeft: 20,
    elevation: 2
  },
  fab: {
    elevation: 3,
    alignItems:'center',
    justifyContent:'center',
    width:60,
    height:60,
    position: 'absolute',                                          
    bottom: 35,                                                    
    right: 15,
    backgroundColor:'#FFF',
    borderRadius:100,
  },
});

const mapStateToProps = ( state ) => {
    return {
        category: state.category,
        notes: state.notes
    }
}
export default connect(mapStateToProps)(HomeScreen);