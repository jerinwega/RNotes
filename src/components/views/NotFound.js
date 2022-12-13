/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, Center, Button, Image } from "native-base";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import NoDataImage from '../../assets/images/NoData.png'

 const NotFound = ({
  resetPriority,
  resetSearch,
  findNotes
 }) => {

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} flex={1}>
        <Center h='4/5'>
        <Image 
          size={320}
          source={NoDataImage}
          alt="Notes Not Found !" />
        <Text fontFamily={'heading'} fontWeight={'900'} fontSize={30}>Oops!</Text>
        <Text fontFamily={'heading'} fontWeight={'900'} fontSize={20}>Notes Not Found</Text>
        <Button mt={2} variant={'ghost'} rounded={'full'} onPress={() => {
          resetSearch();
          resetPriority();
          findNotes();
        }}>
          <Text fontFamily={'mono'} color={'blue.500'} fontWeight={'600'} fontSize={16}>
            Clear Filters
          </Text>
          </Button>
        </Center>
    </TouchableWithoutFeedback>
  );
 }
 export default NotFound;