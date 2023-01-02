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
 import { get } from 'lodash';
 import IonIcon from 'react-native-vector-icons/Ionicons';
import { LIGHT_COLOR, DARK_COLOR, ANDROID } from '../utils/constants';
import RNBounceable from "@freakycoder/react-native-bounceable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledStatusBar from "../components/common/StyledStatusBar";
import { scaledFont } from "../components/common/Scale";
import { removeEmojis } from '../components/common/utils';


 const UserScreen = ({ onClose }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userRef = useRef(null);
  const [textFontSize , setTextFontSize] = useState(scaledFont(72))

  useEffect(() => {
    return () => clearTimeout(userRef.current);
  }, []);


  const handleUser = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    userRef.current = setTimeout(async () => {
      await AsyncStorage.setItem('user', user.trim());
      await onClose();
      setIsLoading(false);
    }, 1000);
  }

  useEffect(() => {
    if (get(user, 'length')) {
      fontResize();
    }
  }, [user]);

  const fontResize = () => {
      const fontSize = scaledFont(72) - get(user, 'length', 0) * 0.5;
      setTextFontSize(fontSize);
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
          accessibilityLabel={'Switch color mode button'}
          accessibilityHint="Theme Change"
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={scaledFont(26)} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={scaledFont(25)} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
    </HStack>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.container, { backgroundColor: colorMode === 'light' ? 'white' : 'black' }]}>
          <Input
            px={4}
            py={0}
            mb={4}
            spellCheck={false}
            autoFocus={true}
            fontSize={textFontSize}
            multiline={true}
            value={user} 
            fontFamily={'heading'}
            fontWeight={'900'}
            textAlign={'center'} 
            textAlignVertical={'center'}
            variant={'unstyled'} 
            accessibilityLabel="Name Field"
            accessibilityHint="Enter Name"
            enablesReturnKeyAutomatically
            _focus={{ selectionColor: Platform.OS === ANDROID ? colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)' : colorMode === 'light' ? 'black': 'white' }}
            placeholder="Name"
            onChangeText={(user) => setUser(removeEmojis(user))}
          />
        {(user.trim() && !isLoading) ?
        <RNBounceable
            accessibilityLabel="Submit Button"
            accessibilityHint="Submit Name"
            bounceEffectIn={0.7}
            style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
            onPress={handleUser}
        >
          <FontAwesome5Icon  
            accessibilityLabel="Submit button"
            accessibilityHint="Submit Name"
             solid size={scaledFont(30)} name="arrow-right" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
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