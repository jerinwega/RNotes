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
import { ANDROID } from "../../utils/constants";

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
          size={320}
          source={NoDataImage}
          alt="Notes Not Found !" />
        <Text fontFamily={'heading'} fontWeight={'900'} fontSize={30}>Oops!</Text>
        <Text mb={2} fontFamily={'heading'} fontWeight={'900'} fontSize={20}>Notes Not Found</Text>
        </Center>
    </TouchableWithoutFeedback>
    <Center>
     <Button mt={Platform.OS === ANDROID ? 6 : 4} px={4} py={1} variant={'ghost'} rounded={'full'} onPress={() => {
        resetSearch();
        resetPriority();
        findNotes();
        }}>
        <Text fontFamily={'mono'} color={'blue.500'} fontWeight={'600'} fontSize={18}>
          Clear Filters
        </Text>
      </Button>
    </Center>
    </View>
  );
 }
 export default NotFound;