/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { AlertDialog, Text, Button, useColorMode } from "native-base";
 import { scaledFont } from "./Scale";

 const DeleteAlert = ({
    cancelRef,
    isDeleteAlertOpen,
    handleDeleteAlert,
    onDeleteAlertClose,
 }) => {
  const { colorMode } = useColorMode();
  return (
    <AlertDialog 
    animationPreset="slide"
      _backdrop={{
        _dark: {
          bg: 'black',
          opacity: 0.5
        },
        _light: {
          bg: 'gray.900'
        }
      }} 
      leastDestructiveRef={cancelRef} 
      isOpen={isDeleteAlertOpen} 
      size={'md'}
      shadow={4}
      style={{ elevation: 5 }}
    >
      <AlertDialog.Content borderRadius={'3xl'} borderWidth={1} borderBottomWidth={0} borderColor={'rgba(0, 0, 0, 0.01)'}> 
        <AlertDialog.Body py={5}>
          <Text color={colorMode==='light' ? 'red.500' : 'red.600'} fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(17)} textAlign={'center'}>Delete Note !</Text>
          <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(15)} textAlign={'center'} mt={3}>Are you sure to delete this note ?</Text>
        </AlertDialog.Body>
          <Button.Group space={0}>
            <Button py={3} borderRadius={'none'} width={'50%'} variant="ghost" onPress={onDeleteAlertClose} ref={cancelRef}>
              <Text color={colorMode==='light' ? 'blue.500' : 'blue.600'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(13)}>NO</Text>
            </Button>
            <Button py={3} borderRadius={'none'} width={'50%'} variant="ghost" onPress={handleDeleteAlert}>
              <Text color={colorMode==='light' ? 'red.500' : 'red.600'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(13)}>YES</Text>
            </Button>
          </Button.Group>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default DeleteAlert;