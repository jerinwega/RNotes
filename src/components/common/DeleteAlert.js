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
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isDeleteAlertOpen} size={'sm'}>
        <AlertDialog.Content borderRadius={'2xl'} opacity={0.97}>
          <AlertDialog.Body>
            <Text color={'red.600'} fontWeight={'900'} fontFamily={'Lato-Regular'} fontSize={18} textAlign={'center'}>Delete Note !</Text>
            <Text bold fontFamily={'Lato-Regular'} fontSize={15} textAlign={'center'} mt={3}>Are you sure to delete this note ?</Text>
          </AlertDialog.Body>
            <Button.Group space={0}>
              <Button p={3} borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={onDeleteAlertClose} ref={cancelRef}>
                <Text fontWeight={'800'} color={'blue.600'} fontFamily={'Lato-Regular'} fontSize={15}>NO</Text>
              </Button>
              <Divider orientation="vertical" />
              <Button p={3} borderRightWidth={0} borderLeftWidth={0} borderBottomWidth={0} borderRadius={'none'} width={'50%'} variant="outline" onPress={handleDeleteAlert}>
                <Text fontWeight={'800'} color={'red.600'} fontFamily={'Lato-Regular'} fontSize={15}>YES</Text>
              </Button>
            </Button.Group>
        </AlertDialog.Content>
      </AlertDialog>
  );
 }
 export default DeleteAlert;