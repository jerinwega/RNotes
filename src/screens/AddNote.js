import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { HStack, Divider, Select, Box, Center, useColorMode, IconButton, TextArea, Input, View, KeyboardAvoidingView, ScrollView } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { DARK_COLOR, LIGHT_COLOR, ANDROID } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import useGoBackHandler from '../components/common/CrossSwipeHandler';
import StyledStatusBar from '../components/common/StyledStatusBar';
import { scaledFont, scaledHeight, scaledWidth } from '../components/common/Scale';
import { getDisabledBtnColor, useDebounce } from '../components/common/utils';
import InfoModal from '../components/common/InfoModal';
import Editor from '../components/views/Editor';
import Editor2 from '../components/views/Editor2'


const AddNote = ({
  navigation,
  route
}) => { 
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();

  const [priority, setPriority] = useState('low');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [openInfo, setOpenInfo] = useState(false)


  const { isEdit } = get(route, 'params');
  const { viewedNote } = get(route, 'params');
  const { editNote } = get(route, 'params');
  const { data } = get(route, 'params');


  const { debounce } = useDebounce();

  
  useEffect(() => {
    if (isEdit) {
      setTitle(viewedNote.title);
      setDescription(viewedNote.description)
      setPriority(viewedNote.priority)
    }
  }, [])

  useGoBackHandler(() => {
    debounce(handleSubmit);
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
    setBtnDisabled(true);
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
        navigation.navigate('ViewNotes', { viewedNote: viewedNote });
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
      navigation.navigate('ViewNotes', { viewedNote: newViewedNote, editNote: !editNote });
      setBtnDisabled(false);
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
        navigation.navigate('Home', { allNotes, saveNote: true });
        setBtnDisabled(false);
    }
  }

  let startEndIconColor = '#16a34a';
  let startEndIconColorLight = '#bbf7d0'
    if (priority === 'medium') {
      startEndIconColor = '#ca8a04';
      startEndIconColorLight = '#fef08a';
    } else if (priority === 'high') {
      startEndIconColor = '#dc2626';
      startEndIconColorLight = '#fecaca';
    } else if (priority === 'confidential') {
      startEndIconColor = '#2563eb';
      startEndIconColorLight = '#bfdbfe';
    }
   
        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: LIGHT_COLOR }}
              >
            <StyledStatusBar />
            {/* <Box safeAreaTop /> */}
              <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="2" py={2} justifyContent="space-between" alignItems="center" style={{ width: deviceWidth }}>
              <HStack>
              <IconButton 
                  accessibilityLabel={'back button'}
                  disabled={btnDisabled}
                  icon={<IonIcon style={{ marginLeft: 3 }} name="arrow-back-circle-outline" color={getDisabledBtnColor(colorMode, btnDisabled)} size={scaledFont(34)} />}
                  borderRadius="full"
                  onPress={() => debounce(handleSubmit)}
                  />  
              </HStack>
            <HStack>
                <Select 
                accessibilityLabel="Select Priority"
                accessibilityHint="select from dropdown"
                _customDropdownIconProps={{
                  color: startEndIconColor,
                  size: 5
                }}
                selectedValue={priority} 
                minW={scaledWidth(150)}
                h={scaledFont(36)}
                textAlign={'center'}
                fontFamily={'mono'}
                fontWeight={'900'}
                fontSize={scaledFont(15 - get(priority, 'length', 0) * 0.3)}
                _selectedItem={{
                    rounded: '2xl',
                    background: colorMode === 'light' ? startEndIconColorLight : startEndIconColor,
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
                  py: 3,
                  _text: {
                    fontSize: scaledFont(15),
                    fontFamily: 'mono',
                    fontWeight: '900',
                    color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR
                  }
                }}
                variant="rounded"
              >
                  <Select.Item  alignItems={'center'} rounded={'2xl'} label="CONFIDENTIAL" value="confidential"/>
                  <Select.Item  alignItems={'center'} rounded={'2xl'} label="HIGH" value="high"/>
                  <Select.Item  alignItems={'center'} rounded={'2xl'} label=" MEDIUM" value="medium" />
                  <Select.Item  alignItems={'center'} rounded={'2xl'} label=" LOW" value="low" />
                  </Select>
            </HStack>
            <HStack>
            <IconButton 
            accessibilityLabel={'information button'}
              opacity={0.6}
                  icon={<EntypoIcon name="info-with-circle" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(22)} />}
                  borderRadius="full" 
                  onPress={() => {
                    Keyboard.dismiss();
                    setOpenInfo(true);
                  }}

                  />
            </HStack>
            <HStack>
              <IconButton 
              accessibilityLabel={'submit button'}
                 disabled={btnDisabled}
                  icon={<IonIcon style={{ marginLeft: 3 }} name="checkmark-circle-outline" color={getDisabledBtnColor(colorMode, btnDisabled)} size={scaledFont(33)} />}
                  borderRadius="full"
                  onPress={() => debounce(handleSubmit)}
                  />
            </HStack>
            </HStack>
          </Center>

            <View style={{ elevation: 5 }}>
              <Divider shadow={2} style={{ shadowColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }} />
            </View>

            <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR, paddingTop: 20 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <Box mx={5} pb={3}>
              <Input
                py={3}
                px={4}
                fontSize={scaledFont(24)}
                fontFamily={'heading'}
                fontWeight={'900'}
                spellCheck={false}
                autoFocus={false}
                value={title} 
                rounded={'3xl'}
                placeholder="Title"
                accessibilityRole={'none'}
                accessibilityLabel={"Title Field"}
                accessibilityHint={"Add Title for the note"}                
                color={startEndIconColor}
                onChangeText={(text) => handleChange(text, 'title')}
                _focus={{ selectionColor: Platform.OS === ANDROID ? colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)' : startEndIconColor }} 
                _dark={{ bg: 'black' }}
                _light={{ bg: 'white' }} 
              />
              </Box>
              </TouchableWithoutFeedback>


              {/* <KeyboardAvoidingView 
                flex={1}
                behavior={Platform.OS === ANDROID ? "height" : "padding" }
                keyboardVerticalOffset={scaledHeight(120)}
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
                  spellCheck={false}
                  autoFocus={false}
                  autoCapitalize={'none'}
                  fontFamily={'body'}
                  fontWeight={'600'}
                  fontSize={scaledFont(20)} 
                  rounded={'3xl'}
                  px={4} 
                  py={4}
                  accessibilityRole={'none'}
                  accessibilityLabel={"Description Field"}
                  accessibilityHint={"Add Description"}
                  placeholder="ideas"
                  _focus={{ selectionColor: Platform.OS === ANDROID ? colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)' : colorMode === 'light' ? 'black': 'white' }} 
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
              
              </KeyboardAvoidingView> */}
                          <Editor />

                         {/* <Editor2 /> */}

              </View>

          {openInfo ? <InfoModal 
            showInfoModal={openInfo}
            handleClose={() => { 
              setOpenInfo(false); 
            }}
          /> : null}
          </View>
        ); 
    }
export default AddNote;