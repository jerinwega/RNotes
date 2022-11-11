import React, { Component } from 'react';
import { StatusBar, View, TextInput, Picker } from 'react-native';
import { Container, Header, Title, Left, Right, Button, Body, Content, Text } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

import { addNote } from '../publics/redux/actions/notes'
import { connect } from 'react-redux'

class AddNote extends Component {  

    constructor() {
      super();
      this.state = {
        category: '',
        title: '',
        note: ''
      }
    }

    updateCategory = (id) => {
      this.setState({ category: id })
    }

    addDataNote(title,note,category_id) {
      this.props.dispatch(addNote(title,note,category_id))
      this.props.navigation.goBack()
    }

    render() {
        return (
          <Container>
            <Header style={{ backgroundColor: '#FFFFFF'}}>
              <Left style={{flex:1}}>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name="arrowleft" style={{ fontSize:20, color: "#000000" }}/>
                </Button>
              </Left>
              <Body>
                <Title style={{alignSelf:'center', color:'#000000'}}>ADD NOTE</Title>
              </Body>
              <Right>
                <Button
                  transparent
                  onPress={() => this.addDataNote(this.state.title, this.state.note, this.state.category)}>
                  <Icon name="checkcircleo" style={{ fontSize:20 }}/>
                </Button>
              </Right>
            </Header>
            <Content>
              <View style={{margin:27, height:50, top:40, borderBottomWidth:1}}>
                <TextInput 
                  placeholder="ADD TITLE ..."
                  multiline={true} style={{fontSize:20}}
                  onChangeText={text => this.setState({title:text})}>
                </TextInput>
              </View>
              <View style={{margin:27, height:250}}>
                <TextInput
                  placeholder="ADD DESCRIPTION ..."
                  multiline={true} style={{fontSize:20}}
                  onChangeText={text => this.setState({note:text})}>
                </TextInput>
              </View>
              <View style={{margin:30, maxWidth:'45%', marginTop:30, marginBottom:0}} >
                <Text style={{fontSize:18, fontWeight: 'bold'}}>CATEGORY</Text>
              </View>
              <View style={{margin:30, maxWidth:'45%', marginTop:5}} >
                <Picker
                  style={{elevation:2}}
                  selectedValue={this.state.category}
                  onValueChange = {this.updateCategory}
                >
                  <Picker.Item label="SELECT CATEGORY" value="" />
                  { this.props.category.data.map(data=>(
                    <Picker.Item label={data.category} value={data.id} key={data.id} />)
                  )}
                </Picker>
              </View>
            </Content>
          </Container>
        ); 
    }
}
const mapStateToProps = ( state ) => {
  return (
    category: state.category
  )
}
export default connect(mapStateToProps)(AddNote);