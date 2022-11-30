/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, View, useColorMode } from "native-base";
import { Dimensions } from "react-native";
import { DARK_COLOR, LIGHT_COLOR } from '../../utils/constants';

 const NoteList = ({
  item
 }) => {
  const { colorMode } = useColorMode();

  const deviceWidth = Dimensions.get('window').width - 40;

  const { title, description, priority } = item;

  let bgColor = 'green.100';
  let borderColor = 'green.200'
  if (priority === 'high') {
    bgColor = 'red.100';
    borderColor = 'red.200';
  }
  if (priority === 'medium') {
    bgColor = 'yellow.100';
    borderColor = 'yellow.200';
  }


 
  return (
        <View 
          background={colorMode === 'light' ? bgColor : 'black'}
          w={deviceWidth / 2 - 7}
          mb={3} 
          px={4} 
          py={3}
          rounded="3xl" 
          borderWidth={1} 
          shadow={2}
          _dark={{ borderColor: borderColor, borderTopWidth: 4, borderTopColor: borderColor }} 
          _light={{ borderColor: borderColor }}
        >
              <Text fontSize={18} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'Lato-Regular'} fontWeight={'800'} pb={3} >{title}</Text>
              <Text fontSize={16} bold color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'Lato-Regular'} numberOfLines={5}>{description}</Text>
        </View>
  );
 }
 export default NoteList;
