/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Modal, Text, useColorMode, Image, View, Center } from "native-base";
import { scaledFont, scaledHeight } from "./Scale";
import { Platform } from 'react-native';
import { LIGHT_COLOR, DARK_COLOR, ANDROID } from "../../utils/constants";
import dropDownLight from '../../assets/images/dropDownLight.png'
import selectLight from '../../assets/images/selectLight.png'
import confidentialLight from '../../assets/images/confidentialLight.png'
import listLight from '../../assets/images/listLight.png'
import selectDark from '../../assets/images/selectDark.png'
import confidentialDark from '../../assets/images/confidentialDark.png'
import listDark from '../../assets/images/listDark.png'
import dropDownDark from '../../assets/images/dropDownDark.png'
import Swiper from 'react-native-swiper'
import { color } from "react-native-reanimated";




const InfoModal = ({
    showInfoModal,
    handleClose,
}) => {

    const { colorMode } = useColorMode();

    const priorityFrag = () => {
      return (
        <Center>
            <Image
              key={colorMode === 'light' ? selectLight : selectDark}
              source={colorMode === 'light' ? selectLight : selectDark}
              alt="Select Options" />
            <Image
              mt={3}
              key={colorMode === 'light' ? dropDownLight : dropDownDark}
              source={colorMode === 'light' ? dropDownLight : dropDownDark}
              alt="Dropdown List" />
          <View mt={6}>
            <Text fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(16)}>Select <Text color={'green.600'}>LOW</Text> | <Text color={'yellow.600'}>MEDIUM</Text> | <Text color={'red.600'}>HIGH</Text> priority for notes</Text>
            <Text mt= {3} fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(15)}><Text color={'green.600'}>LOW</Text> priority is set as default</Text>
          </View>
        </Center>
      );
    }

    const confidentialFrag = () => {
      return (
        <Center>
            <Image
              key={colorMode === 'light' ? confidentialLight : confidentialDark}
              source={colorMode === 'light' ? confidentialLight : confidentialDark}
              alt="Select Confidential" />
            <Image
              mt={2}
              key={colorMode === 'light' ? listLight : listDark}
              source={colorMode === 'light' ? listLight : listDark}
              alt="Confidential Note" />
            <View mt={6}>
              <Text textAlign={'center'} fontFamily={'body'} fontWeight={'600'} fontSize={scaledFont(16)}>Select <Text color={colorMode === 'light' ? 'blue.600' : 'blue.500'}>CONFIDENTIAL</Text> priority to display Overlayed Notes</Text>
            </View>
        </Center>
      );
    }


 return (
    <Modal 
      shadow={4} 
      size={'lg'}
      isOpen={showInfoModal} 
      onClose={() => {
        handleClose();
      }} 
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
        <Modal.Content bg={colorMode==='light' ? LIGHT_COLOR : Platform.OS === ANDROID ? 'rgba(18,18,19,255)' : DARK_COLOR} pt={12} borderRadius={'3xl'} borderWidth={1} borderColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255,255,255, 0.1)'}>
        <Modal.CloseButton 
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
          <Modal.Body>
          <Swiper style={{ height: Platform.OS === ANDROID ? scaledHeight(340) : scaledHeight(300) }}
          dot={colorMode === 'light' ? null
          : <View 
          style={{
           backgroundColor:'rgba(255,255,255,0.4)',
           width: 8, 
           height: 8,
           borderRadius: 4, 
           marginLeft: 3, 
           marginRight: 3,
           marginTop: 3, 
           marginBottom: 3
          }} />}          
          autoplay={true} 
          autoplayTimeout={10} 
          bounces={true}
          >
            <View>
             {priorityFrag()}
            </View>
            <View>
              {confidentialFrag()}
            </View>
         </Swiper>
        </Modal.Body>
        </Modal.Content>
      </Modal>
 );
}

export default InfoModal;