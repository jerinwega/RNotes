import React, { useState, useEffect } from 'react';
import Home from './screens/Home';
import User from './screens/User';
import AddNote from './screens/AddNote';
import ViewNotes from './screens/ViewNotes';
import { NativeBaseProvider, extendTheme } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState('');
  const [isFirstLoad, setIsFirstLoad] = useState(false);
  
  const findUser = async () => {
    try {
      const result = await AsyncStorage.getItem('user')
      if (result === null) {
        setIsFirstLoad(true);
        SplashScreen.hide();
      } else {
        setUser(result);
        setIsFirstLoad(false);
        SplashScreen.hide();
      }
    } catch(e) {
      setIsFirstLoad(true);
      SplashScreen.hide();
    }
  }

  useEffect(() => {
    // AsyncStorage.clear();
    findUser();
  }, [])


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


const theme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  fontConfig: {
    Lato: {
    
      400: {
        normal: "Lato-Regular",
      },
    
      600: {
        normal: "Lato-Bold",
        italic: "Lato-BoldItalic",
      },
      900: {
        normal: 'Lato-Black',
      },
    },
  },

  fonts: {
    heading: "Lato",
    body: "Lato",
    mono: "Lato",
  },
});


if (isFirstLoad) {
 return  (
 <NativeBaseProvider config={mode} theme={theme}>
    <User onClose={findUser} />
  </NativeBaseProvider>
 );
}

return (
  <NavigationContainer>
    <NativeBaseProvider config={mode} theme={theme} colorModeManager={colorModeManager}>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Home">
        {(props) => <Home {...props} user={user} onClose={findUser} />}
        </Stack.Screen>
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="ViewNotes" component={ViewNotes} />  
      </Stack.Navigator>
    </NativeBaseProvider>
    </NavigationContainer>
);
}
