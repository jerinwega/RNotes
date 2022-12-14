/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState, useRef } from "react";
 import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, RefreshControl, Platform } from "react-native";
 import { 
  useColorMode, HStack, Center, Avatar, Button, 
  StatusBar, Box, IconButton, Text, Modal, FormControl,
  Divider, Input, Icon, Menu, FlatList, View, Alert, VStack, Heading, CloseIcon, Pressable
} from "native-base";
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
import { get, orderBy } from 'lodash';
import { LIGHT_COLOR, DARK_COLOR, ANDROID } from '../utils/constants';
import SearchBar from "react-native-dynamic-search-bar";
import RNBounceable from "@freakycoder/react-native-bounceable";
 import SkeletonLoader from '../components/common/SkeletonLoader'
 import NoteList from '../components/views/NoteList';
 import NotFound from "../components/views/NotFound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteAlert from "../components/common/NoteAlert";
import StyledStatusBar from "../components/common/StyledStatusBar";

 const HomeScreen = ({ route, navigation, user, onClose }) => {

  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode, toggleColorMode } = useColorMode();
  const { allNotes } = get(route, 'params', []);

  const [sortBy, setSort] = useState('desc')
  const [search, setSearch] = useState('')
  const [spinner, setSpinner] = useState(false);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [greet, setGreet] = useState('');
  const [notes, setNotes] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState('');
  const [refreshState, setRefreshState] = useState(false);
  const [showNoteAlert, setShowNoteAlert] = useState(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);
  
  useEffect(() => {
    findDayTimeGreet();  
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      findNotes();
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
  }, [allNotes])

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
    if (result !== null) setNotes(JSON.parse(result))
  }

  const handleSort = () => {
      setSearchNotFound(false);
      setSearch('');
      Keyboard.dismiss();
    if (!get(notes, 'length')) {
      setShowNoteAlert(true);
     return;
    }
    if (sortBy === 'desc') {
      setSort('asc');
    } else {
      setSort('desc');
    }
  }

  const handleSearch = async (text) => {
    setSpinner(true);
    setSearch(text);

    const refresh = await AsyncStorage.getItem('notes');
    const refreshNotes = JSON.parse(refresh);

    if (!text.trim()) {
      setSearch('')
      setSpinner(false);
      setSearchNotFound(false);
      return await findNotes();
    }
    
    if (get(refreshNotes, 'length')) {
      const searchResults = (refreshNotes || []).filter(note => {
        if (get(note, 'title').toLowerCase().includes(text.toLowerCase()) 
        || get(note, 'description').toLowerCase().includes(text.toLowerCase())) {
          return note;
        }
      });
      if (get(searchResults, 'length')) {
        setSpinner(false);
        setSearchNotFound(false);
        setNotes([...searchResults]);
      } 
      else {
        setSpinner(false);
        setSearchNotFound(true);
      }
    } else {
      setSpinner(false);
      setSearchNotFound(true);
    }
  }

  const handleClearSearch = async () => {
    Keyboard.dismiss();
    setSpinner(false);
    setSearch('')
    setSearchNotFound(false);
    return await findNotes();
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

  const avatar = updatedUser.split(/\s/).reduce((response,word)=> response+word.slice(0,1), '').toUpperCase();

  const sortedNotes = (notes) => {
    return orderBy(notes, ['time'], [sortBy])
  }

  const handlePriority = async (priority) => {
      setSearch('');
    if (!get(notes, 'length')) {
      setShowNoteAlert(true);
      return;
     }

    let prorityNotes = [];
      switch(priority) {
        case 'high': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
        }
        case 'medium': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
        }
        case 'low': {
          prorityNotes = (notes || []).filter(note => note.priority === priority);
        }
      }
    
    if (get(prorityNotes, 'length')) {
      setNotes([...prorityNotes]);
    } else {
      setSearchNotFound(true);
    }
}

const onRefresh = async () => {
  setRefreshState(true);
  setSearch('');
  Keyboard.dismiss();
  await findNotes();
  setRefreshState(false);
}


  return (
    <View style={{ width: deviceWidth, flex: 1 }}>
    <Center
      _dark={{ bg: DARK_COLOR }}
      _light={{ bg: LIGHT_COLOR }}
      >
    <StyledStatusBar />
    <Box safeAreaTop />
    <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="3" py="3" justifyContent="space-between" style={{ width: deviceWidth }}>
      <HStack>
      <RNBounceable bounceEffectIn={0.8} onPress={() => setShowUserModal(true)}>
        <Avatar 
        _dark={{ bg: LIGHT_COLOR }}
        _light={{ bg: DARK_COLOR }}
          style={{ height: 64, width: 64 }}
        >
          <Avatar.Badge bg="green.500" />
         <Text fontFamily={'heading'} fontWeight={'900'} color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } fontSize={'36'}>
          {avatar.substring(0,2)}
        </Text>
        </Avatar>
        </RNBounceable>
      </HStack>
        <HStack>
          <Text color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize="40" fontFamily = 'ChocoChici'>
            RNotes
          </Text>
        </HStack>
        <HStack alignItems={'center'}>
          <IconButton 
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={25} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={25} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
          <Menu
          w="24" 
          placement={'bottom'} 
          rounded={'3xl'}
          _backdrop={{ 
            _dark: {
              bg: 'gray.900'
            },
            _light: {
              bg: 'dark.200'
            }
            }}
            onOpen={async () => {
              setSearchNotFound(false);
              setSearch('');
              Keyboard.dismiss();
              await findNotes();
            }}
            trigger={
              triggerProps => {
            return <IconButton {...triggerProps}
                  icon={<IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid />} 
                  borderRadius="full"
                  />;
          }}>
              <Menu.Group _title={{ fontFamily: 'mono', fontWeight: '900' }} title="Priority" m="auto">
                <Menu.Item onPress={() => handlePriority('high')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={25} color="red.600" /></Menu.Item>
                <Menu.Item onPress={() => handlePriority('medium')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={25} color="yellow.600" /></Menu.Item>
                <Menu.Item onPress={() => handlePriority('low')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={25} color="green.600" /></Menu.Item>
              </Menu.Group>
            </Menu>
          <IconButton 
          icon={sortBy === 'desc' ? 
          <FontAwesome5Icon name="sort-amount-up-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={23} solid /> 
          : <FontAwesome5Icon name="sort-amount-down" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={23} solid /> } 
          borderRadius="full"
          onPress={handleSort}
          />
        </HStack>
    </HStack>
  </Center>
  
  <View style={{
    shadowColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR,
    elevation: 5,
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    } }}>
    <Divider />
  </View>
    <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR, paddingTop: 20 }}>
        <Text textAlign={'center'} pb='5' color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize={'20'} fontFamily={'body'} fontWeight={'600'} fontStyle={'italic'}>
          {`Good ${greet}, ${updatedUser}!`}
        </Text>
      {get(notes, 'length') ?
        <SearchBar
          clearIconComponent={!search && <></>}
          style={[Platform.OS === ANDROID && styles.androidSearchShadow, { fontFamily: 'Lato-Regular', width: deviceWidth - 40, height: "7%", borderRadius: 20,  backgroundColor: colorMode === 'light' ? 'white' : 'black' }]}
          darkMode={colorMode === 'dark'}
          fontSize={17}
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
          onClearPress={handleClearSearch}
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize={'none'}
          selectionColor={colorMode === 'light' ? 'black': 'white'}
          spinnerVisibility={spinner}
        /> : null
        }

      {!get(notes, 'length')? 
          <View flex={1}>
            <SkeletonLoader /> 
          </View>
        :
        <View flex={1} px={5} py={6}>
        {searchNotFound ? <NotFound findNotes={async () => await findNotes()} resetSearch={() => setSearch('')} resetPriority={() => setSearchNotFound(false)} /> :
          (
          <FlatList
            onTouchStart={() => Keyboard.dismiss()}
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
            renderItem={({item}) => <NoteList item={item} navigation={navigation} resetSearch={() => setSearch('')} />}
          />
          )
        }
        </View>
      }      
      
      <RNBounceable  
        bounceEffectIn={0.6}
        style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
        onPress={() => {
          navigation.navigate('AddNote', { isEdit: false })
        }}
      >
        <FontAwesome5Icon solid size={30} name="plus" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
      </ RNBounceable>

    </View>
    
    <Modal 
      shadow={4} 
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
        <Modal.Content borderRadius={'2xl'}>
          <Modal.CloseButton 
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
            <Modal.Header borderBottomWidth={1}>
              <FontAwesome5Icon name="user-edit" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid /> 
          </Modal.Header>
          <Modal.Body>
          <FormControl mt={2} px={2}>
              <Input 
                rounded={'3xl'}
                textAlign={'center'}
                fontSize={24}
                fontFamily={'mono'}
                fontWeight={'900'}
                autoCorrect={false}
                autoFocus={false}
                value={updatedUser}
                onChangeText={(value) => setUpdatedUser(value)}
                placeholder="Name"
                _focus={{ selectionColor: colorMode === 'light' ? 'black': 'white' }}
                _dark={{ bg: 'black' }}
                _light={{ bg: 'white' }} 
              />
            </FormControl>
          </Modal.Body>
              <Button
                padding={3}
                width={'full'}
                variant="ghost" 
                onPress={handleEditName}
                borderRadius={'none'}
              >
              <Text fontFamily={'mono'} color={'green.500'} fontSize={'16'} fontWeight={'900'}>
                SAVE        
              </Text>
              </Button>
        </Modal.Content>
        </TouchableWithoutFeedback>
      </Modal>
      <NoteAlert 
        showNoteAlert={showNoteAlert} 
        cancelRef={cancelRef}
        onNoteAlertClose={() => setShowNoteAlert(false)} 
      />
  </View>
  )
 }

 const styles = StyleSheet.create({
  fab: {
    elevation: 5,
    alignItems:'center',
    justifyContent:'center',
    width:64,
    height:64,
    position: 'absolute',                                          
    bottom: 35,                                                    
    right: 20,
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