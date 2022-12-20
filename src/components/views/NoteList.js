/**
 * LoveProject999 : RNotes
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useRef } from "react";
 import { Text, View, useColorMode, Pressable, Box } from "native-base";
import { Dimensions, Keyboard, Platform, TouchableOpacity } from "react-native";
import { DARK_COLOR, LIGHT_COLOR } from '../../utils/constants';
import moment from 'moment';
import { get } from 'lodash';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scaledFont } from "../common/Scale";

 const NoteList = ({
  item,
  navigation,
  onLongPress,
  onPress,
  selected
 }) => {
  const { colorMode } = useColorMode();

  const deviceWidth = Dimensions.get('window').width - 40;

  const { title, description, priority, time } = item;


  let hashBgColor = '#dcfce7';
  let borderColor = 'green.200';
  let borderDarkColor = 'green.600';

  if (priority === 'high') {
    hashBgColor = '#fee2e2';
    borderColor = 'red.200';
    borderDarkColor = 'red.600';
  }
  if (priority === 'medium') {
    hashBgColor = '#fef9c3';
    borderColor = 'yellow.200';
    borderDarkColor = 'yellow.600';
  }

  const trimmedDesc = description.replace(/\n\s*\n/g, '\n').trim();

 return <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
      >
      <Box 
        flex={1}
        w={deviceWidth / 2 - 3}
        mb={3} 
        px={4} 
        py={3}
        rounded="3xl" 
        justifyContent={!trimmedDesc ? "center" : 'flex-start'}
        borderTopWidth={5}
        _dark={{ borderColor: borderDarkColor, borderWidth: 1, bg: selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}} 
        _light={{ borderColor: borderColor, borderWidth: 2, background: selected ? 'rgba(0, 0, 0, 0.1)' : hashBgColor }}
      >
            <View px={4} py={3} style={{ position: 'absolute', top: 0, right: 0 }}>
                <Text fontSize={scaledFont(13)} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'mono'} fontStyle={'italic'} fontWeight={'600'} numberOfLines={1}>
                  {moment(time).format('DD MMM YYYY')}
                </Text>
              </View>
              <View mt={6}>
              <Text style={{ textAlign: !trimmedDesc ? 'center' : 'left' }} numberOfLines={1} fontSize={!trimmedDesc ? scaledFont(22) : scaledFont(20)} color={colorMode === 'light' ? DARK_COLOR : borderDarkColor} fontFamily={'heading'} fontWeight={'900'} pb={!trimmedDesc ? 0 : 1 } >{title.trim()}</Text>
              <Text fontSize={scaledFont(18)} color={colorMode === 'light' ? DARK_COLOR : borderDarkColor} fontFamily={'body'} fontWeight={'400'} numberOfLines={4}>{trimmedDesc}</Text>
              </View>
              </Box>   
        </TouchableOpacity>
 }
 export default NoteList;
