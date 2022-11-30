/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { VStack, Skeleton, Text, View } from "native-base";
 import { get } from 'lodash';
import { SKELETON_DARK, SKELETON_LIGHT } from "../../utils/constants";

 const SkeletonLoader = () => {
 const colors = ['red.100', 'yellow.100', 'green.100', 'coolGray.100'];
 const randomizeColors = colors[Math.floor(Math.random() * get(colors, 'length'))];

 const skeletonRows = [];

    for (let i = 0; i < 3; i++) {
        skeletonRows.push(
        <View
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
                        <Text _dark={{ color: SKELETON_LIGHT }} _light={{ color: SKELETON_DARK }} textAlign={'center'} 
                        fontFamily={'Lato-Regular'} fontSize={"xs"} fontWeight='900' letterSpacing={0.3}>
                            ADD NOTES
                        </Text>
                    </Skeleton.Text>
                    <Skeleton.Text px="4" pb="3" startColor={randomizeColors} lines={3} alignItems="center" />
                </VStack>
            </View>
            <View style={{ width: '50%', paddingLeft: 10 }}>
                <VStack overflow="hidden" borderWidth={1} rounded="3xl" space={4}
                    _dark={{ borderColor: "coolGray.700" }} 
                    _light={{ borderColor: "coolGray.200" }}
                >
                    <Skeleton h="16" startColor={randomizeColors} />
                    <Skeleton.Text isLoaded>
                        <Text textAlign={'center'} _dark={{ color: SKELETON_LIGHT }} _light={{ color: SKELETON_DARK }} 
                        fontFamily={'Lato-Regular'} fontSize={"xs"} fontWeight='900' letterSpacing={0.3}>
                            ADD NOTES
                        </Text>
                    </Skeleton.Text>
                    <Skeleton.Text px="4" pb="3" startColor={randomizeColors} lines={3} alignItems="center" />
                </VStack>
            </View>
        </View>
        );
    }
  return (
    <>
        {skeletonRows}
    </>
  );
 }
 export default SkeletonLoader;