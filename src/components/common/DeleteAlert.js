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
import { DARK_COLOR, LIGHT_COLOR } from "../../utils/constants";

 const DeleteAlert = ({
    cancelRef,
    isDeleteAlertOpen,
    handleDeleteAlert,
    onDeleteAlertClose,
    isView,
 }) => {
  const { colorMode } = useColorMode();
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
      style={{ elevation: 5 }}
    >
      <AlertDialog.Content borderRadius={'2xl'} borderWidth={1} borderColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255, 0.1)'}> 
        <AlertDialog.Body py={5}>
          <Text color={'red.500'} fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(18)} textAlign={'center'}>Delete Note !</Text>
          <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(14)} textAlign={'center'} mt={3}>Are you sure to delete this note ?</Text>
        </AlertDialog.Body>
          <Button.Group space={0}>
            <Button borderRadius={'none'} width={'50%'} variant="ghost" onPress={onDeleteAlertClose} ref={cancelRef}>
              <Text color={'blue.500'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(14)}>NO</Text>
            </Button>
            <Button  borderRadius={'none'} width={'50%'} variant="ghost" onPress={handleDeleteAlert}>
              <Text color={'red.500'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(14)}>YES</Text>
            </Button>
          </Button.Group>
      </AlertDialog.Content>
    </AlertDialog>
  );
 }
 export default DeleteAlert;