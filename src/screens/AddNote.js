import React, { useEffect, useState } from 'react';
import { View, TextInput, Dimensions, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
import { Text, HStack, Heading, Divider, Select, Box, StatusBar, Center, useColorMode, IconButton, TextArea, Input } from "native-base";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { DARK_COLOR, LIGHT_COLOR } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';


const AddNote = ({
  navigation,
  route
}) => { 
  const { notes } = get(route, 'params');
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();

  const [priority, setPriority] = useState('low');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const { viewedNote } = get(route, 'params');
  const { isEdit } = get(route, 'params');
  const { data } = get(route, 'params');

  useEffect(() => {
    if (isEdit) {
      setTitle(viewedNote.title);
      setDescription(viewedNote.description)
      setPriority(viewedNote.priority)
    }
  }, [])


  const handleChange = (value, name) => {
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'description') {
      setDescription(value)
    }
    if (name === 'priority') {
      setPriority(value)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() && !description.trim()) {
      navigation.navigate('Home');
      return;
    }

    const sameNote = (data || []).some(item => item.id === viewedNote.id)

    if (sameNote && viewedNote.title === title && viewedNote.description === description && viewedNote.priority === priority) {
      navigation.navigate('Home');
      return;
    }

    const note = {
      id: Date.now(),
      title,
      description,
      priority,
      time: Date.now()
    }  
    
    const editedNote = {
      id: Date.now(),
      title,
      description,
      priority,
      time: Date.now(),
      edited: true
    } 
    if (isEdit) {
       const  allNotes = [...data, editedNote];
        await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
        navigation.navigate('Home', { allNotes })
        setTitle('')
        setDescription('')
        setPriority('low')
    } else {
      const allNotes = [...notes, note];
      await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
      navigation.navigate('Home', { allNotes })
      setTitle('')
      setDescription('')
      setPriority('low')
    }
  }

  let startEndIconColor = '#16a34a';
    if (priority === 'medium') {
      startEndIconColor = '#ca8a04';
    } else if (priority === 'high') {
      startEndIconColor = '#dc2626';
    }
   
        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: LIGHT_COLOR }}
              >
            <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
            <Box safeAreaTop />
              <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="2" py="2" justifyContent="space-between" alignItems="center" style={{ width: deviceWidth }}>
              <HStack>
              <IconButton 
                  icon={<IonIcon name="arrow-back-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={36} />}
                  borderRadius="full"
                  onPress={handleSubmit}
                  />  
              </HStack>
              <HStack>
                <Select 
                selectedValue={priority} 
                minWidth="150" 
                textAlign={'center'}
                fontWeight={'900'}
                fontFamily= {'Lato-Regular'}
                fontSize={18}
                _selectedItem={{
                    startIcon: <FontAwesome5Icon size={16} name="angle-double-right" style={{ paddingTop: 6 }} solid color={startEndIconColor} />,
                    endIcon: <FontAwesome5Icon size={16} name="angle-double-left" style={{ paddingTop: 6 }} solid color={startEndIconColor} />,
                }}
                _light={{
                  bg: "white",
                }} 
                _dark={{
                  bg: "black",
                }}
                borderColor={startEndIconColor}
                onValueChange={itemValue => handleChange(itemValue, 'priority')}
                color={startEndIconColor}
                _item={{
                  _text: {
                    fontSize: 18,
                    fontWeight: '900',
                    fontFamily: 'Lato-Regular',
                    color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR
                  }
                }}
                variant="rounded"
              >
                  <Select.Item alignItems={'center'} label="HIGH" value="high"/>
                  <Select.Item alignItems={'center'} label=" MEDIUM" value="medium" />
                  <Select.Item alignItems={'center'} label=" LOW" value="low" />
                  </Select>
            </HStack>
            <HStack>
              <IconButton 
                  icon={<IonIcon name="checkmark-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={36} />}
                  borderRadius="full"
                  onPress={handleSubmit}
                  />
            </HStack>
            </HStack>
          </Center>

            <View style={{
              shadowColor: DARK_COLOR,
              shadowOpacity: 0.5,
              shadowRadius: 1,
              shadowOffset: {
                height: 1,
                width: 1
              } }}>
              <Divider />
            </View>

            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? 'white' : 'black', paddingTop: 24 }}>
              <Box mx={8}>
              <Input
                fontSize={'24'}
                fontFamily={'Lato-Regular'}
                autoCorrect={false}
                autoFocus={false}
                value={title} 
                fontWeight={'900'} 
                textAlign={'center'} 
                rounded={'2xl'}
                placeholder="Title" 
                onChangeText={(text) => handleChange(text, 'title')}
                _focus={{ selectionColor: colorMode === 'light' ? 'black': 'white' }} 
                _dark={{ bg: DARK_COLOR }}
                _light={{ bg: LIGHT_COLOR }} 
              />
              </Box>
              <Box mx={8} py={6}>
                <TextArea 
                  autoCorrect={false} 
                  autoFocus={false}
                  autoCapitalize={'none'}
                  fontFamily={'Lato-Regular'}
                  fontWeight={'bold'} 
                  fontSize={'20'} 
                  rounded={'2xl'}
                  px={3} 
                  py={3} 
                  h={'xl'} 
                  placeholder="ideas..."
                  _focus={{ selectionColor: colorMode === 'light' ? 'black': 'white' }} 
                  _light={{
                      bg: LIGHT_COLOR,
                    }} 
                  _dark={{
                      bg: DARK_COLOR,
                    }} 
                  value={description} 
                  onChangeText={(text) => handleChange(text, 'description')}
                />
              </Box>
              </View>
          </TouchableWithoutFeedback>
          </View>
        ); 
    }
export default AddNote;