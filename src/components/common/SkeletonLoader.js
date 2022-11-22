/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { VStack, Skeleton } from "native-base";
 import { get } from 'lodash';
 import { View } from "react-native";

 const SkeletonLoader = () => {
 const colors = ['red.100', 'yellow.100', 'green.100', 'coolGray.100'];
 const randomizeColors = colors[Math.floor(Math.random() * get(colors, 'length'))];

 const skeletonRows = [];

    for (let i = 0; i < 4; i++) {
        skeletonRows.push(
        <View
            key={i}
            style={{
                flexDirection: 'row',
                paddingRight: 24,
                paddingLeft: 24,
                paddingTop: 24 
            }} 
        >
            <View style={{ width: '50%', paddingRight: 10 }}>
                <VStack overflow="hidden" borderWidth={1} rounded="3xl" space={4} 
                    _dark={{ borderColor: "coolGray.700" }} 
                    _light={{ borderColor: "coolGray.200" }}
                >
                    <Skeleton h="16" startColor={randomizeColors} />
                    <Skeleton.Text px="4" py="4" startColor={randomizeColors} lines={3} alignItems="center" />
                </VStack>
            </View>
            <View style={{ width: '50%', paddingLeft: 10 }}>
                <VStack overflow="hidden" borderWidth={1} rounded="3xl" space={4}
                    _dark={{ borderColor: "coolGray.700" }} 
                    _light={{ borderColor: "coolGray.200" }}
                >
                    <Skeleton h="16" startColor={randomizeColors} />
                    <Skeleton.Text px="4" py="4" startColor={randomizeColors} lines={3} alignItems="center" />
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