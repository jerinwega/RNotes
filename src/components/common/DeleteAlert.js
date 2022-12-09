/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button, Divider } from "native-base";
import { FONT } from "../../utils/constants";

 const DeleteAlert = ({
    cancelRef,
    isDeleteAlertOpen,
    handleDeleteAlert,
    onDeleteAlertClose,
    isView
 }) => {
  return (
    <AlertDialog  
      _backdrop={{
        _dark: {
          bg: isView ? 'dark.200' : 'gray.900'
        },
        _light: {
          bg: 'dark.200'
        }
      }} 
      leastDestructiveRef={cancelRef} 
      isOpen={isDeleteAlertOpen} 
      size={'sm'}
      shadow={4}
    >
      <AlertDialog.Content borderRadius={'2xl'} borderWidth={1} borderColor={'red.500'}>
        <AlertDialog.Body py={5}>
          <Text color={'red.500'} fontFamily={FONT.family} fontWeight={FONT.bold} fontSize={19} textAlign={'center'}>Delete Note !</Text>
          <Text fontFamily={FONT.family} fontWeight={FONT.semibold} fontSize={15} textAlign={'center'} mt={3}>Are you sure to delete this note ?</Text>
        </AlertDialog.Body>
          <Button.Group space={0}>
            <Button borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={onDeleteAlertClose} ref={cancelRef}>
              <Text color={'blue.500'} fontFamily={FONT.family} fontWeight={FONT.bold} fontSize={15}>NO</Text>
            </Button>
            <Divider orientation="vertical" />
            <Button borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={handleDeleteAlert}>
              <Text color={'red.500'} fontFamily={FONT.family} fontWeight={FONT.bold} fontSize={15}>YES</Text>
            </Button>
          </Button.Group>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default DeleteAlert;