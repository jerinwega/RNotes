/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button, Divider, useColorMode } from "native-base";
import { DARK_COLOR, LIGHT_COLOR } from "../../utils/constants";

 const NoteAlert = ({
    cancelRef,
    showNoteAlert,
    onNoteAlertClose
 }) => {

const { colorMode } = useColorMode();

  return (
    <AlertDialog  
      _backdrop={{
        _dark: {
          bg: 'dark.100'
        },
        _light: {
          bg: 'gray.900'
        }
      }} 
      leastDestructiveRef={cancelRef} 
      isOpen={showNoteAlert} 
      size={'sm'}
      shadow={4} 
    >
      <AlertDialog.Content borderRadius={'2xl'}>
        <AlertDialog.Body p={6}>
          <Text color={'blue.500'} fontWeight={'900'} fontFamily={'Lato-Regular'} fontSize={18} textAlign={'center'}>Add Note</Text>
        </AlertDialog.Body>
            <Button variant="outline" onPress={onNoteAlertClose} ref={cancelRef}>
              <Text fontWeight={'800'} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'Lato-Regular'} fontSize={14}>OK</Text>
            </Button>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default NoteAlert;