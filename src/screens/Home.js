/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from "react";
 import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableHighlight, Keyboard  } from "react-native";
 import { useColorMode, HStack, Center, Avatar, Button, 
  StatusBar, Spinner, Fab, Box, IconButton, Switch, Text,
  Divider, Container, Flex, Input, Icon, useDisclose, Menu, Pressable
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


 const HomeScreen = ({ navigation }) => {

  // const {
  //   isOpen,
  //   onToggle
  // } = useDisclose();
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode, toggleColorMode } = useColorMode();

  const [sortBy, setSort] = useState('DESC')
  const [search, setSearch] = useState('')

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

  return (
    <View style={{ width: deviceWidth, flex: 1 }}>
    <Center 
    _dark={{ bg: DARK_COLOR }}
    _light={{ bg: LIGHT_COLOR }}
      >
    <StatusBar _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
    <Box safeAreaTop bg="#f5f5f5" />
    <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="1" py="3" justifyContent="space-between" alignItems="center" style={{ width: deviceWidth }}>
      <HStack px="2">
      <RNBounceable bounceEffectIn={0.8} onPress={() => {} }>
        <Avatar 
        style={{ height: 64, width: 64 }}
        source={require('../assets/images/R5.jpg')}
        >
         <Text color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } bold fontSize="2xl">
         R
        </Text>
        </Avatar>
        </RNBounceable>
      </HStack>
        <HStack>
          <Text color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize="4xl" style={{ fontFamily: 'ChocoChici'}}>
            RNotes
          </Text>
        </HStack>
        <HStack px="1">
          <IconButton 
          icon={colorMode === 'light' ? <IonIcon name="moon" color={DARK_COLOR} size={26} solid /> 
          : <OctIcon name="sun" color={LIGHT_COLOR} size={26} solid />} 
          borderRadius="full"
          onPress={toggleColorMode}
          />
          <Menu w="24" placement={'bottom'} trigger={triggerProps => {
            return <IconButton {...triggerProps}
                  icon={<IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={26} solid />} 
                  borderRadius="full"  
                  />;
          }}>
              <Menu.Group title="Priority" m="auto">
                <Menu.Item alignItems={'center'}>
                  <Text color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}>
                    None
                  </Text>
                </Menu.Item>
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

    <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? 'white' : 'black' }}>
      
      <View style={{ paddingTop: 24 }}>
        <SearchBar
          clearIconComponent={!search && <></>}
          style={{ height: "24%", borderRadius: 20, backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR }}
          darkMode={colorMode === 'dark'}
          fontSize={16}
          placeholder="Search"
          onChangeText={debounce(handleChange, 600)}
          onClearPress={() => setSearch('')}
        />
      </View>


          <View>
          {/* <Spinner color='blue' />  */}

            {/* {this.props.notes.isLoading == true ? 
              <Spinner color='blue' /> :
              ( 
                <ListData navigation={this.props.navigation}/>
              )
            } */}
          </View>

    </View>

    <RNBounceable  
      bounceEffectIn={0.6}
      style={[ styles.fab, { backgroundColor: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR } ]} 
      onPress={() => navigation.navigate('AddNote')}
    >
      <FontAwesome5Icon solid size={28} name="plus" color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } />
    </ RNBounceable>
    
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
//          category: state.category,
//          notes: state.notes
//      }
//  }
//  export default connect(mapStateToProps)(HomeScreen);
 export default HomeScreen;