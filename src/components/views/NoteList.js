/**
 * LoveProject999 : RNotes
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useRef } from "react";
 import { Text, View, useColorMode, Pressable, Box, AlertDialog, Button, Divider } from "native-base";
import { Dimensions } from "react-native";
import { DARK_COLOR, FONT, LIGHT_COLOR } from '../../utils/constants';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeleteAlert from "../common/DeleteAlert";

 const NoteList = ({
  item,
  navigation,
  allNotes
 }) => {
  const { colorMode } = useColorMode();

  const deviceWidth = Dimensions.get('window').width - 40;

  const { id, title, description, priority, time } = item;

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [noteID, setNoteID] = useState('');

  const cancelRef = useRef(null);

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

  const handleNoteLongPress = (id) => {
    setNoteID(id);
    setIsDeleteAlertOpen(true);
  }
  const onDeleteAlertClose = () => {
    setNoteID('');
    setIsDeleteAlertOpen(false);
  }

  const handleDeleteAlert = async () => {
    const newNotes = allNotes.filter(item => item.id !== noteID);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setIsDeleteAlertOpen(false);
    setNoteID('');
    navigation.navigate('Home', { allNotes: newNotes })
  }

 return <>
      <Pressable
        onPress={() => navigation.navigate('ViewNotes', { viewedNote: item , allNotes })} 
        onLongPress={() => handleNoteLongPress(id)}
      >
      {({
        isPressed
      }) => {
        return <Box 
        flex={1}
        w={deviceWidth / 2 - 7}
        mb={4} 
        px={4} 
        py={3}
        rounded="3xl" 
        borderTopWidth={5}
        opacity={isPressed ? 0.7 : 1}
        _dark={{ borderColor: borderColor, borderWidth: 1 }} 
        _light={{ borderColor: borderColor, borderWidth: 2, background: hashBgColor }}
        style={{ transform: [{ scale: isPressed ? 0.9 : 1 }] }}>
            <View style={{ alignItems: 'flex-end' }}>
                <Text pb={1} fontSize={13} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={FONT.family} fontStyle={FONT.italic} fontWeight={FONT.semibold} numberOfLines={1}>
                  {moment(time).format('DD MMM YYYY')}
                </Text>
              </View>
              <Text numberOfLines={1} fontSize={20} color={colorMode === 'light' ? DARK_COLOR : borderColor} fontFamily={FONT.family} fontWeight={FONT.bold} pb={2} >{title}</Text>
              <Text fontSize={19} color={colorMode === 'light' ? DARK_COLOR : borderColor} fontFamily={FONT.family} numberOfLines={4}>{description.trim()}</Text>
              </Box>   
          }}
        </Pressable>
        <DeleteAlert 
        isDeleteAlertOpen={isDeleteAlertOpen} 
        cancelRef={cancelRef}
        handleDeleteAlert={handleDeleteAlert}
        onDeleteAlertClose={onDeleteAlertClose} 
      />
      </>
 }
 export default NoteList;
