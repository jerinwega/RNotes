/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useRef, useEffect } from "react";
 import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
 import { useColorMode, HStack, Text, Box, IconButton, Input, View } from "native-base";
 import Spinner from "react-native-spinkit";
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
import { LIGHT_COLOR, DARK_COLOR } from '../utils/constants';
import RNBounceable from "@freakycoder/react-native-bounceable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledStatusBar from "../components/common/StyledStatusBar";
import { scaledFont } from "../components/common/Scale";


 const UserScreen = ({ onClose }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(userRef.current);
  }, []);


  const handleUser = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    userRef.current = setTimeout(async () => {
      await AsyncStorage.setItem('user', user);
      await onClose();
      setIsLoading(false);
    }, 1000);
  }
  
  return (
    <>
    <StyledStatusBar userScreen />
    <Box safeAreaTop  _dark={{ bg: 'black' }} _light={{ bg: 'white' }} />
    <HStack 
      zIndex={2}
      _dark={{ bg: 'black' }} 
      _light={{ bg: 'white' }} 
      px="6" py="4" 
      justifyContent="flex-end" 
      style={{ width: deviceWidth }}>
         <IconButton 
          accessibilityLabel={colorMode === 'light' ? 'Light Mode' : 'Dark Mode'}
          accessibilityHint="Theme Change"
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={26} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={scaledFont(25)} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
    </HStack>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.container, { backgroundColor: colorMode === 'light' ? 'white' : 'black' }]}>
          <Input
            p={0}
            mb={4}
            fontSize={scaledFont(72)}
            autoCorrect={false}
            autoFocus={false}
            value={user} 
            fontFamily={'heading'}
            fontWeight={'900'}
            textAlign={'center'} 
            alignSelf={'center'}
            textAlignVertical={'center'}
            variant={'unstyled'} 
            accessibilityLabel="Name"
            accessibilityHint="Enter Name"
            placeholder="Name"
            onChangeText={(user) => setUser(user)}
            caretHidden={true}
          />
        {(user.trim() && !isLoading) ?
        <RNBounceable
          accessibilityLabel="Submit"
          accessibilityHint="Name Submitted"
            bounceEffectIn={0.7}
            style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
            onPress={handleUser}
        >
          <FontAwesome5Icon solid size={scaledFont(30)} name="arrow-right" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
        </ RNBounceable>
          : 
          <Spinner style={{ position: "absolute" }} size={scaledFont(200)} type="Pulse" color={colorMode === 'light' ? "#c05eff" : "#cb7bff" } isVisible={isLoading} />
        }
      </View>
      </TouchableWithoutFeedback>
    </>
  )
 }
 
 const { width: deviceWidth } = Dimensions.get('window');
 const styles = StyleSheet.create({
    container: {
      width: deviceWidth,
      flex: 1,
      position: 'absolute', 
      top: 0,
      left: 0, 
      right: 0,
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 1
    },
    fab: {
    elevation: 3,
    alignItems:'center',
    justifyContent:'center',
    width:scaledFont(62),
    height: scaledFont(62),
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