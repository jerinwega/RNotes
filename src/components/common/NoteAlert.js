/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button } from "native-base";
 import { scaledFont } from "./Scale";

 const NoteAlert = ({
    cancelRef,
    showNoteAlert,
    onNoteAlertClose
 }) => {

  return (
    <AlertDialog  
      _backdrop={{
        _dark: {
          bg: 'gray.900'
        },
        _light: {
          bg: 'dark.200'
        }
      }} 
      leastDestructiveRef={cancelRef} 
      isOpen={showNoteAlert} 
      size={'xs'}
      shadow={4} 
      style={{ elevation: 5 }}
    >
      <AlertDialog.Content borderRadius={'2xl'}>
        <AlertDialog.Body p={6}>
          <Text color={'blue.500'} fontFamily={'body'} fontWeight={'900'} fontSize={scaledFont(18)} textAlign={'center'}>Add Note</Text>
        </AlertDialog.Body>
            <Button variant="outline" borderBottomWidth={0} borderLeftWidth={0} borderRightWidth={0} onPress={onNoteAlertClose} ref={cancelRef}>
              <Text color={'blue.500'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(14)}>OK</Text>
            </Button>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default NoteAlert;