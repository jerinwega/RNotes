/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState, useRef, useCallback } from "react";
 import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, RefreshControl, Platform, Animated } from "react-native";
 import { 
  useColorMode, HStack, Center, Avatar, Button, Box, IconButton, Text, Modal, FormControl,
  Divider, Input, Icon, Menu, FlatList, View, useToast
} from "native-base";
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
import { get, orderBy, debounce } from 'lodash';
import { LIGHT_COLOR, DARK_COLOR, ANDROID } from '../utils/constants';
import SearchBar from "react-native-dynamic-search-bar";
import RNBounceable from "@freakycoder/react-native-bounceable";
import NoteList from '../components/views/NoteList';
import NotFound from "../components/views/NotFound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StyledStatusBar from "../components/common/StyledStatusBar";
import { scaledFont, scaledHeight, scaledWidth } from '../components/common/Scale'
import DeleteAlert from "../components/common/DeleteAlert";
import Share from 'react-native-share';
import HeartModal from '../components/common/HeartModal';
import moment from "moment";
import { isSameDayAndMonth, removeEmojis } from '../components/common/utils';
import {
  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide'

 const HomeScreen = ({ route, navigation, user, onClose, hasNotes }) => {

  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode, toggleColorMode } = useColorMode();
  const { allNotes } = get(route, 'params', []);
  const { saveNote } = get(route, 'params', false);
  const { deleteNote } = get(route, 'params', false);
  const { isEmptyBack } = get(route, 'params', false);
  const [sortBy, setSort] = useState('desc')
  const [search, setSearch] = useState('')
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [greet, setGreet] = useState('');
  const [notes, setNotes] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState('');
  const [refreshState, setRefreshState] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteNoteToast, setDeleteNoteToast] = useState(false);  
  const [openHeart, setOpenHeart] = useState(false);  
  const [firstLaunch, setFirstLaunch] = useState(false);
  const [priority, setPriority] = useState('none');

  const saveToast = useToast();
  const deleteToast = useToast();
  const shareToast = useToast();
  const cancelRef = useRef(null);
  const anim = useRef(new Animated.Value(0));
  const animLove = useRef(new Animated.Value(0));

  const {
    canStart, // a boolean indicate if you can start tour guide
    start, // a function to start the tourguide
    eventEmitter, // an object for listening some events
    tourKey
  } = useTourGuideController()

  useEffect(() => { 
    findDayTimeGreet();  
    setTour();
  }, [])

  const setTour = async () => {
    try {
      const result = await AsyncStorage.getItem('tourLaunched')
        if (result !== null) {
          setFirstLaunch(false);
        }
        if (result === null) {
          setFirstLaunch(true);
          await AsyncStorage.setItem('tourLaunched', 'true');
        } 
    } catch(e) {
      setFirstLaunch(false);
    }
  }

  useEffect(() => {
    if (canStart) {
      setFirstLaunch(true);
      start();    
    }
  }, [canStart])

  useEffect(() => {
    if (!get(notes, 'length') && !isEmptyBack) {
      setFirstLaunch(true);
      setPriority('none')
      start();
    }
  }, [notes]) 

  useEffect(() => {
    eventEmitter.on("start", () => {
    });
    eventEmitter.on("stop", () => {
      setFirstLaunch(false);
    });
    return () => eventEmitter.off("*", null);
  }, []);


  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      findNotes();
      setSort('desc');
      setPriority('none');
    });
    return unsubscribe;
  }, [navigation])


  useEffect(() => {
    if (allNotes) {
      setNotes(allNotes);
      setSearch('')
      Keyboard.dismiss();
      setSearchNotFound(false);
    }
    if (saveNote) {
      setSort('desc');
      const id = "saveToast";
      if (!saveToast.isActive(id)) {
        saveToast.show({
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
    if (deleteNote) {
      setSort('desc');
      const id = "deleteToast";
      if (!deleteToast.isActive(id)) {
        deleteToast.show({
          id,
          title: "Deleted",
          placement: "bottom",
          duration: 1500,
          rounded: '3xl',
          bg: colorMode === 'light' ? 'error.500' : LIGHT_COLOR,
          _title: {
            px: 6,
            py: 0,
            fontFamily: 'mono',
            fontWeight: '900',
            fontSize: scaledFont(15),
            color: colorMode === 'light' ? LIGHT_COLOR : "error.600"
          }
        });
      }
    }
  }, [allNotes]);

  useEffect(() => {
    if (deleteNoteToast) {
      const id = "deleteToast";
      if (!deleteToast.isActive(id)) {
        deleteToast.show({
          id,
          title: "Deleted",
          placement: "bottom",
          duration: 1500,
          rounded: '3xl',
          bg: colorMode === 'light' ? 'error.500' : LIGHT_COLOR,
          _title: {
            px: 6,
            py: 0,
            fontFamily: 'mono',
            fontWeight: '900',
            fontSize: scaledFont(15),
            color: colorMode === 'light' ? LIGHT_COLOR : "error.600"
          }
        });
      }
    }
  }, [deleteNoteToast])

  const findDayTimeGreet = () => {
    let newGreet = '';
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) {
      newGreet = 'Morning'
    }  else if (hrs === 12 || hrs < 17) {
      newGreet = 'Afternoon'
    } else {
      newGreet = 'Evening'
    }
    if (newGreet) {
      setGreet(newGreet);
    }
  }

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result))
    }
  }

  const handleSort = () => {
      setSearchNotFound(false);
      setSearch('');
      Keyboard.dismiss();
    if (!get(notes, 'length')) {
      setFirstLaunch(true);
      start();
     return;
    }
    if (sortBy === 'desc') {
      setSort('asc');
    } else {
      setSort('desc');
    }
  }

  const handleSearch = async (text) => {
    setSearch(text);
    setPriority('none');
    setSelectedItems([]);
    const refresh = await AsyncStorage.getItem('notes');
    const refreshNotes = JSON.parse(refresh);

    if (!text.trim()) {
      setSearch('')
      setSearchNotFound(false);
      return await findNotes();
    }
    
    if (get(refreshNotes, 'length')) {
      const searchResults = (refreshNotes || []).filter(note => {

        const formatedDate = moment(get(note, 'time')).format('DD MMM YYYY');

        if (get(note, 'title').toLowerCase().includes(text.toLowerCase()) 
        || get(note, 'description').toLowerCase().includes(text.toLowerCase())
        || formatedDate.toLowerCase().includes(text.toLowerCase())) {
          return note;
        }
      });
      if (get(searchResults, 'length')) {
        setSearchNotFound(false);
        setNotes([...searchResults]);
      } 
      else {
        setSearchNotFound(true);
      }
    } else {
      setSearchNotFound(true);
    }
  }

 
  const handleEditName = async () => {
    if (!updatedUser || updatedUser === user) {
      setUpdatedUser(user);
      setShowUserModal(false);
      return;
    } else {
    Keyboard.dismiss();
    setShowUserModal(false);
    await AsyncStorage.setItem('user', updatedUser);
    onClose();
    }
  }

  const handleCloseUserModal = () => {
    setUpdatedUser(user);
    setShowUserModal(false);
  }


  const avatar = updatedUser.trim().toUpperCase();

  const sortedNotes = (notes) => {
    return orderBy(notes, ['time'], [sortBy])
  }

  const handlePriority = async (priority) => {
      setSearch('');
      setPriority(priority);
    if (!get(notes, 'length')) {
      setFirstLaunch(true);
      setPriority('none');
      start();
      return;
     }

    let prorityNotes = [];

      switch(priority) {
        case 'confidential': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
          break;
        }
        case 'high': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
          break;
        }
        case 'medium': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
          break;
        }
        case 'low': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
          break;
        }
      }
    
    if (get(prorityNotes, 'length')) {
      setNotes([...prorityNotes]);
    } else {
      setSearchNotFound(true);
    }
}

const handleClearSearch = async () => {
  Keyboard.dismiss();
  setPriority('none');
  setSearch('')
  setSort('desc');
  setSearchNotFound(false);
  return await findNotes();
}


const onRefresh = async () => {
  setRefreshState(true);
  setSearch('');
  setPriority('none');
  setSearchNotFound(false);
  setSort('desc');
  Keyboard.dismiss();
  await findNotes();
  setRefreshState(false);
}

const selectNotes = (note) => {
  shake();
  Keyboard.dismiss();
  if (selectedItems.includes(note.id)) {
    const newNoteSelected = selectedItems.filter(noteID => noteID !== note.id);
    return setSelectedItems(newNoteSelected);
  }
  setSelectedItems([...selectedItems, note.id])
}

const handleNotePress = (note) => {
  Keyboard.dismiss();
   if (get(selectedItems, 'length')) {
    return selectNotes(note);
  } else {
    setSearch('');
    navigation.navigate('ViewNotes', { viewedNote: note })
  }
}

  const getSelectedNote = (note) => selectedItems.includes(note.id);


  const onDeleteAlertClose = () => {
    setIsDeleteAlertOpen(false);
    setSelectedItems([]);
  }


  const handleDeleteMultipleNotes = async () => {
    let refreshNotes = [];
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      refreshNotes = JSON.parse(result);
    }
      const newNotes = refreshNotes.filter(item => !selectedItems.includes(item.id));
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);

      setDeleteNoteToast(true);
      setIsDeleteAlertOpen(false);
      setSelectedItems([]);
  }

  const handleShare = async () => {
    const selectedNote = notes.find(item => item.id === selectedItems[0]);
    const shareOption = {
      message: `${selectedNote.title}\n${selectedNote.description}`,
      excludedActivityTypes: [
        'com.apple.UIKit.activity.AirDrop',
        'com.apple.UIKit.activity.Print',
      ]
    };
  try {
    const shareResponse = await Share.open(shareOption);

    if (get(shareResponse, 'success')) {
      setSelectedItems([]);
    } else {
      setSelectedItems([]);
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
    } catch(err) {
      err && console.log(err);      
      setSelectedItems([]);
    }
  }

  const shake = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true
        }),
        // shift element to the right by 2 units
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true
        }),
        // bring the element back to its original position
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start();
  }, []);

  const shakeHeart = useCallback(() => {
    // makes the sequence loop
    Animated.loop(
      // runs the animation array in sequence
      Animated.sequence([
        // shift element to the left by 2 units
        Animated.timing(animLove.current, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true
        }),
        // shift element to the right by 2 units
        Animated.timing(animLove.current, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true
        }),
        // bring the element back to its original position
        Animated.timing(animLove.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        }),
      ]),
      // loops the above animation config 2 times
      { iterations: 2 }
    ).start();
  }, []);


  let homeFabStyle = '';
  
  if (colorMode === 'light') {
    if (get(selectedItems, 'length')) {
      homeFabStyle = 'red';
    } else {
      homeFabStyle = DARK_COLOR;
    }
  } else {
      homeFabStyle = LIGHT_COLOR;
  }

  const today = moment(moment().format('YYYY-MM-DD'));
  const bday = moment('1997-10-25');
  const aday = moment('2022-09-18');
  const birthdayCheck = isSameDayAndMonth(today, bday);
  const anniversaryCheck = isSameDayAndMonth(today, aday);


  const conditionsForLove = (updatedUser.trim().toLowerCase() === 'ja'
  || updatedUser.trim().toLowerCase() === 'rani'
  || updatedUser.trim().toLowerCase() === 'rani varghese'
  || updatedUser.trim().toLowerCase() === 'ponnu')
  && (birthdayCheck || anniversaryCheck);



  let priorityIcon = <IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(22)} />;
  switch(priority) {
    case 'confidential': {
      priorityIcon = <FontAwesome5Icon name="circle" solid size={scaledFont(22)} color={'#2563eb'} />
      break;
    }
    case 'high': {
      priorityIcon = <FontAwesome5Icon name="circle" solid size={scaledFont(22)} color={'#dc2626'} />
      break;
    }
    case 'medium': {
      priorityIcon = <FontAwesome5Icon name="circle" solid size={scaledFont(22)} color={'#ca8a04'} />
      break;
    }
    case 'low': {
      priorityIcon = <FontAwesome5Icon name="circle" solid size={scaledFont(22)} color={'#16a34a'} />
      break;
    }
    default: {
      priorityIcon = <IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(22)} />

    }
  }


  return (
    <View style={{ width: deviceWidth, flex: 1 }}>
    <Center
      _dark={{ bg: DARK_COLOR }}
      _light={{ bg: LIGHT_COLOR }}
      >
    <StyledStatusBar />
    <Box safeAreaTop />
    <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="3" py="3" justifyContent={'space-between'} alignItems="center" style={{ width: deviceWidth }}>
      <HStack>
      <RNBounceable bounceEffectIn={0.8} onPress={() => {
        setShowUserModal(true)
        setSelectedItems([]);
      }}>
        <Avatar
          _dark={{ bg: LIGHT_COLOR }}
          _light={{ bg: DARK_COLOR }}
          style={{ width: Platform.OS === ANDROID ? scaledFont(50): scaledFont(52), height: Platform.OS === ANDROID ? scaledFont(50): scaledFont(52) }}
        >
          <Avatar.Badge bg="green.500" size={3} />
         <Text fontFamily={'heading'} fontWeight={'900'} color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } fontSize={scaledFont(30)}>
          {avatar.slice(0,1)}
        </Text>
        </Avatar>
        </RNBounceable>
      </HStack>
        <HStack>
          <Text color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize={scaledFont(40)} fontFamily = 'ChocoChici'>
            RNotes
          </Text>
        </HStack>
        <HStack>
          <IconButton
          accessibilityLabel={'Switch color mode button'}
          accessibilityHint="Theme Change"
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={scaledFont(22)} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={scaledFont(21)} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
          <Menu
          accessibilityLabel="priority menu"
          accessibilityHint="sort by priority"
          w={scaledWidth(90)}
          placement={'bottom'} 
          rounded={'3xl'}
          pb={0}
          pt={0}
          _backdrop={{ 
            _dark: {
              bg: 'gray.900'
            },
            _light: {
              bg: 'dark.200'
            }
            }}
            onOpen={async () => {
              setPriority('none');
              setSearchNotFound(false);
              setSelectedItems([]);
              setSearch('');
              Keyboard.dismiss();
              if(get(notes, 'length')) {
                await findNotes();
              }
            }}
            trigger={
              triggerProps => {
            return <IconButton {...triggerProps}
                  accessibilityLabel={'Priority sort button'}
                  icon={priorityIcon}
                  borderRadius="full"
              />;
          }}>
              <Menu.Group pb={1} _title={{ fontFamily: 'mono', fontWeight: '900' }} title="Priority" m={'auto'}>
                <Menu.Item py={3} accessibilityLabel={'option confidential'} onPress={() => handlePriority('confidential')} alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={scaledFont(22)} color="blue.600" /></Menu.Item>
                <Menu.Item py={3} accessibilityLabel={'option high'}onPress={() => handlePriority('high')} alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={scaledFont(22)} color="red.600" /></Menu.Item>
                <Menu.Item py={3} accessibilityLabel={'option medium'}onPress={() => handlePriority('medium')} alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={scaledFont(22)} color="yellow.600" /></Menu.Item>
                <Menu.Item py={3}accessibilityLabel={'option low'} borderBottomLeftRadius={'3xl'} borderBottomRightRadius={'3xl'}  onPress={() => handlePriority('low')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={scaledFont(22)} color="green.600" /></Menu.Item>
              </Menu.Group>
            </Menu>
          <IconButton 
          accessibilityLabel={'date sort button'}
          accessibilityHint="sort"
          icon={sortBy === 'desc' ? 
          <FontAwesome5Icon name="sort-amount-up-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(20)} solid /> 
          : <FontAwesome5Icon name="sort-amount-down" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(20)} solid /> } 
          borderRadius="full"
          onPress={handleSort}
          />
        </HStack>
    </HStack>
  </Center>
  
  <View accessibilityLabel={'Divider'}>
    <Divider shadow={2} style={{ shadowColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }} />
  </View>

    <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR }}>
        <Text px={4} py={5} numberOfLines={1} textAlign={'center'} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize={scaledFont(18)} fontFamily={'body'} fontWeight={'600'} fontStyle={'italic'}>
          {`Good ${greet}, `}
          <Text color={colorMode === 'light' ? '#c05eff' : '#cb7bff'}>{updatedUser.replace(/[\n\r]+/g, ' ').trim()}!</Text>
        </Text>


        {get(notes, 'length') ?  
        <SearchBar
          clearIconComponent={!search ? <></> : null}
          style={[Platform.OS === ANDROID && styles.androidSearchShadow, { width: deviceWidth - 30, height: scaledHeight(38), borderRadius: 20, backgroundColor: colorMode === 'light' ? 'white' : 'black' }]}
          darkMode={colorMode === 'dark'}
          fontSize={scaledFont(16)}
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
          onClearPress={handleClearSearch}
          accessibilityLabel="Search"
          accessibilityHint="Search Notes"
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize={'none'}
          selectionColor={colorMode === 'light' ? 'black': 'white'}
          textInputStyle={{ fontFamily: 'Lato-Bold' }}
          searchIconImageStyle={{ width: scaledWidth(16), height: scaledHeight(16) }}
          clearIconImageStyle={{ width: scaledWidth(14), height: scaledHeight(14) }}
        />  : null}

      {get(notes, 'length') ?
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss()
          setSelectedItems([]);
        }}>
        {searchNotFound ? <NotFound onRefresh={onRefresh} refreshState={refreshState} handleClearSearch={handleClearSearch} /> 
        : ( 
        <View flex={1} px={4} py={6} accessibilityLabel={'Notes'} accessibilityHint={'Note List'}>
        <FlatList
              refreshControl={(
                <RefreshControl
                  refreshing={refreshState}
                  onRefresh={onRefresh}
                  tintColor={colorMode=== 'light' ? DARK_COLOR : LIGHT_COLOR}
                />
              )}
              showsVerticalScrollIndicator={false}
              data={sortedNotes(notes)} 
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              keyExtractor={item => { 
                const key = item.id;
                return key.toString()
              }}
              renderItem={({item}) => 
              <NoteList 
                onPress={() => handleNotePress(item)}
                onLongPress={() => selectNotes(item)} 
                item={item} 
                navigation={navigation} 
                selected={getSelectedNote(item)}
              />
            }
          />
          </View>
          )
        }
      </TouchableWithoutFeedback>
      : null }  
       
      <Animated.View style={[styles.fabView, { transform: [{ translateX: anim.current }] } ]}>
      <RNBounceable  
        bounceEffectIn={0.6}
        style={[styles.fab, { backgroundColor: homeFabStyle }]} 
        onPress={() => {
          if (get(selectedItems, 'length')) {
            return (
              setIsDeleteAlertOpen(true),
              setDeleteNoteToast(false)
            )
          }
          navigation.navigate('AddNote', { isEdit: false })
        }}
      >
      {get(selectedItems, 'length') ? 
          <FontAwesome5Icon color={colorMode === 'light' ? LIGHT_COLOR :'red'} name="trash-alt" size={scaledFont(34)} solid />
          :  
          <FontAwesome5Icon solid size={scaledFont(34)} name="plus" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } /> }
      </ RNBounceable>
      </Animated.View> 

      {get(selectedItems, 'length') === 1 ? 
        <RNBounceable  
          bounceEffectIn={0.6}
          style={[ styles.share, { backgroundColor: colorMode === 'light' ? '#2563eb' : LIGHT_COLOR } ]} 
          onPress={handleShare}
        >
           <FontAwesome5Icon style={{ marginRight: 3 }} color={colorMode === 'light' ? LIGHT_COLOR : '#2563eb' } name="share-alt" size={scaledFont(23)} solid />
        </ RNBounceable>
      : null }

      {conditionsForLove ? 
    <Animated.View style={[styles.loveView, { transform: [{ translateX: animLove.current }] } ]}>
       <RNBounceable  
          bounceEffectIn={0.6}
          style={[ styles.love, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
          onPress={() => {
            shakeHeart();
            setOpenHeart(true);
          }}
        >
        <FontAwesome5Icon style={{ marginTop: 4 }} color={'red'} name="heart" size={scaledFont(19)} solid />
     </ RNBounceable>
     </Animated.View> 
      : null }
    </View>
    
    {showUserModal ? <Modal 
      shadow={4} 
      size={'md'}
      isOpen={showUserModal} 
      onClose={handleCloseUserModal} 
      _backdrop={{
        _dark: {
          bg: 'gray.900'
        },
        _light: {
          bg: 'dark.200'
        }
      }}
      style={{ elevation : 5 }}
    >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Modal.Content borderRadius={'3xl'} borderWidth={1} borderColor={colorMode === 'light' ? 'rgba(0, 0, 0, 0.01)' : 'rgba(255,255,255, 0.1)'}>
          <Modal.CloseButton 
            accessibilityLabel="Close Button"
            accessibilityHint="Close Modal"
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
            <Modal.Header>
              <FontAwesome5Icon name="user-edit" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={scaledFont(21)} solid /> 
          </Modal.Header>
          <Modal.Body>
          <FormControl px={1}>
              <Input
                rounded={'3xl'}
                textAlign={'center'}
                multiline
                fontSize={scaledFont(22)}
                fontFamily={'mono'}
                fontWeight={'900'}
                spellCheck={false}
                autoFocus={true}
                value={updatedUser}
                accessibilityLabel={'Edit Name'}
                accessibilityHint="Edit Name Field"
                onChangeText={(value) => setUpdatedUser(removeEmojis(value))}
                placeholder="Name"
                color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
                _focus={{ selectionColor: Platform.OS === ANDROID ? colorMode === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255,255,255, 0.2)' : colorMode === 'light' ? 'black': 'white' }} 
                _dark={{ bg: 'black' }}
                _light={{ bg: 'white' }} 
              />
            </FormControl>
          </Modal.Body>
              <Button
                py={4}
                width={'full'}
                variant="ghost" 
                onPress={handleEditName}
                borderRadius={'none'}
              >
              <Text fontFamily={'mono'} color={'green.500'} fontSize={scaledFont(14)} fontWeight={'900'}>
                SAVE        
              </Text>
              </Button>
        </Modal.Content>
        </TouchableWithoutFeedback>
      </Modal> : null}
      {isDeleteAlertOpen ? <DeleteAlert 
        isDeleteAlertOpen={isDeleteAlertOpen} 
        cancelRef={cancelRef}
        handleDeleteAlert={handleDeleteMultipleNotes}
        onDeleteAlertClose={onDeleteAlertClose} 
      /> : null}

      {openHeart ? <HeartModal 
        showHeartModal={openHeart}
        handleClose={() => { 
          setOpenHeart(false); 
        }}
      /> : null}

  {firstLaunch ? <TourGuideZone
        zone={1}
        tourKey={tourKey}
        shape={'circle'}
        isTourGuide
        style={styles.tourGuideOverlay}
      /> : null}
  </View>
  )
 }

 const styles = StyleSheet.create({
  fabView: {
    zIndex: 1,
    width:scaledFont(60),
    height: scaledFont(60),
    position: 'absolute',                                          
    bottom: 35,                                                    
    right: 20,
  },
  tourGuideOverlay: {
    zIndex: 1,
    width:scaledFont(81),
    height: scaledFont(81),
    position: 'absolute',                                          
    bottom: 24,                                                    
    right: 9,
  },
  fab: {
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    width:scaledFont(60),
    height: scaledFont(60),
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
  share: {
    zIndex: 1,
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    width:scaledFont(44),
    height: scaledFont(44),
    position: 'absolute',                                          
    bottom: 35,                                                    
    right: 100,
    borderRadius:100,
    shadowColor: DARK_COLOR,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  loveView: {
    zIndex: 1,
    width:scaledFont(38),
    height: scaledFont(38),
    position: 'absolute',                                          
    bottom: 35,                                                    
    left: 20,
  },
  love: {
    zIndex: 1,
    elevation: 5,
    width:scaledFont(38),
    height: scaledFont(38),
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    shadowColor: DARK_COLOR,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  androidSearchShadow: {
    elevation: 5,
    shadowColor: DARK_COLOR,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: {
      height: 0,
      width: 0
    }
  }
 });

 export default HomeScreen;