/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, Center, Button, Image, useColorMode, ScrollView } from "native-base";
import { Keyboard, RefreshControl } from "react-native";
import NoDataImage from '../../assets/images/NoData.webp'
import { scaledFont } from "../common/Scale";
import { DARK_COLOR, LIGHT_COLOR } from "../../utils/constants";

 const NotFound = ({
  onRefresh,
  refreshState,
  handleClearSearch
 }) => {
  const { colorMode } = useColorMode();


  return (
    <ScrollView 
      bounces
      flex={1} 
      py={4}
      contentContainerStyle={{ flexGrow: 1 }}
      onTouchStart={() => Keyboard.dismiss()}
      showsVerticalScrollIndicator={false}
      refreshControl={(
        <RefreshControl
          refreshing={refreshState}
          onRefresh={onRefresh}
          tintColor={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
          progressBackgroundColor={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
          colors={colorMode === 'light' ? [LIGHT_COLOR] : [DARK_COLOR]}
        />
      )}
      >
        <Center>
        <Image
          size={scaledFont(280)}
          source={NoDataImage}
          alt="Notes Not Found !" />
        <Text pt={2} mb={1} fontFamily={'heading'} fontWeight={'900'} fontSize={scaledFont(28)}>Oops!</Text>
        <Text mb={1} fontFamily={'heading'} fontWeight={'600'} fontSize={scaledFont(18)}>Notes Not Found</Text>
        </Center>
      <Center>
      <Button
        accessibilityHint="clear all filters"
        accessibilityLabel="clear filters button"
        bg={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR}
        borderColor={'blue.200'}
        borderWidth={2}
       _pressed={{ bg: 'blue.100'}} mt={2} px={6} py={1} variant={'outline'} rounded={'full'} onPress={handleClearSearch}>
          <Text fontFamily={'mono'} color={'blue.600'} fontWeight={'900'} fontSize={scaledFont(16)}>
            Clear Filters
          </Text>
      </Button>
    </Center>
    </ScrollView>
  );
 }
 export default NotFound;