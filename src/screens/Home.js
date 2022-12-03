/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from "react";
 import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, RefreshControl } from "react-native";
 import { 
  useColorMode, HStack, Center, Avatar, Button, 
  StatusBar, Box, IconButton, Text, Modal, FormControl,
  Divider, Input, Icon, Menu, FlatList, ScrollView, View
} from "native-base";
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
 import { debounce } from 'lodash';
import { get, orderBy } from 'lodash';
import { LIGHT_COLOR, DARK_COLOR } from '../utils/constants';
import SearchBar from "react-native-dynamic-search-bar";
import RNBounceable from "@freakycoder/react-native-bounceable";
 import SkeletonLoader from '../components/common/SkeletonLoader'
 import NoteList from '../components/views/NoteList';
 import NotFound from "../components/views/NotFound";
import AsyncStorage from "@react-native-async-storage/async-storage";


 const HomeScreen = ({ route, navigation, user, onClose }) => {

  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode, toggleColorMode } = useColorMode();
  const { allNotes } = get(route, 'params', []);

  const [sortBy, setSort] = useState('desc')
  const [search, setSearch] = useState('')
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [greet, setGreet] = useState('');
  const [notes, setNotes] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState('');
  const [refreshState, setRefreshState] = useState(false);


  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);
  
  useEffect(() => {
    findDayTimeGreet();
  }, [])

  useEffect(() => {
    findNotes();
  }, [navigation])


  useEffect(() => {
    if (get(allNotes, 'length')) {
      setNotes(allNotes);
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
    if(result !== null) setNotes(JSON.parse(result))
  }

  const handleSort = () => {
    if (sortBy === 'desc') {
      setSort('asc');
    } else {
      setSort('desc');
    }
  }

  const handleSearch = async (text) => {
    if (!text.trim()) {
      setSearch('')
      setSearchNotFound(false);
      return await findNotes();
    }
    setSearch(text);
    const searchResults = (notes || []).filter(note => {
      if((note.title.toLowerCase()).includes(text.toLowerCase())) {
        return note;
      }
    });
    if (get(searchResults, 'length')) {
      setNotes([...searchResults]);
    } else {
      setSearchNotFound(true);
    }
  }

  const handleClearSearch = async () => {
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
    await onClose();
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
    }
}

const onRefresh = async () => {
  setRefreshState(true);
  await findNotes();
  setRefreshState(false);
}

  return (
    <View style={{ width: deviceWidth, flex: 1 }}>
    <Center
      _dark={{ bg: DARK_COLOR }}
      _light={{ bg: LIGHT_COLOR }}
      >
    <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
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
         <Text fontFamily = 'Lato-Regular' color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } fontWeight='900' fontSize={'30'}>
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
        <HStack>
          <IconButton 
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={25} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={25} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
          <Menu 
          
          w="24" 
          placement={'bottom'} 
          _backdrop={{ 
            _dark: {
                bg: 'dark.100'
              },
            _light: {
              bg: 'gray.900'
            } 
            }}
            onOpen={async () => await findNotes()}
            trigger={triggerProps => {
            return <IconButton {...triggerProps}
                  icon={<IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid />} 
                  borderRadius="full"
                  />;
          }}>
              <Menu.Group _title={{ fontFamily: 'Lato-Regular', fontWeight: 'bold', color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }} title="Priority" m="auto">
                <Menu.Item onPress={() => handlePriority('high')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={25} color="red.600" /></Menu.Item>
                <Menu.Item onPress={() => handlePriority('medium')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={25} color="yellow.600" /></Menu.Item>
                <Menu.Item onPress={() => handlePriority('low')}alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={25} color="green.600" /></Menu.Item>
              </Menu.Group>
            </Menu>
          <IconButton 
          icon={sortBy === 'desc' ? 
          <FontAwesome5Icon name="sort-amount-up-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={24} solid /> 
          : <FontAwesome5Icon name="sort-amount-down" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={24} solid /> } 
          borderRadius="full" 
          onPress={handleSort}
          />
        </HStack>
    </HStack>
  </Center>
  
  <View style={{
    shadowColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR,
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    } }}>
    <Divider />
  </View>

    <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? 'white' : 'black', paddingTop: 20 }}>
        <Text textAlign={'center'} pb='5' color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontWeight={'900'} fontSize={'18'} fontFamily={'Lato-Regular'} fontStyle='italic'>
          {`Good ${greet}, ${updatedUser}!`}
        </Text>
      {get(notes, 'length') ?
        <SearchBar
          clearIconComponent={!search && <></>}
          style={{ width: deviceWidth - 40, height: "6%", borderRadius: 20,  backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR }}
          darkMode={colorMode === 'dark'}
          fontSize={16}
          fontFamily={'Lato-Regular'}
          placeholder="Search"
          onChangeText={debounce(handleSearch, 600)}
          onClearPress={handleClearSearch}
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize={'none'}
          selectionColor={colorMode === 'light' ? 'black': 'white'}
        /> : null
        }

      {!notes || get(notes, 'length') === 0 ? 
      <View flex={1}>
        <ScrollView indicatorStyle={colorMode === 'light' ? 'black' : 'white'}>
          <SkeletonLoader /> 
        </ScrollView>
        </View>
        :
        <View flex={1} px={5} py={6}>
        {searchNotFound ? <NotFound /> :
          (
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
            renderItem={({item}) => <NoteList item={item} allNotes={notes} navigation={navigation} />}
          />
          )
        }
        </View>
      }      
      
      <RNBounceable  
        bounceEffectIn={0.6}
        style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
        onPress={() => navigation.navigate('AddNote', { notes })}
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
          bg: 'dark.100'
        },
        _light: {
          bg: 'gray.900'
        }
      }}
    >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Modal.Content borderRadius={'2xl'}>
          <Modal.CloseButton 
            _icon={{ color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR }}
            borderRadius={'full'} />
            <Modal.Header>
              <FontAwesome5Icon name="user-edit" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid /> 
          </Modal.Header>
          <Modal.Body>
          <FormControl my={2} px={3}>
              <Input 
                rounded={'3xl'}
                textAlign={'center'}
                fontSize={22}
                fontFamily={'Lato-Regular'}
                fontWeight={'900'}
                autoCorrect={false}
                autoFocus={false}
                value={updatedUser}
                onChangeText={(value) => setUpdatedUser(value)}
                placeholder="Name"
                borderColor={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
                borderWidth={2}
                _focus={{ _dark: { bg: DARK_COLOR }, selectionColor: colorMode === 'light' ? 'black': 'white' }}
                _dark={{ bg: DARK_COLOR }}
                _light={{ bg: LIGHT_COLOR }} 
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
              <Text fontFamily={'Lato-Regular'} fontWeight={'800'} color={'green.500'} fontSize={'16'}>
                SAVE        
              </Text>
              </Button>
        </Modal.Content>
        </TouchableWithoutFeedback>
      </Modal>
  </View>
  )
 }

 const styles = StyleSheet.create({
  fab: {
    elevation: 3,
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
 });

 export default HomeScreen;