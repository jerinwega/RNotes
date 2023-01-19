import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Platform, StyleSheet } from 'react-native';
import { HStack, Divider, Select, Box, Center, useColorMode, IconButton, Input, View, KeyboardAvoidingView, ScrollView } from "native-base";
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { DARK_COLOR, LIGHT_COLOR, ANDROID } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import useGoBackHandler from '../components/common/CrossSwipeHandler';
import StyledStatusBar from '../components/common/StyledStatusBar';
import { scaledFont, scaledWidth, scaledHeight } from '../components/common/Scale';
import { getDisabledBtnColor, useDebounce } from '../components/common/utils';
import InfoModal from '../components/common/InfoModal';
import customRichDocumentFont from '../utils/stylesheet';


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
  const [showToolbar, setShowToolbar] = useState(false);


  const { isEdit } = get(route, 'params');
  const { viewedNote } = get(route, 'params');
  const { editNote } = get(route, 'params');
  const { data } = get(route, 'params');

  const richText = useRef(null);
  const scrollRef = useRef(null);
  const titleRef = useRef(null);

  const { debounce } = useDebounce();

  
  useEffect(() => {
    if (isEdit) {
      setTitle(viewedNote.title);
      setDescription(viewedNote.description)
      setPriority(viewedNote.priority)
    }   
    return () => clearTimeout(titleRef.current);
  }, [])

  // useEffect(() => {
  //   setTitleFocused(true);
  //   if (!title.trim()) {
  //     setTimeout(() => {
  //       titleRef.current?.focus();
  //     },800)
  //   }
  // }, [title])




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
      navigation.goBack();
      return;
    }

    const replaceHTML = description.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

      if (!title.trim() && replaceWhiteSpace.length <= 0) {
        navigation.goBack();
        return;
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

    let handleCursorPosition = useCallback((scrollY) => {
      // Positioning scroll bar
      scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
  }, []);


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
                onTouchStart={() => setShowToolbar(false)}
                ref={titleRef}
                blurOnSubmit={false}
                py={3}
                px={4}
                fontSize={scaledFont(24)}
                fontFamily={'heading'}
                fontWeight={'900'}
                spellCheck={false}
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

             <KeyboardAvoidingView 
                  enabled={showToolbar}
                  flex={1}
                  behavior={Platform.OS === ANDROID ? "height" : "padding" }
                  keyboardVerticalOffset={scaledHeight(120)}
                >
                    <ScrollView 
                    flex={1} 
                    ref={scrollRef}
                    contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled
                    bounces={false}
                    keyboardShouldPersistTaps="always" 
                    showsVerticalScrollIndicator={false}
                    mx={5}
                    >
                    <RichEditor
                      onFocus={() => setShowToolbar(true)}
                        // androidLayerType="software"
                        androidHardwareAccelerationDisabled={true}
                        accessibilityRole={'none'}
                        accessibilityLabel={"Description Field"}
                        accessibilityHint={"Add Description"}
                        showsVerticalScrollIndicator={false}
                        editorStyle={{
                            caretColor: colorMode === 'light' ? 'black': 'white',
                            backgroundColor: colorMode === 'light' ? 'white' : 'black' , 
                            color: colorMode ==='light' ? DARK_COLOR : LIGHT_COLOR,
                            placeholderColor: colorMode === 'light' ? '#a3a3a3' : '#525252',
                            initialCSSText: `${customRichDocumentFont}`,
                            contentCSSText:`
                                padding: 14px; 
                                font-family: 'Lato';
                                font-size: ${scaledFont(20)}px !important;
                                `,
                        }}
                        style={{flex: 1, borderRadius: 20, opacity: 1 }}
                        ref={richText}
                        placeholder={"ideas"}
                        pasteAsPlainText={true}
                        initialFocus={false}
                        useContainer={true}
                        onCursorPosition={handleCursorPosition}
                        containerStyle={{
                            borderRadius: 20, 
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            borderBottomWidth: 0,
                            backgroundColor: colorMode === 'light' ? 'white' : 'black', 
                            borderWidth: 1,
                            borderColor: colorMode === 'light' ? '#d4d4d4' : '#404040',
                            }}
                        initialContentHTML={description}
                        onChange={(text) => handleChange(text, 'description')}
                    />
                </ScrollView>
                <RichToolbar
                    editor={richText}
                    disabled={!showToolbar}
                    disabledIconTint ={colorMode === 'light' ? '#a3a3a3' : '#525252'}
                    selectedIconTint={colorMode === 'light' ? '#cb7bff' : '#c05eff'}
                    iconTint={colorMode=== 'light' ? DARK_COLOR : LIGHT_COLOR }
                    iconSize={scaledFont(22)}
                    flatContainerStyle={{ paddingHorizontal: 6 }}
                    actions={[
                    // actions.insertImage,
                    actions.setBold,
                    // actions.setItalic,
                    actions.setUnderline,
                    actions.setStrikethrough,
                    // actions.undo,
                    // actions.redo,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    // actions.checkboxList,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    // actions.keyboard,
                    ]}
                    style={[
                        styles.richTextToolbarStyle, { 
                        height: scaledHeight(48), 
                        backgroundColor: colorMode=== 'light' ? LIGHT_COLOR : DARK_COLOR, 
                        borderColor: colorMode==='light' ? '#d4d4d4' : '#404040'}
                    ]}
                />

                </KeyboardAvoidingView>
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

    const styles = StyleSheet.create({
      richTextToolbarStyle: {
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderWidth: 1,
          marginHorizontal: 20,
          marginBottom: 20,
        },
    });

export default AddNote;