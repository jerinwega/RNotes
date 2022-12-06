/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button } from "native-base";
import { FONT } from "../../utils/constants";

 const NoteAlert = ({
    cancelRef,
    showNoteAlert,
    onNoteAlertClose
 }) => {


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
          <Text color={'blue.500'} fontFamily={FONT.family} fontWeight={FONT.bold} fontSize={19} textAlign={'center'}>Add Note</Text>
        </AlertDialog.Body>
            <Button variant="outline" borderBottomWidth={0} borderLeftWidth={0} borderRightWidth={0} onPress={onNoteAlertClose} ref={cancelRef}>
              <Text color={'blue.500'} fontFamily={FONT.family} fontWeight={FONT.bold} fontSize={15}>OK</Text>
            </Button>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default NoteAlert;