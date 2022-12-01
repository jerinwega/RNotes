/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useRef } from "react";
 import { Text, View, useColorMode, Pressable, Box, AlertDialog, Button, Divider } from "native-base";
import { Dimensions } from "react-native";
import { DARK_COLOR, LIGHT_COLOR } from '../../utils/constants';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        onPress={() => navigation.navigate('AddNote', { viewedNote: item , isEdit: true, data: allNotes })} onLongPress={() => handleNoteLongPress(id)}
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
        <AlertDialog leastDestructiveRef={cancelRef} isOpen={isDeleteAlertOpen} size={'sm'}>
        <AlertDialog.Content borderRadius={'2xl'} opacity={0.97}>
          <AlertDialog.Body>
            <Text color={'red.500'} fontWeight={'900'} fontFamily={'Lato-Regular'} fontSize={18} textAlign={'center'}>Delete Note !</Text>
            <Text bold fontFamily={'Lato-Regular'} fontSize={15} textAlign={'center'} mt={3}>Are you sure to delete this note ?</Text>
          </AlertDialog.Body>
            <Button.Group space={0}>
              <Button p={3} borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={onDeleteAlertClose} ref={cancelRef}>
                <Text fontWeight={'800'} color={'blue.500'} fontFamily={'Lato-Regular'} fontSize={15}>NO</Text>
              </Button>
              <Divider orientation="vertical" />
              <Button p={3} borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={handleDeleteAlert}>
                <Text fontWeight={'800'} color={'red.500'} fontFamily={'Lato-Regular'} fontSize={15}>YES</Text>
              </Button>
            </Button.Group>
        </AlertDialog.Content>
      </AlertDialog>
      </>
 }
 export default NoteList;
