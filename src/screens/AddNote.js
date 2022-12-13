import React, { useEffect, useState, useRef } from 'react';
import { TextInput, Dimensions, TouchableWithoutFeedback, StyleSheet, Keyboard, Platform } from 'react-native';
import { Text, HStack, Heading, Divider, Select, Box, StatusBar, Center, useColorMode, IconButton, TextArea, Input, View, KeyboardAvoidingView, ScrollView } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { DARK_COLOR, LIGHT_COLOR, ANDROID } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import useGoBackHandler from '../components/common/CrossSwipeHandler';


const AddNote = ({
  navigation,
  route
}) => { 
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();

  const [priority, setPriority] = useState('low');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const { isEdit } = get(route, 'params');
  const { viewedNote } = get(route, 'params');
  const { data } = get(route, 'params');

  const nextRef = useRef();
  
  useEffect(() => {
    if (isEdit) {
      setTitle(viewedNote.title);
      setDescription(viewedNote.description)
      setPriority(viewedNote.priority)
    }
  }, [])

  useGoBackHandler(() => {
      handleSubmit();
      return true;
  }, []);


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
        if (isEdit) {
          navigation.navigate('ViewNotes');
          return;
        } else {
        navigation.navigate('Home');
        return;
      }
    }
    
    if (isEdit) {
      const sameNote = (data || []).some(item => item.id === get(viewedNote, 'id'))
      if (sameNote && get(viewedNote, 'title') === title && get(viewedNote, 'description') === description && get(viewedNote, 'priority') === priority) {
        navigation.navigate('ViewNotes', { viewedNote: viewedNote , allNotes: data });
        return;
      }
      const editedNotes = (data || []).filter(item => {
        if (item.id === get(viewedNote, 'id')) {
          item.title = title
          item.description = description
          item.time = Date.now()
          item.priority = priority
          item.edited = true
        }
        return item;
      });
      const newViewedNote = editedNotes.find(item => item.id === get(viewedNote, 'id'));
      await AsyncStorage.setItem('notes', JSON.stringify(editedNotes));
      navigation.navigate('ViewNotes', { viewedNote: newViewedNote , allNotes: editedNotes });
    } else {
      let notes = [];
      const result = await AsyncStorage.getItem('notes');
      if (result !== null) {
        notes = JSON.parse(result);
      }
        const note = {
          id: Date.now(),
          title,
          description,
          priority,
          time: Date.now()
        }  
        const allNotes = [...notes, note];
        await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
        navigation.navigate('Home', { allNotes })
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
           {Platform.OS !== ANDROID && <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />}
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
                _customDropdownIconProps={{
                  color: startEndIconColor,
                  size: 5
                }}
                selectedValue={priority} 
                minWidth="150" 
                textAlign={'center'}
                fontFamily={'mono'}
                fontWeight={'900'}
                fontSize={18}
                _selectedItem={{
                    background: startEndIconColor,
                }}
                _light={{
                  bg: "white",
                }} 
                _dark={{
                  bg: "black",
                }}
                borderColor={startEndIconColor}
                borderWidth={2}
                onValueChange={itemValue => handleChange(itemValue, 'priority')}
                color={startEndIconColor}
                _item={{
                  _text: {
                    fontSize: 18,
                    fontFamily: 'mono',
                    fontWeight: '900',
                    color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR
                  }
                }}
                variant="rounded"
              >
                  <Select.Item  alignItems={'center'} label="HIGH" value="high"/>
                  <Select.Item  alignItems={'center'} label=" MEDIUM" value="medium" />
                  <Select.Item  alignItems={'center'} label=" LOW" value="low" />
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
              elevation: 5,
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
            <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR, paddingTop: 20 }}>
              <Box mx={5} pb={2}>
              <Input
                py={3}
                fontSize={'26'}
                fontFamily={'heading'}
                fontWeight={'900'}
                autoCorrect={false}
                autoFocus={false}
                value={title} 
                textAlign={'center'}
                rounded={'3xl'}
                placeholder="Title"
                color={startEndIconColor}
                onChangeText={(text) => handleChange(text, 'title')}
                _focus={{ selectionColor: startEndIconColor }} 
                _dark={{ bg: 'black' }}
                _light={{ bg: 'white' }} 
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  nextRef.current.focus();
                }}
                blurOnSubmit={false}
              />
              </Box>
              <KeyboardAvoidingView 
                flex={1} 
                behavior={Platform.OS === ANDROID ? "height" : "padding" }
                keyboardVerticalOffset={120}
              >
              <ScrollView 
                flex={1} 
                bounces 
                keyboardShouldPersistTaps="handled" 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                mx={5} pb={5} pt={2}>
                <TextArea 
                  flex={1}
                  autoCorrect={false} 
                  autoFocus={false}
                  autoCapitalize={'none'}
                  fontFamily={'body'}
                  fontWeight={'600'}
                  fontSize={'22'} 
                  rounded={'3xl'}
                  px={4} 
                  py={4} 
                  placeholder="ideas..."
                  _focus={{ selectionColor: colorMode === 'light' ? 'black': 'white' }} 
                  _light={{
                      bg: 'white',
                    }} 
                  _dark={{
                      bg: 'black',
                    }} 
                  value={description} 
                  onChangeText={(text) => handleChange(text, 'description')}
                  ref={nextRef}
                />
              </ScrollView>
              </KeyboardAvoidingView>
              </View>
          </TouchableWithoutFeedback>
          </View>
        ); 
    }
export default AddNote;