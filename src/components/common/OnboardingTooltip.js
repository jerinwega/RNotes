// /**
//  * LoveProject999 : RNotes
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

import React from "react";
import { Text, View, Center, Button } from "native-base";
import { scaledFont } from "./Scale";
import { DARK_COLOR } from "../../utils/constants";

const OnboardingTooltip = ({
    handleStop,
}) => {

  const handleStopTour = () => {
    handleStop();
  }

 return (
    <View 
      shadow={4} 
      style={{ elevation : 5 }} 
      accessibilityLabel="onboarding modal"
    >
    <View
        backgroundColor={"white"}
        rounded={'3xl'}
        borderWidth={1} 
        borderColor={'green.200'}>
          <View px={6} pt={6} pb={4}>
          <Center>
            <View alignItems={'center'}>
              <Text color={DARK_COLOR} fontWeight={'600'} fontSize={scaledFont(15)}>Tap the plus button to create</Text>
              <Text color={DARK_COLOR} fontWeight={'600'} fontSize={scaledFont(15)}>your first note 📝</Text>

            </View>
          </Center>
        </View>
        <Button
            accessibilityLabel="OK"
            variant="ghost" 
            onPress={handleStopTour}
            borderTopRadius={'none'}
            rounded={'3xl'}
            >
            <Text fontFamily={'mono'} color={'green.500'} fontSize={scaledFont(13)} fontWeight={'900'}>
                OK     
            </Text>
        </Button>
        </View>
      </View>
 );
}

export default OnboardingTooltip;




