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
import { LIGHT_COLOR, DARK_COLOR } from "../../utils/constants";

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
        backgroundColor={LIGHT_COLOR}
        rounded={'3xl'}
        borderWidth={1} 
        borderColor={'rgba(0, 0, 0, 0.01)'}>
          <View px={6} pt={6} pb={4}>
          <Center>
            <View>
              <Text color={DARK_COLOR} fontWeight={'600'} fontSize={scaledFont(16)}>Tap to create your first note</Text>
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
            <Text fontFamily={'mono'} color={'green.500'} fontSize={scaledFont(14)} fontWeight={'900'}>
                OK     
            </Text>
        </Button>
        </View>
      </View>
 );
}

export default OnboardingTooltip;




