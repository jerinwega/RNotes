/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, HStack, Box, Center, useColorMode, IconButton, View, useToast } from "native-base";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { DARK_COLOR, LIGHT_COLOR } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import moment from 'moment';
import DeleteAlert from "../components/common/DeleteAlert";
import Clipboard from '@react-native-clipboard/clipboard';
import StyledStatusBar from '../components/common/StyledStatusBar';
import { scaledFont } from '../components/common/Scale';
import { getDisabledBtnColor } from '../components/common/utils';
import Hyperlink from 'react-native-hyperlink';
import UrlAlert from '../components/common/UrlAlert';
import Share from 'react-native-share';
import RNBounceable from "@freakycoder/react-native-bounceable";
import DoubleClick from 'react-native-double-tap'

const ViewNotes = ({
  navigation,
  route
}) => { 
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();
  const { viewedNote } = get(route, 'params');
  const { editNote }  = get(route, 'params', false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [copyIconChange, setCopyIconChange] = useState(false);
  const [notes, setNotes] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [showUrlAlert, setShowUrlAlert] = useState(false);
  const [url, setUrl] = useState('');

  const cancelRef = useRef(null);
  const timerRef = useRef(null);

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

    const copyToClipboard = () => {
      setCopyIconChange(true);
    timerRef.current = setTimeout(() => {
        setCopyIconChange(false);
      }, 1500);

      const id = "single-toast";
      if (!toast.isActive(id)) {
      toast.show({
        id,
        title: get(viewedNote, 'description') ? 'Copied to clipboard' : 'Nothing to copy',
        placement: "bottom",
        duration: 1500,
        rounded: '3xl',
        bg: colorMode === 'light' ? get(viewedNote, 'description') ? 'blue.500': 'warning.500' : LIGHT_COLOR,
        _title: {
          px: 2,
          py: 1,
          fontFamily: 'mono',
          fontWeight: '900',
          fontSize: scaledFont(15),
          color: colorMode === 'light' ? LIGHT_COLOR : get(viewedNote, 'description') ? 'blue.500' : 'warning.500'
        }
      });
    }
      Clipboard.setString(get(viewedNote, 'description', ''));
    }

    handleUrlClick = (url) => {
      setUrl(url);
      setShowUrlAlert(true);
    }


    const handleShare = async () => {
      const shareOption = {
        message: `${viewedNote.title}\n${viewedNote.description}`,
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

        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: hashBgColor }}
              >
            <StyledStatusBar hashBgColor={hashBgColor}  />
            {/* <Box safeAreaTop /> */}
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
                  icon={<IonIcon style={{ marginLeft: 3 }} name="arrow-back-circle-outline" color={getDisabledBtnColor(colorMode, btnDisabled)} size={scaledFont(36)} />}
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
                  icon={<FontAwesome5Icon style={{ marginRight:3 }} color={'#2563eb' } name="share-alt" size={scaledFont(22)} solid />}
                  borderRadius="full"
                  onPress={handleShare}
                  />
              <IconButton 
                  px={3.5}
                  accessibilityLabel={'delete button'}
                  icon={<FontAwesome5Icon color={'#dc2626'} name="trash-alt" size={scaledFont(22)} solid />}
                  borderRadius="full"
                  onPress={() => setIsDeleteAlertOpen(true)}
                />
                <IconButton 
                  accessibilityLabel={'copy to clipboard button'}
                  borderRadius="full"
                  icon={copyIconChange ? <IonIcon name="copy" size={scaledFont(24)} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } />
                  : <IonIcon name="copy-outline" size={scaledFont(24)} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } />}
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
         
            <View pb={3} px={7}>
              <Hyperlink              
                onPress={(url)=> handleUrlClick(url)}
                linkStyle={styles.urlStyle}
              >
              <View>
              {get(viewedNote, 'title') ? <Text 
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
          <DoubleClick
            doubleTap={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: notes, editNote: editNote })}
            delay={300}
            >
              <View px={8} pb={2}>     
                <Hyperlink
                  onPress={(url)=> handleUrlClick(url)}
                  linkStyle={styles.urlStyle}
                >
                <View>
                {get(viewedNote, 'description') ? <Text 
                    accessibilityLabel='note description'
                    selectable 
                    selectionColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)'}
                    fontSize={scaledFont(20)} 
                    fontFamily={'body'}
                    fontWeight={'600'}>             
                        {get(viewedNote, 'description', '')}
                  </Text> 
                  :
                  
                  <Text color={colorMode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'} 
                      fontSize={scaledFont(20)} 
                      fontFamily={'body'}
                      fontWeight={'600'}
                  >
                    No Description
                  </Text> }
                </View>
                </Hyperlink>
              </View>
              </DoubleClick>

              <RNBounceable  
                bounceEffectIn={0.6}
                style={[styles.editIcon, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}]} 
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
              isView
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
  scrollButton: {
    position: 'absolute',                                          
    bottom: 150,                                                    
    right: 24,
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    width: scaledFont(38),
    height: scaledFont(38),
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
    textDecorationLine: 'underline',
  }
 });
export default ViewNotes;