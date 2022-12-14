/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from "react";
 import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
 import { useColorMode, HStack, Center, Box, IconButton, Input, View } from "native-base";
 import Spinner from "react-native-spinkit";
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
import { LIGHT_COLOR, DARK_COLOR } from '../utils/constants';
import RNBounceable from "@freakycoder/react-native-bounceable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledStatusBar from "../components/common/StyledStatusBar";

 const UserScreen = ({ onClose }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleUser = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    await AsyncStorage.setItem('user', user);
    await onClose();
    setIsLoading(false);
  }
  
  return (
    <>
    <StyledStatusBar userScreen />
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
            mb={isLoading ? 12 : 4}
            fontSize={'72'}
            autoCorrect={false}
            autoFocus={false}
            value={user} 
            fontFamily={'heading'}
            fontWeight={'900'}
            textAlign={'center'} 
            variant={'unstyled'} 
            placeholder="Name"
            _focus={{ selectionColor: colorMode === 'light' ? 'black': 'white' }}
            onChangeText={(user) => setUser(user)}
          />
        {(user.trim() && !isLoading) ?
        <RNBounceable
            bounceEffectIn={0.7}
            style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
            onPress={handleUser}
        >
          <FontAwesome5Icon solid size={30} name="arrow-right" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
        </ RNBounceable>
        : <Spinner size={40} type="WanderingCubes" color={colorMode === 'light' ? "#19191a" : "#fdfdfd" } isVisible={isLoading}/>
      }
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
    },
  },
 });
 

 export default UserScreen;