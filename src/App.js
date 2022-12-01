import React, { useState, useEffect } from 'react';
import Home from './screens/Home';
import User from './screens/User';
import AddNote from './screens/AddNote';
import { NativeBaseProvider, extendTheme } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState('');
  
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user')
    if (result !== null) setUser(result);
  }

  useEffect(() => {
    findUser();
  }, [])

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
  <NavigationContainer>
    <NativeBaseProvider  config={mode} theme={extendedTheme} colorModeManager={colorModeManager} >
       <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user && 
        <Stack.Screen name="User">
          {(props) => <User {...props} onClose={findUser} />}
        </Stack.Screen>
        }
        <Stack.Screen name="Home">
          {(props) => <Home {...props} user={user} onClose={findUser} />}
        </Stack.Screen>
        <Stack.Screen name="AddNote" component={AddNote} />
        {/* <Stack.Screen name="EditNote" component={AddNote} />   */}
      </Stack.Navigator>
    </NativeBaseProvider>
    </NavigationContainer>
);
}
