/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, Center, Button, Image, useColorMode, ScrollView } from "native-base";
import { Keyboard } from "react-native";
import NoDataImage from '../../assets/images/NoData.png'
import { scaledFont } from "../common/Scale";

 const NotFound = ({
  resetPriority,
  resetSearch,
  findNotes
 }) => {
  const { colorMode } = useColorMode();

  return (
    <ScrollView 
      bounces
      flex={1} 
      py={4}
      contentContainerStyle={{ flexGrow: 1 }}
      onTouchStart={() => Keyboard.dismiss()}
      showsVerticalScrollIndicator={false}>
        <Center>
        <Image
          size={scaledFont(280)}
          source={NoDataImage}
          alt="Notes Not Found !" />
        <Text fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(30)}>Oops!</Text>
        <Text mb={1} fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(18)}>Notes Not Found</Text>
        </Center>
      <Center>
      <Button
        accessibilityHint="clear all filters"
        accessibilityLabel="clear filters button"
       _pressed={{ bg: colorMode==='light' ? 'gray.200' : 'dark.100'}} mt={2} px={6} py={2} variant={'outline'} rounded={'full'} onPress={() => {
          resetSearch();
          resetPriority();
          findNotes();
          }}>
          <Text fontFamily={'mono'} color={colorMode === 'light' ?'blue.600' : 'blue.500'} fontWeight={'600'} fontSize={scaledFont(16)}>
            Clear Filters
          </Text>
      </Button>
    </Center>
    </ScrollView>
  );
 }
 export default NotFound;