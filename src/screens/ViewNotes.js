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
import { DARK_COLOR, LIGHT_COLOR } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import moment from 'moment';
import DeleteAlert from "../components/common/DeleteAlert";
import Clipboard from '@react-native-clipboard/clipboard';
import StyledStatusBar from '../components/common/StyledStatusBar';

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
          fontSize: 16
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
                  icon={<IonIcon name="arrow-back-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={36} />}
                  borderRadius="full"
                  onPress={() => navigation.goBack()}
                  />  
            </HStack>
            <HStack space={4}>
              <IconButton 
                  icon={<FontAwesome5Icon color={'#dc2626'} name="trash-alt" size={24} solid />}
                  borderRadius="full"
                  onPress={() => setIsDeleteAlertOpen(true)}
                  />
              <IconButton 
                  icon={<FontAwesome5Icon name="pen-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} solid size={24} />}
                  borderRadius="full"
                  onPress={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: notes })}
                  />
            </HStack>
            </HStack>
          </Center>

          <View bg={colorMode === 'light' ? 'white' : 'black'} flex={1}>
          <View pt={5} pr={5}>
              <Text opacity={0.6} mb={4} textAlign={'right'} fontFamily={'mono'} fontWeight={'600'} fontSize={14}>             
                {`${get(viewedNote, 'edited', false) ? "Updated At": "Created At"} :  ${moment(get(viewedNote, 'time', '')).format('DD/MM/YYYY - hh:mm A')}`}
              </Text>
          </View>
            <View pb={2} px={5}>
              <Input
                multiline={true}
                variant={'unstyled'}
                isDisabled={true}
                _disabled={{ opacity: 1 }}
                fontSize={'30'}
                fontFamily={'heading'}
                fontWeight={'900'}
                value={get(viewedNote, 'title', '')} 
                color={startEndIconColor}
                _focus={{ selectionColor: startEndIconColor }} 
              />
          </View>
            
            <ScrollView bounces flex={1} contentContainerStyle={{ flexGrow: 1 }} indicatorStyle={colorMode === 'light' ? 'black' : 'white'} >
              <View px={5} pb={2}>
                <Input
                  scrollEnabled={false}
                  multiline={true}
                  variant={'unstyled'}
                  isDisabled={true}
                  _disabled={{ opacity: 1 }}
                  fontSize={'22'}
                  fontFamily={'body'}
                  fontWeight={'600'}
                  value={get(viewedNote, 'description', '')} 
                  _focus={{ selectionColor: colorMode === 'light' ? 'black' : 'white' }} 
                />
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
              icon={copyIconChange ? <Icon textAlign={'center'} as={IonIcon} name="copy" size={25} color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
              : <Icon textAlign={'center'} as={IonIcon} name="copy-outline" size={25} color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />}
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