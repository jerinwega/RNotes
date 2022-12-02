/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from "react";
 import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback } from "react-native";
 import { useColorMode, HStack, Center, Avatar, Button, 
  StatusBar, Spinner, Fab, Box, IconButton, Switch, Text, Modal, FormControl,
  Divider, Container, Flex, Input, Icon, useDisclose, Menu, Pressable, VStack, Skeleton, FlatList, ScrollView, View
} from "native-base";
//  import Menu, { MenuItem } from 'react-native-material-menu';
 import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import OctIcon from 'react-native-vector-icons/Octicons';
 import IonIcon from 'react-native-vector-icons/Ionicons';
 import { debounce } from 'lodash';
//  import { getNotes, getSearch, getSort } from '../publics/redux/actions/notes'
//  import { getCategory } from '../publics/redux/actions/category'
//  import { connect } from 'react-redux'
//  import ListData from '../Components/listData';
import { get } from 'lodash';
import { LIGHT_COLOR, DARK_COLOR, SKELETON_DARK, SKELETON_LIGHT } from '../utils/constants';
import SearchBar from "react-native-dynamic-search-bar";
import RNBounceable from "@freakycoder/react-native-bounceable";
 import SkeletonLoader from '../components/common/SkeletonLoader'
 import NoteList from '../components/views/NoteList';
import AsyncStorage from "@react-native-async-storage/async-storage";


 const HomeScreen = ({ route, navigation, user, onClose }) => {

  const { width: deviceWidth } = Dimensions.get('window');

  const { colorMode, toggleColorMode } = useColorMode();

  const [sortBy, setSort] = useState('DESC')
  const [search, setSearch] = useState('')
  const [greet, setGreet] = useState('');
  const [notes, setNotes] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const { allNotes } = get(route, 'params', []);


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
    if (sortBy === 'DESC') {
      setSort('ASC');
    } else {
      setSort('DESC');
    }
  }

  const handleChange = text => {
    setSearch(text);
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

  avatar = updatedUser.split(/\s/).reduce((response,word)=> response+word.slice(0,1), '').toUpperCase();


  return (
    <View style={{ width: deviceWidth, flex: 1 }}>
    <Center
      _dark={{ bg: DARK_COLOR }}
      _light={{ bg: LIGHT_COLOR }}
      >
    <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
    <Box safeAreaTop />
    <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="3" py="3" justifyContent="space-between" alignItems="center" style={{ width: deviceWidth }}>
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
          <Text color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize="38" fontFamily = 'ChocoChici'>
            RNotes
          </Text>
        </HStack>
        <HStack>
          <IconButton 
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={26} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={25} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
          <Menu w="24" placement={'bottom'} trigger={triggerProps => {
            return <IconButton {...triggerProps}
                  icon={<IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={26} solid />} 
                  borderRadius="full"
                  />;
          }}>
              <Menu.Group _title={{ fontFamily: 'Lato-Regular', fontWeight: 'bold' }} title="Priority" m="auto">
                <Menu.Item alignItems={'center'}><Icon as={<OctIcon name="circle-slash" solid />} size={25} color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} /></Menu.Item>
                <Menu.Item alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={26} color="red.600" /></Menu.Item>
                <Menu.Item alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={26} color="yellow.600" /></Menu.Item>
                <Menu.Item alignItems={'center'}><Icon as={<FontAwesome5Icon name="circle" solid />} size={26} color="green.600" /></Menu.Item>
              </Menu.Group>
            </Menu>
          <IconButton 
          icon={sortBy === 'DESC' ? 
          <FontAwesome5Icon name="sort-amount-up-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid /> 
          : <FontAwesome5Icon name="sort-amount-down" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid /> } 
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

    <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? 'white' : 'black', paddingTop: 24 }}>
        <Text textAlign={'center'} mx='6' pb='6' color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} bold fontSize={'18'} fontFamily={'Lato-Regular'} fontStyle='italic'>
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
          onChangeText={debounce(handleChange, 600)}
          onClearPress={() => setSearch('')}
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize={'none'}
          selectionColor={colorMode === 'light' ? 'black': 'white'}
        /> : null
        }

      {!notes || get(notes, 'length') === 0 ? 
      <View flex={1}>
        <ScrollView>
          <SkeletonLoader /> 
        </ScrollView>
        </View>
        :
        <View flex={1} px={5} py={6}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notes} 
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={item => { 
            const key = item.id;
            return key.toString()
          }}
          renderItem={({item}) => <NoteList item={item} allNotes={notes} navigation={navigation} />}
        />
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
          bg: 'coolGray.800'
        },
        _light: {
          bg: 'warmGray.50'
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
                _focus={{ _dark: { bg: DARK_COLOR }, selectionColor: colorMode === 'light' ? 'black': 'white' }}
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