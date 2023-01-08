/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Keyboard, TouchableWithoutFeedback, Platform } from "react-native";
import { Modal, Text, useColorMode, Button, FormControl, Input } from "native-base";
import { scaledFont } from "./Scale";
import { LIGHT_COLOR, DARK_COLOR, ANDROID } from "../../utils/constants";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const NameModal = ({
    showUserModal,
    handleCloseUserModal,
    textFontSize,
    handleEditName,
    updatedUser,
    onChangeText
}) => {
    
    const { colorMode } = useColorMode();
return (
<Modal 
      animationPreset="slide"
      shadow={4} 
      size={'md'}
      isOpen={showUserModal} 
      onClose={handleCloseUserModal} 
      _backdrop={{
        _dark: {
          bg: 'black',
          opacity: 0.5
        },
        _light: {
          bg: 'gray.900'
        }
      }}
      style={{ elevation : 5, marginTop: -100 }}
    >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Modal.Content rounded={'3xl'} borderWidth={1} borderBottomWidth={0} borderColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255,255,255, 0.1)'}>
          <Modal.CloseButton 
            accessibilityLabel="Close Button"
            accessibilityHint="Close Modal"
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
            <Modal.Header>
              <FontAwesome5Icon name="user-edit" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(21)} solid /> 
          </Modal.Header>
          <Modal.Body>
          <FormControl px={1}>
              <Input
                textAlign={'center'}
                rounded={'3xl'}
                fontSize={textFontSize}
                fontFamily={'mono'}
                fontWeight={'900'}
                spellCheck={false}
                autoFocus={true}
                value={updatedUser}
                accessibilityLabel={'Edit Name'}
                accessibilityHint="Edit Name Field"
                onChangeText={(value) => onChangeText(value)}
                placeholder="Name"
                color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
                _focus={{ selectionColor: Platform.OS === ANDROID ? colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)' : colorMode === 'light' ? 'black': 'white' }} 
                _dark={{ bg: 'black' }}
                _light={{ bg: 'white' }} 
              />
            </FormControl>
          </Modal.Body>
              <Button
                py={3}
                width={'full'}
                variant="ghost" 
                onPress={handleEditName}
                rounded={'3xl'}
                borderTopRadius={'none'}
              >
              <Text fontFamily={'mono'} color={'green.500'} fontSize={scaledFont(13)} fontWeight={'900'}>
                SAVE        
              </Text>
              </Button>
        </Modal.Content>
        </TouchableWithoutFeedback>
      </Modal> 
);
    }
    export default NameModal;