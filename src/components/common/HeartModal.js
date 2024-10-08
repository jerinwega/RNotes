/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { Modal, Text, useColorMode } from "native-base";
import { scaledFont } from "./Scale";
import { LIGHT_COLOR, DARK_COLOR } from "../../utils/constants";
import moment from "moment";
import { isSameDayAndMonth } from '../common/utils';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';


const HeartModal = ({
    showHeartModal,
    handleClose,
}) => {
    const { colorMode } = useColorMode();

    const birthday = moment().diff('1997-10-25', 'years');
    const anniversary = moment().diff('2022-09-18', 'days');

    let LoveMessageFrag = 'For Rani Varghese';
    let subFrag = '';

    const today = moment(moment().format('YYYY-MM-DD'));
    const bday = moment('1997-10-25');
    const aday = moment('2022-09-18');
    const birthdayCheck = isSameDayAndMonth(today, bday);
    const anniversaryCheck = isSameDayAndMonth(today, aday);

    if (birthdayCheck) {
        LoveMessageFrag = `Happy ${birthday} !`;
        subFrag = '❤️ of my life';
    }

    if (anniversaryCheck) {
        LoveMessageFrag = 'Happy Anniversary !';
        subFrag = `${anniversary} days of us \n Ruth 1:16-17`;
    }

 return (
    <Modal 
    animationPreset="slide"
      shadow={4} 
      size={'md'}
      isOpen={showHeartModal} 
      onClose={handleClose} 
      _backdrop={{
        _dark: {
          bg: 'black',
          opacity: 0.5
        },
        _light: {
          bg: 'gray.900'
        }
      }}
      style={{ elevation : 5 }}
    >
        <Modal.Content borderRadius={'3xl'} borderWidth={1} borderColor={'rgba(0, 0, 0, 0.01)'}>
        <Modal.CloseButton 
            accessibilityLabel={'Close button'}
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
           <Modal.Header>
           <FontAwesome5Icon color={'red'} name="heart" size={scaledFont(21)} solid />
          </Modal.Header>
          <Modal.Body mt={2} mb={subFrag ? 4 : 0}>
          <Text mb={subFrag ? 2 : 0} textAlign={'center'} fontSize={scaledFont(17)} fontFamily={'mono'} fontWeight={'900'}>{LoveMessageFrag}</Text>
          <Text textAlign={'center'} fontSize={scaledFont(15)} fontFamily={'mono'} fontWeight={'600'}>{subFrag}</Text>

          </Modal.Body>
          <Text mb={2} textAlign={'center'} fontSize={scaledFont(13)} fontFamily={'mono'} fontWeight={'600'}>
            Made with
          <Text fontFamily={'mono'} fontWeight={'600'} color={'red.600'}>
            {' ❤️ '}
          </Text>
            by <Text fontFamily={'mono'} fontWeight={'900'}>JA</Text>
          </Text>
        </Modal.Content>
      </Modal>
 );
}

export default HeartModal;