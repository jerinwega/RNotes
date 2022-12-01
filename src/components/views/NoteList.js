/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, View, useColorMode, Pressable, Box } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import { DARK_COLOR, LIGHT_COLOR } from '../../utils/constants';
import moment from 'moment';

 const NoteList = ({
  item,
  navigation,
  allNotes
 }) => {
  const { colorMode } = useColorMode();

  const deviceWidth = Dimensions.get('window').width - 40;

  const { title, description, priority, time } = item;

  let hashBgColor = '#dcfce7';
  let borderColor = 'green.200';
  if (priority === 'high') {
    hashBgColor = '#fee2e2'
    borderColor = 'red.200';
  }
  if (priority === 'medium') {
    hashBgColor = '#fef9c3';
    borderColor = 'yellow.200';
  }

  const handleBackground = (isPressed) => {
    let bg = '';
    if (colorMode === 'light') {
      bg = hashBgColor;
      if (isPressed) {
        bg = LIGHT_COLOR;
      }
    } 
    if (colorMode === 'dark') {
      bg = 'black';
      if (isPressed) {
        bg = DARK_COLOR;
      }
    }
    return bg;
  }

 return <Pressable 
        onPress={() => navigation.navigate('AddNote', { viewedNote: item , isEdit: true, data: allNotes })} onLongPress={() => { console.log("long")}}
      >
      {({
        isPressed
      }) => {
        return <Box 
        flex={1}
        w={deviceWidth / 2 - 7}
        mb={3} 
        px={4} 
        py={3}
        rounded="3xl" 
        borderWidth={1} 
        _dark={{ borderColor: borderColor, borderTopWidth: 4 }} 
        _light={{ borderColor: borderColor }}
        style={{ transform: [{ scale: isPressed ? 0.9 : 1 }], backgroundColor: handleBackground(isPressed) }}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text fontSize={12} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'Lato-Regular'} fontStyle='italic' numberOfLines={1}>
                  {moment(time).format('DD MMM YYYY')}
                </Text>
              </View>
              <Text fontSize={18} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'Lato-Regular'} fontWeight={'900'} pb={2} >{title}</Text>
              <Text fontSize={16} bold color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'Lato-Regular'} numberOfLines={5}>{description}</Text>
              </Box>   
          }}
        </Pressable>
 }
 export default NoteList;
