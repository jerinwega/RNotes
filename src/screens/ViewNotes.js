/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, HStack, Box, Center, useColorMode, IconButton, View, ScrollView, Input, Icon, useToast } from "native-base";
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

const ViewNotes = ({
  navigation,
  route
}) => { 
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();
  const { viewedNote } = get(route, 'params');

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [copyIconChange, setCopyIconChange] = useState(false);
  const [notes, setNotes] = useState([]);

  const cancelRef = useRef(null);
  const timerRef = useRef(null);
  const toast = useToast();

    useEffect(() => {
      findNotes();
      return () => clearTimeout(timerRef.current);
    }, []);

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
      navigation.navigate('Home', { allNotes: newNotes })
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
        title: "Copied to clipboard",
        placement: "bottom",
        duration: 1500,
        rounded: '3xl',
        bg: 'blue.500',
        _title: {
          px: 2,
          py: 1,
          fontFamily: 'mono',
          fontWeight: '900',
          fontSize: scaledFont(14)
        }
      });
    }
      Clipboard.setString(get(viewedNote, 'description', ''));
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
    }

        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: hashBgColor }}
              >
            <StyledStatusBar hashBgColor={hashBgColor}  />
            <Box safeAreaTop />
              <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: hashBgColor }}  px="2" py="2" 
              justifyContent="space-between" 
              alignItems={'center'}
              style={{ width: deviceWidth }}
              borderBottomWidth={3}
              borderBottomColor={colorMode === 'light' ? borderColor : startEndIconColor}
              >
            <HStack>
              <IconButton 
                  icon={<IonIcon name="arrow-back-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(36)} />}
                  borderRadius="full"
                  onPress={() => navigation.goBack()}
                  />  
            </HStack>
            <HStack space={4}>
              <IconButton 
                  icon={<FontAwesome5Icon color={'#dc2626'} name="trash-alt" size={scaledFont(22)} solid />}
                  borderRadius="full"
                  onPress={() => setIsDeleteAlertOpen(true)}
                  />
              <IconButton 
                  icon={<FontAwesome5Icon name="pen-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} solid size={scaledFont(22)} />}
                  borderRadius="full"
                  onPress={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: notes })}
                  />
            </HStack>
            </HStack>
          </Center>

          <View bg={colorMode === 'light' ? 'white' : 'black'} flex={1}>
          <View pt={5} pr={5}>
              <Text opacity={0.7} mb={3} textAlign={'right'} fontFamily={'mono'} fontWeight={'600'} fontSize={scaledFont(14)}>             
                {`${get(viewedNote, 'edited', false) ? "Updated At": "Created At"} :  ${moment(get(viewedNote, 'time', '')).format('DD/MM/YYYY - hh:mm A')}`}
              </Text>
          </View>
            <View pb={2} px={Platform.OS === ANDROID ? 7 : 5}>
           {Platform.OS === ANDROID ?  
           <Text 
            selectable 
            selectionColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)'}
            color={startEndIconColor} 
            fontSize={scaledFont(30)} 
            fontFamily={'heading'}
            fontWeight={'900'}>             
                {get(viewedNote, 'title', '')}
              </Text> 
           : <Input
                editable={false}
                multiline
                variant={'unstyled'}
                fontSize={scaledFont(30)}
                fontFamily={'heading'}
                fontWeight={'900'}
                value={get(viewedNote, 'title', '')} 
                color={startEndIconColor}
              />
           }
          </View>
            <ScrollView bounces contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
              <View px={Platform.OS === ANDROID ? 8 : 6} pb={2}>

              {Platform.OS === ANDROID ?  
           <Text 
            selectable 
            selectionColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)'}
            fontSize={scaledFont(20)} 
            fontFamily={'body'}
            fontWeight={'600'}>             
                {get(viewedNote, 'description', '')}
              </Text> 
           : <Input
              scrollEnabled={false}
              editable={false}
              multiline
              variant={'unstyled'}
              fontSize={scaledFont(22)}
              fontFamily={'body'}
              fontWeight={'600'}
              value={get(viewedNote, 'description', '')} 
         />
              }

    
              </View>
            </ScrollView>
            <IconButton 
              variant={'ghost'}
              _dark={{ bg: LIGHT_COLOR }}
              _light={{ bg: DARK_COLOR }}
              _pressed={{
              _dark: { bg: LIGHT_COLOR, opacity: 0.8 },
              _light: { bg: DARK_COLOR, opacity: 0.8 }
            }}
              rounded={'full'}
              style={styles.clipBoard}
              icon={copyIconChange ? <Icon textAlign={'center'} as={IonIcon} name="copy" size={scaledFont(22)} color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
              : <Icon textAlign={'center'} as={IonIcon} name="copy-outline" size={scaledFont(22)} color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />}
              onPress={copyToClipboard}
          />
            </View>
            <DeleteAlert 
              isDeleteAlertOpen={isDeleteAlertOpen} 
              cancelRef={cancelRef}
              handleDeleteAlert={handleDeleteAlert}
              onDeleteAlertClose={onDeleteAlertClose} 
              isView
          />
          </View>
        ); 
    }

 const styles = StyleSheet.create({
  clipBoard: {
    elevation: 3,
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',                                          
    bottom: 20,                                                    
    right: 15,
  },
 });
export default ViewNotes;