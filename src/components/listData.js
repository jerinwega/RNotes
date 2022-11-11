import React,{Component} from 'react';
import {StyleSheet, FlatList, View, Text, TouchableOpacity, Alert, RefreshControl, ActivityIndicator} from 'react-native';

import { deleteNote, getNotes, getLoadData } from '../publics/redux/actions/notes'
import { connect } from 'react-redux'

const moment = require('moment');

class ListData extends Component{

  state = { 
    page: 1
  }

  confirmDeleteNote(id){
    //handler for Long Click
    Alert.alert(
      'Warning !',
      'Are you sure delete this data ?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.deleteDataNote(id)},
      ],
      {cancelable: false},
    );
  }

  loadMoreData = () => {
    this.setState({sort: this.props.notes.sortBy})
    if(this.state.page < this.props.notes.totalpage) {
      this.setState({page : this.state.page + 1},
        ()=>this.props.dispatch(getLoadData(this.state.page, this.state.sort))
      )
    }
  }

  getDataNotes(){
    this.props.dispatch(getNotes())
    this.setState({page: this.props.notes.page})

  }

  deleteDataNote(id) {
    this.props.dispatch(deleteNote(id))
    this.setState({page: this.props.notes.page})

  }

  render(){
    return(
      <View style={{flex: 1, marginLeft:15, marginRight:15}}>
        <FlatList 
          data={this.props.notes.data}
          onEndReachedThreshold={0.1}
          onEndReached={this.loadMoreData}
          refreshControl={
            <RefreshControl
              refreshing={this.props.notes.isLoading}
              onRefresh={() => this.getDataNotes()}
            />
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={[styles.card,
                {backgroundColor:
                  (item.category == 'Holiday')? '#2FC2DF' :
                  (item.category == 'Work')? '#C0EB6A' :
                  (item.category == 'Wishlist')? '#FAD06C' :
                  (item.category == 'Learn' )? 'blue' :
                  (item.category == 'Personal')? '#FF92A9' :
                  (item.category == 'Test')? '#FF92A9' : '#777'
                }
              ]}
              onLongPress={() => this.confirmDeleteNote(item.id)}
              onPress={() => this.props.navigation.navigate('EditNote', item)}>
              <View style={{flex:1, height:'100%', marginLeft:10}}>
                <View style={styles.timeView}>
                  <Text style={styles.text} numberOfLines={1}>{moment(item.updateAt).format('DD MMM')}</Text>
                </View>
                <View style={styles.titleView}>
                  <Text style={[styles.text, {fontSize:20}]} numberOfLines={1}>{item.title}</Text>
                </View>
                <View style={styles.categoryView}>
                  <Text style={styles.text} numberOfLines={1}>{item.category == null ? '-' :item.category} </Text>
                </View>
                <View style={styles.noteView}>
                  <Text style={styles.text} numberOfLines={4}>{item.note}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item,index)=>item.id+' '}
        />
        {this.props.notes.Loading == true ? (<ActivityIndicator size="large" color="#00ff00" /> ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight : 10,
    marginBottom: 30,
    padding:11,
    borderRadius: 5,
    minHeight: 170, 
    maxHeight: 170,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  timeView: {
    alignItems: 'flex-end',
    width:'100%'
  },
  titleView: {
    width:'100%'
  },
  categoryView: {
    width:'100%'
  },
  noteView: {
    marginTop:5,
    marginBottom:10,
    width:'100%'
  },
});

const mapStateToProps = ( state ) => {
    return (
        notes: state.notes
    )
}
export default connect(mapStateToProps)(ListData);