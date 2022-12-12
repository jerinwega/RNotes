/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button } from "native-base";
import { FONT, ANDROID } from "../../utils/constants";
import { Platform } from "react-native";

 const NoteAlert = ({
    cancelRef,
    showNoteAlert,
    onNoteAlertClose
 }) => {

  const platform = Platform.OS;

  let fontFamily = FONT.family;
  if (platform === ANDROID) {
    fontFamily = FONT.black;
  }

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
      size={'sm'}
      shadow={4} 
      style={{ elevation: 5 }}
    >
      <AlertDialog.Content borderRadius={'2xl'}>
        <AlertDialog.Body p={6}>
          <Text color={'blue.500'} fontFamily={fontFamily} fontWeight={FONT.bold} fontSize={19} textAlign={'center'}>Add Note</Text>
        </AlertDialog.Body>
            <Button variant="outline" borderBottomWidth={0} borderLeftWidth={0} borderRightWidth={0} onPress={onNoteAlertClose} ref={cancelRef}>
              <Text color={'blue.500'} fontFamily={fontFamily} fontWeight={FONT.bold} fontSize={15}>OK</Text>
            </Button>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default NoteAlert;