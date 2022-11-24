import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import User from './screens/User';
import AddNote from './screens/AddNote';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NativeBaseProvider, extendTheme } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';



const AppDrawerNavigator = createDrawerNavigator({
    User: { screen: User },
    Home: { screen: Home },
    AddNote: { screen: AddNote },
    EditNote: { screen: AddNote },
  },
);
const AppContainer = createAppContainer(AppDrawerNavigator);

export default function App() {

  // const [user, setUser] = useState('');

  // const findUser = async () => {
  //   const result = await AsyncStorage.getItem('user')
  //   setUser(JSON.parse(result))
  // }

  // useEffect(() => {
  //   findUser();
  // }, [])

const config = {
    useSystemColorMode: true
}

const mode = {
    strictMode: 'warn',
};

const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@color-mode');
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        return 'light';
      }
    },
    set: async value => {
      try {
        await AsyncStorage.setItem('@color-mode', value);
      } catch (e) {
        console.log(e);
      }
    },
  };

const extendedTheme = extendTheme({ config })

return (
    <Provider store={store}>
            <NativeBaseProvider  config={mode} theme={extendedTheme} colorModeManager={colorModeManager} >
                <AppContainer />
            </NativeBaseProvider>
    </Provider>
);
}
