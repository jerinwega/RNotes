/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Modal, Text, Button, useColorMode, useToast } from "native-base";
import {  StyleSheet, Linking } from 'react-native';
import { scaledFont } from "./Scale";
import { LIGHT_COLOR, DARK_COLOR } from "../../utils/constants";

const UrlAlert = ({
   showUrl,
   handleClose,
   url,
}) => {
    const { colorMode } = useColorMode();
    const urlToast = useToast();

    const handleUrl = async () => {
      try {
        const checkLink = await Linking.canOpenURL(url);
        if (checkLink) {
            await Linking.openURL(url);
            handleClose();
        } else {
            handleClose();
            const id = "urlToast";
            if (!urlToast.isActive(id)) {
                urlToast.show({
            id,
            title: 'Invalid Link',
            placement: "bottom",
            duration: 1500,
            rounded: '3xl',
            bg: colorMode === 'light' ? 'warning.500' : LIGHT_COLOR,
            _title: {
                px: 2,
                py: 1,
                fontFamily: 'mono',
                fontWeight: '900',
                fontSize: scaledFont(15),
                color: colorMode === "light" ? LIGHT_COLOR : 'warning.500'
            }
            });
            }
        }
      } catch(err) {
          handleClose();
            const id = "urlToast";
            if (!urlToast.isActive(id)) {
                urlToast.show({
            id,
            title: 'Invalid Link',
            placement: "bottom",
            duration: 1500,
            rounded: '3xl',
            bg: colorMode === 'light' ? 'warning.500' : LIGHT_COLOR,
            _title: {
                px: 2,
                py: 1,
                fontFamily: 'mono',
                fontWeight: '900',
                fontSize: scaledFont(15),
                color: colorMode === "light" ? LIGHT_COLOR : 'warning.500'
            }
            });
          }
      }
    }
 return (
    <Modal 
      shadow={4} 
      size={'md'}
      isOpen={showUrl} 
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
        <Modal.Header borderBottomWidth={0} ml={3} pt={6} pb={0}>
            <Text fontSize={scaledFont(18)} fontFamily={'mono'} fontWeight={'900'} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}>Go To</Text>
        </Modal.Header>
          <Modal.Body ml={3} pb={6}>
          <Text fontSize={scaledFont(16)} fontFamily={'mono'} fontWeight={'600'} style={styles.urlStyle}>{url}</Text>
          </Modal.Body>
            <Button.Group space={0}>
           <Button py={3} borderRadius={'none'} width={'50%'} variant="ghost" onPress={handleClose}>
             <Text color={'red.500'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(14)}>CANCEL</Text>
           </Button>
           <Button py={3} borderRadius={'none'} width={'50%'} variant="ghost" onPress={handleUrl}>
             <Text color={'blue.500'} fontFamily={'mono'} fontWeight={'900'} fontSize={scaledFont(14)}>OK</Text>
           </Button>
         </Button.Group>
        </Modal.Content>
      </Modal>
 );
}
const styles = StyleSheet.create({
    urlStyle: {
      color: '#41B2F3',
      textDecorationLine: 'underline'
    }
   });
export default UrlAlert;