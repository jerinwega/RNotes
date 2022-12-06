/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { Text, HStack, Box, StatusBar, Center, useColorMode, IconButton, View, ScrollView } from "native-base";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { DARK_COLOR, FONT, LIGHT_COLOR } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import moment from 'moment';
import DeleteAlert from "../components/common/DeleteAlert";
import DoubleClick from 'react-native-double-tap'


const ViewNotes = ({
  navigation,
  route
}) => { 
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();
  const { viewedNote } = get(route, 'params');
  const { allNotes } = get(route, 'params');

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelRef = useRef(null);

    const onDeleteAlertClose = () => {
      setIsDeleteAlertOpen(false);
    }

    const handleDeleteAlert = async () => {
      const newNotes = allNotes.filter(item => item.id !== get(viewedNote, 'id'));
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setIsDeleteAlertOpen(false);
      navigation.navigate('Home', { allNotes: newNotes })
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
            <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
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
                  onPress={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: allNotes })}
                  />
            </HStack>
            </HStack>
          </Center>

          
            <View pt={6} pb={4} px={6} bg={colorMode === 'light' ? 'white' : 'black'}>
              <Text opacity={0.6} mb={4} textAlign={'right'} fontFamily={FONT.family} fontWeight={FONT.semibold} fontSize={14}>             
                {`${get(viewedNote, 'edited', false) ? "Updated At": "Created At"} : ${moment(get(viewedNote, 'time', '')).format('DD/MM/YYYY - hh:mm A')}`}
              </Text>
              <Text color={startEndIconColor}fontFamily={FONT.family} fontWeight={FONT.bold} fontSize={30}>             
                {get(viewedNote, 'title', '')}
              </Text>
            </View>
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} indicatorStyle={colorMode === 'light' ? 'black' : 'white'} bg={colorMode === 'light' ? 'white' : 'black'}>
            <DoubleClick
              doubleTap={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: allNotes })}
              delay={300}
              >
              <View px={7} flex={1} pb={4}>
                <Text fontFamily={FONT.family} fontWeight={FONT.semibold} fontSize={22}>             
                  {get(viewedNote, 'description', '')}
                </Text>
              </View>
              </DoubleClick>

            </ScrollView>

            <DeleteAlert 
              isDeleteAlertOpen={isDeleteAlertOpen} 
              cancelRef={cancelRef}
              handleDeleteAlert={handleDeleteAlert}
              onDeleteAlertClose={onDeleteAlertClose} 
          />
          </View>
        ); 
    }
export default ViewNotes;