/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from "react";
 import { View, StyleSheet, Dimensions, Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
 import { useColorMode, HStack, Center, StatusBar, Box, IconButton, Input } from "native-base";
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
import { LIGHT_COLOR, DARK_COLOR, FONT, ANDROID } from '../utils/constants';
import RNBounceable from "@freakycoder/react-native-bounceable";
import AsyncStorage from "@react-native-async-storage/async-storage";

 const UserScreen = ({ onClose }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState('');

  const handleUser = async () => {
    Keyboard.dismiss();
    await AsyncStorage.setItem('user', user);
    await onClose();
  }
  const platform = Platform.OS;

  let fontFamily = FONT.family;
  if (platform === ANDROID) {
    fontFamily = FONT.black;
  }
  
  return (
    <>
    {platform !== ANDROID && <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} /> }
    <Box safeAreaTop  _dark={{ bg: 'black' }} _light={{ bg: 'white' }} />
    <HStack 
      _dark={{ bg: 'black' }} 
      _light={{ bg: 'white' }} 
      px="6" py="4" 
      justifyContent="flex-end" 
      style={{ width: deviceWidth }}>
         <IconButton 
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={26} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={25} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
    </HStack>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.container, { backgroundColor: colorMode === 'light' ? 'white' : 'black' }]}>
    <Center h='4/5'>
          <Input
            flex={0.2}
            mx={6}
            mb={4}
            fontSize={'72'}
            autoCorrect={false}
            autoFocus={false}
            value={user} 
            fontFamily={fontFamily}
            fontWeight={FONT.bold}
            textAlign={'center'} 
            variant={'unstyled'} 
            placeholder="Name"
            _focus={{ selectionColor: colorMode === 'light' ? 'black': 'white' }}
            onChangeText={(user) => setUser(user)}
          />
        {user.trim() ?
        <RNBounceable
            bounceEffectIn={0.7}
            style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
            onPress={handleUser}
        >
            <FontAwesome5Icon solid size={30} name="arrow-right" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
        </ RNBounceable>
        : null }
      </Center>
      </View>
      </TouchableWithoutFeedback>
    </>
  )
 }
 
 const { width: deviceWidth } = Dimensions.get('window');
 const styles = StyleSheet.create({
    container: {
      width: deviceWidth,
      flex: 1
    },
    fab: {
    elevation: 3,
    alignItems:'center',
    justifyContent:'center',
    width:56,
    height:56,
    borderRadius:100,
    elevation: 5,
    shadowColor: DARK_COLOR,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
 });
 

 export default UserScreen;