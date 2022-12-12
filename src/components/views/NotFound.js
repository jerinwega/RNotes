/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, View, Center, useColorMode } from "native-base";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { DARK_COLOR, LIGHT_COLOR, FONT, ANDROID } from "../../utils/constants";
import { Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

 const NotFound = () => {
    const { colorMode } = useColorMode();
    const platform = Platform.OS;

    let fontFamily = FONT.family;
    if (platform === ANDROID) {
      fontFamily = FONT.black;
    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} flex={1} opacity={0.8}>
        <Center h='4/5'>
        <FontAwesome5Icon name="frown" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={128} solid />
        <Text mt={3} fontFamily={fontFamily} fontWeight={FONT.bold} fontSize={28}>Note Not Found !</Text>
        </Center>
    </TouchableWithoutFeedback>
  );
 }
 export default NotFound;