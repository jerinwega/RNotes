/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Box, Modal, Text, useColorMode } from "native-base";
import { scaledFont } from "./Scale";
import { LIGHT_COLOR, DARK_COLOR } from "../../utils/constants";


const InfoModal = ({
    showInfoModal,
    handleClose,
}) => {
    const { colorMode } = useColorMode();


 return (
    <Modal 
      shadow={4} 
      size={'md'}
      isOpen={showInfoModal} 
      onClose={handleClose} 
      _backdrop={{
        _dark: {
          bg: 'gray.900'
        },
        _light: {
          bg: 'dark.200'
        }
      }}
      style={{ elevation : 5 }}
    >
        <Modal.Content borderRadius={'3xl'} borderWidth={1} borderColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255,255,255, 0.1)'}>
        <Modal.CloseButton 
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
            <Modal.Header><Text fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(20)}>Note Priorities</Text></Modal.Header>
          <Modal.Body>
            <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(16)}>Note with <Text color={'green.600'}>LOW</Text> priority</Text>
            <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(16)}>Note with <Text color={'yellow.600'}>MEDIUM</Text> priority</Text>
            <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(16)}>Note with <Text color={'red.600'}>HIGH</Text> priority</Text>
            <Box my={2} py={2} borderWidth={1} borderColor={colorMode === 'light' ? 'blue.600' : LIGHT_COLOR} rounded={'3xl'}> 
            <Text textAlign={'center'} fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(16)} color={'blue.600'}>CONFIDENTIAL</Text>
            <Text textAlign={'center'} fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(15)}> Overlayed Notes</Text>
            </Box>
            <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(15)}>LOW priority by default</Text>
        </Modal.Body>
        </Modal.Content>
      </Modal>
 );
}

export default InfoModal;