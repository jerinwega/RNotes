import React, { Component } from 'react';
import { StatusBar, View, TextInput, Picker } from 'react-native';
import { Container, Header, Title, Left, Right, Button, Body, Content, Text } from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

import { updateNote } from '../publics/redux/actions/notes'
import { connect } from 'react-redux'

class EditNote extends Component {

	constructor() {
		super();
		this.state = {
			id: '',
			title: '',
			note: '',
			category: ''
		}
	}

	updateDataNote(id,title,note,category_id) {
		this.props.dispatch(updateNote(id,title,note,category_id))
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
						<Title style={{alignSelf:'center', color:'#000000'}}>EDIT NOTE</Title>
					</Body>
					<Right>
						<Button
							transparent
							onPress={() => this.updateDataNote(this.props.navigation.state.params.id, this.state.title||this.props.navigation.state.params.title, this.state.note||this.props.navigation.state.params.note, this.state.category||this.props.navigation.state.params.category_id)}>
							<Icon name="checkcircleo" style={{ fontSize:20 }}/>
						</Button>
					</Right>
				</Header>
				<Content>
					<View style={{margin:27, height:50, top:40, borderBottomWidth:1}}>
						<TextInput 
							multiline={true}
							style={{fontSize:20}}
							placeholder='EDIT TITLE ...'
							onChangeText= {text => this.setState({title:text})}
						>
							{this.props.navigation.state.params.title}
						</TextInput>
					</View>
					<View style={{margin:27, height:250}}>
						<TextInput
							multiline={true}
							style={{fontSize:20}}
							placeholder='EDIT DESCRIPTION ...'
							onChangeText= {text => this.setState({note:text})}
						>
							{this.props.navigation.state.params.note}
						</TextInput>
					</View>
					<View style={{margin:30, maxWidth:200, marginTop:30, marginBottom:0}} >
						<Text style={{fontSize:18, fontWeight: 'bold'}}>CATEGORY</Text>
					</View>
					<View style={{margin:30, maxWidth:200, marginTop:5}} >
						<Picker
							style={{elevation:2}}
							selectedValue={this.state.category || this.props.navigation.state.params.category_id}
							onValueChange = {text => this.setState({category:text})}
						>
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
	return {
		category: state.category
	}
}
export default connect(mapStateToProps)(EditNote);