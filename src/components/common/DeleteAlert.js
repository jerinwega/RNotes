/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button, Divider } from "native-base";

 const DeleteAlert = ({
    cancelRef,
    isDeleteAlertOpen,
    handleDeleteAlert,
    onDeleteAlertClose
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
      isOpen={isDeleteAlertOpen} 
      size={'sm'}
      shadow={4} 
    >
      <AlertDialog.Content borderRadius={'2xl'}>
        <AlertDialog.Body py={5}>
          <Text color={'red.500'} fontWeight={'900'} fontFamily={'Lato-Regular'} fontSize={18} textAlign={'center'}>Delete Note !</Text>
          <Text bold fontFamily={'Lato-Regular'} fontSize={15} textAlign={'center'} mt={3}>Are you sure to delete this note ?</Text>
        </AlertDialog.Body>
          <Button.Group space={0}>
            <Button borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={onDeleteAlertClose} ref={cancelRef}>
              <Text fontWeight={'800'} color={'blue.500'} fontFamily={'Lato-Regular'} fontSize={15}>NO</Text>
            </Button>
            <Divider orientation="vertical" />
            <Button borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={handleDeleteAlert}>
              <Text fontWeight={'800'} color={'red.500'} fontFamily={'Lato-Regular'} fontSize={15}>YES</Text>
            </Button>
          </Button.Group>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default DeleteAlert;