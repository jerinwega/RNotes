/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { VStack, Skeleton, Text, View, ScrollView, useColorMode } from "native-base";
 import { get } from 'lodash';

 const SkeletonLoader = () => {

const { colorMode } = useColorMode();

 const lightColors = ['red.100', 'yellow.100', 'green.100', 'coolGray.200'];
 const randomizeLightColors = lightColors[Math.floor(Math.random() * get(lightColors, 'length'))];

 const darkColors = ['red.500', 'yellow.500', 'green.500', 'coolGray.500'];
 const randomizeDarkColors = darkColors[Math.floor(Math.random() * get(darkColors, 'length'))];

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
                    <Skeleton h="16" startColor={colorMode === 'light' ? randomizeLightColors : randomizeDarkColors} />
                    <Skeleton.Text isLoaded>
                        <Text textAlign={'center'} opacity={0.4} 
                        fontFamily={'body'} fontWeight={'900'} fontSize={"sm"} letterSpacing={0.3}>
                            add notes
                        </Text>
                    </Skeleton.Text>
                    <Skeleton.Text px="4" pb="3" startColor={colorMode === 'light' ? randomizeLightColors : randomizeDarkColors} lines={3} alignItems="center"/>
                </VStack>
            </View>
            <View style={{ width: '50%', paddingLeft: 10 }}>
                <VStack overflow="hidden" borderWidth={1} rounded="3xl" space={4}
                    _dark={{ borderColor: "coolGray.700" }} 
                    _light={{ borderColor: "coolGray.200" }}
                >
                    <Skeleton h="16" startColor={colorMode === 'light' ? randomizeLightColors : randomizeDarkColors} />
                    <Skeleton.Text isLoaded>
                        <Text textAlign={'center'} opacity={0.4} 
                            fontFamily={'body'} fontWeight={'900'} fontSize={"sm"} letterSpacing={0.3}>
                            add notes
                        </Text>
                    </Skeleton.Text>
                    <Skeleton.Text px="4" pb="3" startColor={colorMode === 'light' ? randomizeLightColors : randomizeDarkColors} lines={3} alignItems="center"/>
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