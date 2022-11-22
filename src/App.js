import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NativeBaseProvider, extendTheme } from "native-base";


const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: Home },
    AddNote: { screen: AddNote },
    EditNote: { screen: AddNote },
  },
);
const AppContainer = createAppContainer(AppDrawerNavigator);

export default function App() {

const systemTheme = {
    useSystemColorMode: true
}
const config = {
    strictMode: 'warn',
  };
const extendedTheme = extendTheme({ systemTheme })

return (
    <Provider store={store}>
        {/* <AppearanceProvider> */}
            <NativeBaseProvider config={config} theme={extendedTheme} >
                <AppContainer />
            </NativeBaseProvider>
        {/* </AppearanceProvider> */}
    </Provider>
);
}
