/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Platform } from 'react-native'
import { useColorMode, StatusBar } from "native-base";
import { LIGHT_COLOR, ANDROID, DARK_COLOR } from '../../utils/constants'

const StyledStatusBar = ({
  hashBgColor,
  userScreen
}) => {

const { colorMode } = useColorMode();

let statusBarStyle = "light-content";
let statusBarBackground = LIGHT_COLOR; 

if (colorMode === 'light' && Platform.OS === ANDROID) {
  statusBarStyle = "light-content";
  if (userScreen) {
    statusBarBackground = 'white'; 
  } else if (hashBgColor) {
    statusBarBackground = hashBgColor; 
  } else {
    statusBarBackground = LIGHT_COLOR;
  }
} 
if (colorMode === 'dark' && Platform.OS === ANDROID) {
  statusBarStyle = "light-content";
  if (userScreen) {
    statusBarBackground = 'black'; 
  } else {
  statusBarBackground = DARK_COLOR; 
  }
} 
if (colorMode === 'light') {
  statusBarStyle = "dark-content";
} 
if (colorMode === 'dark') {
  statusBarStyle = "light-content";
} 

 return (
  <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackground}/>
 );
}
export default StyledStatusBar;