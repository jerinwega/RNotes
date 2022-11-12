import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
// import EditNote from './src/screens/EditNote';
import { Provider } from 'react-redux';
import store from './redux/store';

const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: Home },
    AddNote: { screen: AddNote },
    // EditNote: { screen: EditNote },
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