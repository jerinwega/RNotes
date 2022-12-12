/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { VStack, Skeleton, Text, View, ScrollView, useColorMode } from "native-base";
 import { Platform } from "react-native";
 import { get } from 'lodash';
import { ANDROID, FONT } from "../../utils/constants";

 const SkeletonLoader = () => {

const { colorMode } = useColorMode();

const platform = Platform.OS;

let fontFamily = FONT.family;
if (platform === ANDROID) {
  fontFamily = FONT.black;
}
 const colors = ['red.100', 'yellow.100', 'green.100', 'coolGray.200'];
 const randomizeColors = colors[Math.floor(Math.random() * get(colors, 'length'))];

 const skeletonRows = [];
    for (let i = 0; i < 4; i++) {
        skeletonRows.push(
    <View
        flex={1}
            key={i}
            style={{
                flexDirection: 'row',
                paddingRight: 20,
                paddingLeft: 20,
                paddingBottom: 20
            }} 
        >
            <View style={{ width: '50%', paddingRight: 10 }}>
                <VStack overflow="hidden" borderWidth={1} rounded="3xl" space={4} 
                    _dark={{ borderColor: "coolGray.700" }} 
                    _light={{ borderColor: "coolGray.200" }}
                >
                    <Skeleton h="16" startColor={randomizeColors} />
                    <Skeleton.Text isLoaded>
                        <Text textAlign={'center'} opacity={0.4} 
                        fontFamily={fontFamily} fontWeight={FONT.bold} fontSize={"sm"} letterSpacing={0.3}>
                            add notes
                        </Text>
                    </Skeleton.Text>
                    <Skeleton.Text px="4" pb="3" startColor={randomizeColors} lines={3} alignItems="center"/>
                </VStack>
            </View>
            <View style={{ width: '50%', paddingLeft: 10 }}>
                <VStack overflow="hidden" borderWidth={1} rounded="3xl" space={4}
                    _dark={{ borderColor: "coolGray.700" }} 
                    _light={{ borderColor: "coolGray.200" }}
                >
                    <Skeleton h="16" startColor={randomizeColors} />
                    <Skeleton.Text isLoaded>
                        <Text textAlign={'center'} opacity={0.4} 
                            fontFamily={fontFamily} fontWeight={FONT.bold} fontSize={"sm"} letterSpacing={0.3}>
                            add notes
                        </Text>
                    </Skeleton.Text>
                    <Skeleton.Text px="4" pb="3" startColor={randomizeColors} lines={3} alignItems="center"/>
                </VStack>
            </View>
        </View>
        );
    }
  return (
    <ScrollView bounces indicatorStyle={colorMode === 'light' ? 'black' : 'white'}>
        {skeletonRows}
    </ScrollView>
  );
 }
 export default SkeletonLoader;