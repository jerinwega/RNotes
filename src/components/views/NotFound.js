/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, Center, Button, Image, View } from "native-base";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import NoDataImage from '../../assets/images/NoData.png'
import { scaledFont } from "../common/Scale";
import { ANDROID } from '../../utils/constants'

 const NotFound = ({
  resetPriority,
  resetSearch,
  findNotes
 }) => {

  return (
    <View>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} flex={1}>
        <Center h='4/5'>
        <Image 
          size={scaledFont(300)}
          source={NoDataImage}
          alt="Notes Not Found !" />
        <Text fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(28)}>Oops!</Text>
        <Text mb={1} fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(18)}>Notes Not Found</Text>
        </Center>
    </TouchableWithoutFeedback>
    <Center>
     <Button mt={Platform.OS === ANDROID ? 4 : 2} px={4} py={2} variant={'ghost'} rounded={'full'} onPress={() => {
        resetSearch();
        resetPriority();
        findNotes();
        }}>
        <Text fontFamily={'mono'} color={'blue.500'} fontWeight={'600'} fontSize={scaledFont(16)}>
          Clear Filters
        </Text>
      </Button>
    </Center>
    </View>
  );
 }
 export default NotFound;