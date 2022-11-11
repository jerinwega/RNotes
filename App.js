
import React, { Component } from 'react';
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Home from './src/screens/Home';
import AddNote from './src/screens/AddNote';
import EditNote from './src/screens/EditNote';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: Home },
    AddNote: { screen: AddNote },
    EditNote: { screen: EditNote },
  },
);

const AppContainer = createAppContainer(AppDrawerNavigator);
export default class App extends Component{
	render(){
		return(
			<Provider store={store}>
				<AppContainer/>
			</Provider>
		)
	}
}