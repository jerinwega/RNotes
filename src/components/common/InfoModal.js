/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Modal, Text, useColorMode, View, Center } from "native-base";
import { scaledFont } from "./Scale";
import { LIGHT_COLOR, DARK_COLOR } from "../../utils/constants";
import EntypoIcon from 'react-native-vector-icons/Entypo';

const InfoModal = ({
    showInfoModal,
    handleClose,
}) => {

    const { colorMode } = useColorMode();

 return (
    <Modal 
    animationPreset="slide"
      shadow={4} 
      size={'md'}
      isOpen={showInfoModal} 
      onClose={() => {
        handleClose();
      }} 
      _backdrop={{
        _dark: {
          bg: 'gray.400'
        },
        _light: {
          bg: 'gray.900'
        }
        }}
      style={{ elevation : 5 }}
    >
        <Modal.Content 
          borderRadius={'3xl'}
          borderWidth={1} 
          borderColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255,255,255, 0.1)'}>
        <Modal.CloseButton 
          accessibilityLabel={'close button'}
          _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
          borderRadius={'full'} />
        <Modal.Header>
          <EntypoIcon name="info-with-circle" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(22)} />
          </Modal.Header>
          <Modal.Body>
          <Center>
            <View>
              <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(15)}>Select <Text color={'green.600'}>LOW</Text> | <Text color={'yellow.600'}>MEDIUM</Text> | <Text color={'red.600'}>HIGH</Text> priority for notes.</Text>
              <Text mt={3} fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(15)}>Select <Text color={colorMode === 'light' ? 'blue.600' : 'blue.500'}>CONFIDENTIAL</Text> priority to display Overlayed Notes</Text>
              <Text mt={3} fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(13)}><Text color={'green.600'}>LOW</Text> priority is set as default</Text>
            </View>
          </Center>
        </Modal.Body>
        </Modal.Content>
      </Modal>
 );
}

export default InfoModal;