import React, {Component} from 'react';
import {Modal, Text, View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';

import { addCategory } from '../publics/redux/actions/category'
import { connect } from 'react-redux'

class ModalExample extends Component {
  
  state = {
    modalVisible: false,
    name: '',
    url: '',
  };

  addDataCategory(name,url){
    this.props.dispatch(addCategory(name,url))
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}>
          <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.20)', alignItems:'center', justifyContent:'center' }}>
            <View style={{backgroundColor:'#FFF', borderRadius:5, width:'70%', height:200, padding:10, elevation:3 }}>
              <View>
                <TextInput style={styles.textInput} onChangeText={text => this.setState({name:text})} placeholder='Category Name'/>
                <TextInput style={styles.textInput} onChangeText={text => this.setState({url:text})} placeholder='Image Url'/>
              </View>
              <View >
                <TouchableOpacity
                  style={{alignSelf:'flex-end', top:40, right: 80}} 
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible),
                    this.addDataCategory(this.state.name, this.state.url)
                  }}>
                  <Text style={{fontSize:18, fontWeight:'bold', color:'#000'}}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{alignSelf:'flex-end', top:16, right: 10}}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                  <Text style={{fontSize:18, fontWeight:'bold', color:'#000'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={{top:-37, width:225, height:60, onPressColor:'blue'}}
          onPress={() => {
            this.setModalVisible(true)
          }}>
          <Text style={{marginTop:15, color:'#000', fontSize:18}}>Add Category</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    top: 14,
    borderBottomWidth:1,
    borderColor:'#2ED1A2',
    marginLeft:25,
    marginRight:25,
    marginTop:5,
    fontSize:17
  }
})

export default connect()(ModalExample);