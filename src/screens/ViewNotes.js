/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import { Text, HStack, Box, Center, useColorMode, IconButton, useToast, View, Divider } from "native-base";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { ANDROID, DARK_COLOR, LIGHT_COLOR } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import moment from 'moment';
import DeleteAlert from "../components/common/DeleteAlert";
import Clipboard from '@react-native-clipboard/clipboard';
import StyledStatusBar from '../components/common/StyledStatusBar';
import { scaledFont } from '../components/common/Scale';
import { getDisabledBtnColor, convertHTMLtoPlainText } from '../components/common/utils';
import Hyperlink from 'react-native-hyperlink';
import UrlAlert from '../components/common/UrlAlert';
import Share from 'react-native-share';
import RNBounceable from "@freakycoder/react-native-bounceable";
import DoubleClick from 'react-native-double-tap'
import { WebView } from 'react-native-webview';
import Autolinker from 'autolinker';
import Spinner from "react-native-spinkit";



const ViewNotes = ({
  navigation,
  route,
}) => { 
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();
  const { viewedNote } = get(route, 'params');
  const { editNote }  = get(route, 'params', false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [showUrlAlert, setShowUrlAlert] = useState(false);
  const [url, setUrl] = useState('');

  const cancelRef = useRef(null);
  const timerRef = useRef(null);
  const webViewRef = useRef(null);

  const toast = useToast();
  const editToast = useToast();
  const shareToast = useToast();

    useEffect(() => {
      findNotes();
      return () => clearTimeout(timerRef.current);
    }, []);


    useEffect(() => {
      if (typeof editNote === 'boolean') {
        const id = "editToast";
        if (!editToast.isActive(id)) {
          editToast.show({
            id,
            title: "Saved",
            placement: "bottom",
            duration: 1500,
            rounded: '3xl',
            bg: colorMode === 'light' ? 'success.500' : LIGHT_COLOR,
            _title: {
              px: 6,
              py: 0,
              fontFamily: 'mono',
              fontWeight: '900',
              fontSize: scaledFont(15),
              color: colorMode === 'light' ? LIGHT_COLOR : "success.600"
            }
          });
        }
      }
    }, [editNote])

    const findNotes = async () => {
      const result = await AsyncStorage.getItem('notes');
      if (result !== null) setNotes(JSON.parse(result))
    }

    const onDeleteAlertClose = () => {
      setIsDeleteAlertOpen(false);
    }

    const handleDeleteAlert = async () => {
      const newNotes = notes.filter(item => item.id !== get(viewedNote, 'id'));
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setIsDeleteAlertOpen(false);
      navigation.navigate('Home', { allNotes: newNotes, deleteNote: true })
    }

    const convertedDesc = convertHTMLtoPlainText(get(viewedNote, 'description'));


    const copyToClipboard = () => {

      const id = "single-toast";
      if (!toast.isActive(id)) {
      toast.show({
        id,
        title: 'Copied to clipboard',
        placement: "bottom",
        duration: 1500,
        rounded: '3xl',
        bg: colorMode === 'light' ? 'blue.500': LIGHT_COLOR,
        _title: {
          px: 2,
          py: 1,
          fontFamily: 'mono',
          fontWeight: '900',
          fontSize: scaledFont(15),
          color: colorMode === 'light' ? LIGHT_COLOR : 'blue.500'
        }
      });
    }
      Clipboard.setString(`${get(viewedNote, 'title', '')}\n${convertedDesc}`);
    }

    handleUrlClick = (url) => {
      setUrl(url);
      setShowUrlAlert(true);
    }


    const handleShare = async () => {

      const shareOption = {
        message: `${viewedNote.title}\n${convertedDesc}`,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.AirDrop',
          'com.apple.UIKit.activity.Print',
        ]
      };
      await Share.open(shareOption)
      .then((res) => {
        if (!get(res, 'success')) {
          const id = "shareToast";
          if (!shareToast.isActive(id)) {
            shareToast.show({
              id,
              title: "Unable to Share",
              placement: "bottom",
              duration: 1500,
              rounded: '3xl',
              bg: colorMode === 'light' ? 'warning.500' : LIGHT_COLOR,
              _title: {
                px: 6,
                py: 0,
                fontFamily: 'mono',
                fontWeight: '900',
                fontSize: scaledFont(15),
                color: colorMode === 'light' ? LIGHT_COLOR : "warning.500"
              }
            });
        }
      }
      })
      .catch((err) => {
        err && console.log(err);
      });
    }


    let startEndIconColor = '#16a34a';
    let hashBgColor = '#dcfce7';
    let borderColor = 'green.200';
    if (get(viewedNote, 'priority') === 'medium') {
        startEndIconColor = '#ca8a04';
        hashBgColor = '#fef9c3';
        borderColor = 'yellow.200';
    } else if (get(viewedNote, 'priority') === 'high') {
        startEndIconColor = '#dc2626';
        hashBgColor = '#fee2e2'
        borderColor = 'red.200';
    } else if (get(viewedNote, 'priority') === 'confidential') {
        startEndIconColor = '#2563eb';
        hashBgColor = '#dbeafe'
        borderColor = 'blue.200';
    }
    

    const autoLinkedText = Autolinker.link(get(viewedNote, 'description', ''));

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
      font-size: ${scaledFont(20)};
      color: ${colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR};
      line-height: 28px;
      font-family: 'Lato-Regular';
      word-break: break-all; 
      word-wrap: break-word;
      overflow-x: auto;
      margin: 0;
      padding: 0;
    }
    ::selection { background: ${colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)'}; color: ${colorMode === 'light' ? 'black' : 'white'};
</style>`

const htmlText = `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">${css}</head><body>${autoLinkedText}</body></html>`;

        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: hashBgColor }}
              >
            <StyledStatusBar hashBgColor={hashBgColor}  />
              <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: hashBgColor }}  px={2} py={2}
              justifyContent="space-between" 
              alignItems={'center'}
              style={{ width: deviceWidth }}
              borderBottomWidth={3}
              borderBottomColor={colorMode === 'light' ? borderColor : startEndIconColor}
              >
            <HStack>
              <IconButton 
                accessibilityLabel={'Back button'}
                  disabled={btnDisabled}
                  icon={<IonIcon style={{ marginLeft: 3 }} name="arrow-back-circle-outline" color={getDisabledBtnColor(colorMode, btnDisabled)} size={scaledFont(35)} />}
                  borderRadius="full"
                  onPress={async () => {
                     setBtnDisabled(true);
                     if (navigation.canGoBack()) {
                      await navigation.goBack()
                     } else {
                        await navigation.navigate('Home')
                      }
                    setBtnDisabled(false); 
                  }}
                  />  
            </HStack>
            <HStack space={4}>
              <IconButton 
                  px={3}
                accessibilityLabel={'share button'}
                  icon={<FontAwesome5Icon style={{ marginRight:3 }} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } name="share-alt" size={scaledFont(21)} solid />}
                  borderRadius="full"
                  onPress={handleShare}
                  />
              <IconButton 
                  px={3.5}
                  accessibilityLabel={'delete button'}
                  icon={<FontAwesome5Icon color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } name="trash-alt" size={scaledFont(21)} solid />}
                  borderRadius="full"
                  onPress={() => setIsDeleteAlertOpen(true)}
                />
                <IconButton 
                  accessibilityLabel={'copy to clipboard button'}
                  borderRadius="full"
                  icon={<IonIcon name="copy" size={scaledFont(24)} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } />}
                  onPress={copyToClipboard}
                />
            </HStack>
            </HStack>
          </Center>
          
          <View bg={colorMode === 'light' ? 'white' : 'black'} flex={1}>
          
          <View pt={5} pr={5}>
              <Text opacity={0.7} mb={3} textAlign={'right'} fontFamily={'mono'} fontWeight={'600'} fontSize={scaledFont(13)}>             
                {`${get(viewedNote, 'edited', false) ? "Updated At": "Created At"} :  ${moment(get(viewedNote, 'time', '')).format('DD/MM/YYYY - hh:mm A')}`}
              </Text>
          </View>
         
            <View py={3} px={7}>
              <Hyperlink              
                onPress={(url)=> handleUrlClick(url)}
                linkStyle={styles.urlStyle}
              >
              <View>
              {get(viewedNote, 'title').trim() !== '' ? <Text 
                   accessibilityLabel='note title'
                  selectable 
                  selectionColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)'}
                  color={startEndIconColor} 
                  fontSize={scaledFont(24)} 
                  fontFamily={'heading'}
                  fontWeight={'900'}>             
                  {get(viewedNote, 'title', '')}
                  </Text> 
                  : 
                  <Text color={colorMode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}  
                    fontSize={scaledFont(24)} 
                    fontFamily={'heading'}
                    fontWeight={'900'}
                  >
                    No Title
                  </Text>
                  }
              </View>
              </Hyperlink>
          </View>
          <View accessibilityLabel={'Divider'} style={{
              elevation: 5 }}>
            <Divider shadow={2} style={{ shadowColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }} />
          </View>
          <DoubleClick
            doubleTap={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: notes, editNote: editNote })}
            delay={400}
            >
              <View flex={1} px={7} py={4} accessibilityLabel={'note description'}>     
                {get(viewedNote, 'description').trim() !== '' ?
                <WebView
                  ref={webViewRef}
                   style={{ backgroundColor: 'transparent', flex: 1}}
                    cacheEnabled={true}
                    useWebKit={true}
                    androidLayerType="software"
                    hideKeyboardAccessoryView={true}
                    keyboardDisplayRequiresUserAction={false}
                    originWhitelist={['*']}
                    dataDetectorTypes={'all'}
                    domStorageEnabled
                    javaScriptEnabled
                    onMessage={(event) => {}}
                    source={{ html: htmlText, baseUrl: '' }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    allowsLinkPreview={true}
                    startInLoadingState={true}
                    geolocationEnabled
                    setSupportMultipleWindows={false}
                    renderLoading={() => (
                      <View style={styles.loadingView}> 
                        <Spinner size={scaledFont(140)} type="Pulse" color={colorMode === 'light' ? "#c05eff" : "#cb7bff" } />
                      </View>
                    )}
                    onShouldStartLoadWithRequest={(request) => {
                        // Only allow navigating within this website
                        if (!request.url ||
                          request.url.startsWith("/") ||
                          request.url.startsWith("#") ||
                          request.url.startsWith("javascript") ||
                          request.url.startsWith("about:blank")
                        ) {
                          return true;
                        }
                        // blocked blobs
                        if(request.url.startsWith("blob")){
                          // Alert.alert("Link cannot be opened.");
                          webViewRef.current.stopLoading();
                          handleUrlClick(request.url);
                        }
                        // list of schemas we will allow the webview
                        // to open natively
                        if (request.url.startsWith("tel:") ||
                          request.url.startsWith("mailto:") ||
                          request.url.startsWith("maps:") ||
                          request.url.startsWith("geo:") ||
                          request.url.startsWith("sms:") ||
                          request.url.startsWith('http')
                          || request.navigationType === 'click'
                          ){
                            webViewRef.current.stopLoading();
                            handleUrlClick(request.url);
                          return false;
                        }
                        else if(Platform.OS === ANDROID) {
                        // let everything handled through linking to the webview
                          webViewRef.current.stopLoading();
                          handleUrlClick(request.url);
                         return false; 
                        } else {
                        // let everything handled through linking to the webview
                        return true;   
                        }         
                      }}
                      onError={({nativeEvent}) => {
                        // Function that is invoked when the WebView load fails.
                          // Fallback for links without target="_blank"
                          webViewRef.current.stopLoading();
                          webViewRef.current.goBack();
                          handleUrlClick(nativeEvent.url);
                          return false; 
                     }}

                />
                  :
                  <Text color={colorMode === 'light' ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.09)'} 
                      fontSize={scaledFont(20)} 
                      fontFamily={'body'}
                      fontWeight={'600'}
                  >
                    No Description
                  </Text> }
              </View>
              </DoubleClick>

              <RNBounceable  
                bounceEffectIn={0.6}
                style={[styles.editIcon, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }]} 
                onPress={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: notes, editNote: editNote })}  
              >
                <FontAwesome5Icon name="pen-alt" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR} solid size={scaledFont(26)} />
              </ RNBounceable>
            </View>
            
            {isDeleteAlertOpen ? <DeleteAlert 
              isDeleteAlertOpen={isDeleteAlertOpen} 
              cancelRef={cancelRef}
              handleDeleteAlert={handleDeleteAlert}
              onDeleteAlertClose={onDeleteAlertClose} 
          /> : null}
          {showUrlAlert ? <UrlAlert 
              showUrl={showUrlAlert}
              handleClose={() => { 
                setShowUrlAlert(false); 
                setUrl('');
              }}
              url={url}
          /> : null}
          </View> 
        ); 
    }

 const styles = StyleSheet.create({
  editIcon: {
    position: 'absolute',   
    bottom: 80,                                                    
    right: 15,
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    width: scaledFont(54),
    height: scaledFont(54),
    borderRadius:100,
    shadowColor: DARK_COLOR,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  zIndex: 1,
  },
  urlStyle: {
    color: '#41B2F3',
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
export default ViewNotes;


