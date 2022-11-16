import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Home from './screens/Home';
import AddNote from './screens/AddNote';
// import EditNote from './src/screens/EditNote';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NativeBaseProvider, extendTheme } from "native-base";


const AppDrawerNavigator = createDrawerNavigator({
    Home: { screen: Home },
    AddNote: { screen: AddNote },
    // EditNote: { screen: EditNote },
  },
);
const AppContainer = createAppContainer(AppDrawerNavigator);

export default function App() {
// let theme = useColorScheme();
const config = {
    useSystemColorMode: true
}
const extendedTheme = extendTheme({ config, 
    // components: {
        // Button: {
        //   // Can simply pass default props to change default behaviour of components.
        //   baseStyle: {
        //     rounded: 'md',
        //   },
        //   defaultProps: {
        //     colorScheme: 'red',
        //   },
        // },
        // Fab: {
        //   // Can pass also function, giving you access theming tools
        //   baseStyle: ({ colorMode }) => {
        //     return {
        //       bg: colorMode === 'dark' ? 'red.300' : 'blue.300',
        //     };
        //   },
        //   defaultProps: ({ colorMode }) => {
        //     return {
        //         colorScheme: colorMode === 'dark' ? 'red.300' : 'blue.300',
        //       };
        //     },
        // },
    //   }
})

// console.log("theme", theme)

return (
    <Provider store={store}>
        {/* <AppearanceProvider> */}
            <NativeBaseProvider theme={extendedTheme} >
                <AppContainer />
            </NativeBaseProvider>
        {/* </AppearanceProvider> */}
    </Provider>
);
}
