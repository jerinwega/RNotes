/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect, useState } from "react";
 import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, Keyboard  } from "react-native";
 import { useColorMode, HStack, Center, Avatar, Button, 
  StatusBar, Spinner, Fab, Box, IconButton, Switch, Text,
  Divider, Container, Flex, Input, Icon, useDisclose, Menu, Pressable, VStack, Skeleton, FlatList, ScrollView
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
import { LIGHT_COLOR, DARK_COLOR } from '../utils/constants';
import SearchBar from "react-native-dynamic-search-bar";
import RNBounceable from "@freakycoder/react-native-bounceable";
 import SkeletonLoader from '../components/common/SkeletonLoader'
import AsyncStorage from "@react-native-async-storage/async-storage";


 const HomeScreen = ({ navigation }) => {

  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode, toggleColorMode } = useColorMode();

  const [sortBy, setSort] = useState('DESC')
  const [search, setSearch] = useState('')
  const [user, setUser] = useState('');

  const [greet, setGreet] = useState('');



  useEffect(() => {
    findUser();
    findDayTimeGreet();
  }, [])


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


  const handleSort = () => {
    if (sortBy === 'DESC') {
      setSort('ASC');
    } else {
      setSort('DESC');
    }
  }

  const handleChange = text => {
    console.log("text", text)
    setSearch(text);
  }

 const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    setUser(result);
  }

  

// console.log("user", typeof user);

const avatar = user.split(/\s/).reduce((response,word)=> response+word.slice(0,1), '').toUpperCase() 

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
      <RNBounceable bounceEffectIn={0.8} onPress={() => {} }>
        <Avatar 
        _dark={{ bg: LIGHT_COLOR }}
        _light={{ bg: DARK_COLOR }}
          style={{ height: 64, width: 64 }}
        >
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
    shadowColor: DARK_COLOR,
    shadowOpacity: 0.9,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 1
    } }}>
    <Divider />
  </View>

    <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? 'white' : 'black', paddingTop: 24 }}>
        <Text textAlign={'center'} mx='6' pb='6' color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} bold fontSize={'18'} fontFamily={'Lato-Regular'} fontStyle='italic'>
          {`Good ${greet}, ${user}!`}
        </Text>
        <SearchBar
          clearIconComponent={!search && <></>}
          style={{ height: "6%", borderRadius: 20,  backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR }}
          darkMode={colorMode === 'dark'}
          fontSize={16}
          fontFamily={'Lato-Regular'}
          placeholder="Search"
          onChangeText={debounce(handleChange, 600)}
          onClearPress={() => setSearch('')}
          autoCorrect={false}
          autoFocus={false}
          autoCapitalize={'none'}
        />

      <View style={{ flex: 1 }}>
        <ScrollView>
          <SkeletonLoader />
        </ScrollView>
      </View>
      
      <RNBounceable  
        bounceEffectIn={0.6}
        style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
        onPress={() => navigation.navigate('AddNote')}
      >
        <FontAwesome5Icon solid size={30} name="plus" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
      </ RNBounceable>

    </View>
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
 
//  const mapStateToProps = ( state ) => {
//      return {
//          notes: state.notes
//      }
//  }
//  export default connect(mapStateToProps)(HomeScreen);
 export default HomeScreen;