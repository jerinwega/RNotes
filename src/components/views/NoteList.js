/**
 * LoveProject999 : RNotes
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { Text, View, useColorMode, Box } from "native-base";
import { Dimensions, TouchableOpacity, StyleSheet,Platform } from "react-native";
import { DARK_COLOR, LIGHT_COLOR, ANDROID } from '../../utils/constants';
import moment from 'moment';
import { scaledFont, scaledHeight } from "../common/Scale";
import { WebView } from 'react-native-webview';
import Spinner from "react-native-spinkit";
import Autolinker from 'autolinker';


// `${str.slice(0, limit)}...`;


 const NoteList = ({
  item,
  onLongPress,
  onPress,
  selected
 }) => {
  const { colorMode } = useColorMode();
  const deviceWidth = Dimensions.get('window').width - 40;
  const { title, description, priority, time } = item;


  let hashBgColor = '#dcfce7';
  let borderColor = 'green.200';
  let borderDarkColor = 'green.400';

  if (priority === 'confidential') {
    hashBgColor = '#dbeafe';
    borderColor = 'blue.200';
    borderDarkColor = 'blue.400';
  }

  if (priority === 'high') {
    hashBgColor = '#fee2e2';
    borderColor = 'red.200';
    borderDarkColor = 'red.400';
  }
  if (priority === 'medium') {
    hashBgColor = '#fef9c3';
    borderColor = 'yellow.200';
    borderDarkColor = 'yellow.400';
  }

  const trimmedDesc = description.replace(/\n\s*\n/g, '\n').trim();
  //add at end .replace(/\n\s*\n/g, '\n').trim();

  const autoLinkedText = Autolinker.link(trimmedDesc);

  const fileUriForRegular = Platform.select({
    ios: `Lato-Regular.ttf`,
    android: `file:///android_asset/fonts/Lato-Regular.ttf`
  });
const fileUriForBold = Platform.select({
    ios: `Lato-Bold.ttf`,
    android: `file:///android_asset/fonts/Lato-Bold.ttf`
  });

  const css = `<style>
  @font-face {
      font-family: 'Lato-Regular';
      src: local('Lato-Regular'), url('${fileUriForRegular}') format('truetype');
  }
  @font-face {
    font-family: 'Lato-Bold';
    src: local('Lato-Bold'), url('${fileUriForBold}') format('truetype');
}
  
  a {
    color: #41B2F3;
    font-family: 'Lato-Bold';
    text-decoration: none;
  }
  body {
    font-size: ${scaledFont(17)};
    color: ${colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR};
    line-height: 28px;
    font-family: 'Lato-Regular';
    word-break: break-all; 
    word-wrap: break-word;
    overflow-x: auto;
    margin: 0;
    padding: 0;
    text-shadow: ${priority === 'confidential' ? `-5px 0px 0.1px ${colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}`: 'none'};
  }
  ::selection { background: ${colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)'}; color: ${colorMode === 'light' ? 'black' : 'white'};
</style>`

const htmlText = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${css}</head><body>${autoLinkedText}</body></html>`;



 return <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
      >
      <Box 
        accessibilityLabel={'Note'}
        accessibilityHint={'Note View'}
        flex={1}
        w={deviceWidth / 2 - 3}
        mb={3} 
        px={4} 
        py={3}
        rounded="3xl" 
        justifyContent={!trimmedDesc ? "center" : 'flex-start'}
        borderTopWidth={5}
        style={{ transform: [{ scale: selected ? 0.95 : 1 }], opacity: selected ? colorMode === 'light' ? 0.5 : 0.4 : 1 }}
        _dark={{ borderColor: borderDarkColor, borderWidth: 1, bg: selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}} 
        _light={{ borderColor: borderColor, borderWidth: 2, background: selected ? 'rgba(0, 0, 0, 0.1)' : hashBgColor }}
      >
            <View px={4} py={3} style={{ position: 'absolute', top: 0, right: 0 }}>
                <Text accessibilityLabel={'Date'} fontSize={scaledFont(13)} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontFamily={'mono'} fontStyle={'italic'} fontWeight={'600'} numberOfLines={1}>
                  {moment(time).format('DD MMM YYYY')}
                </Text>
              </View>
              <View mt={6}>
              <Text accessibilityLabel={'title'} style={{ textAlign: !trimmedDesc ? 'center' : 'left' }} numberOfLines={1} fontSize={!trimmedDesc ? scaledFont(21) : scaledFont(19)} color={colorMode === 'light' ? DARK_COLOR : borderDarkColor} fontFamily={'heading'} fontWeight={'900'} pb={!trimmedDesc ? 0 : 1 } >{title.trim()}</Text>
              </View>



                {/* style={priority === 'confidential' ? colorMode === 'light' ? styles.lightNote : styles.darkNote : {}} */}
   

          {trimmedDesc && 
            <View flex={1} pointerEvents={'none'} accessibilityLabel={'description'}>
                <WebView
                    style={{ backgroundColor: 'transparent', opacity: priority === 'confidential' ? 0.03 : 1 }}
                    containerStyle={{  minHeight: scaledHeight(81), 
                      paddingBottom: Platform.OS === ANDROID ? scaledFont(12) : scaledFont(9) 
                    }}
                    cacheEnabled={true}
                    androidLayerType="software"
                    hideKeyboardAccessoryView={true}
                    keyboardDisplayRequiresUserAction={false}
                    originWhitelist={['*']}
                    dataDetectorTypes={'all'}
                    domStorageEnabled
                    javaScriptEnabled
                    scrollEnabled={false}
                    onMessage={(event) => {}}
                    source={{ html: htmlText, baseUrl: '' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    startInLoadingState={true}
                    renderLoading={() => (
                      <View style={styles.loadingView}>
                        <Spinner size={scaledFont(50)} type="Pulse" color={colorMode === 'light' ? "#c05eff" : "#cb7bff" } />
                      </View>
                    )}
                    />
                    </View>}


              </Box>   
        </TouchableOpacity>
 }

 const styles = StyleSheet.create({
  lightNote: {
    opacity: 0.03,
    textShadowColor: DARK_COLOR,
    textShadowOffset: {
      width: -5,
      height: 0,
    },
    textShadowRadius: 0.1,
  },
  darkNote: {
    opacity: 0.03,
    textShadowColor: LIGHT_COLOR,
    textShadowOffset: {
      width: -5,
      height: 0,
    },
    textShadowRadius: 0.1,
  },
  loadingView: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0, 
    right: 0,
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1
  },
});
 export default NoteList;
