/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from "react";
 import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard  } from "react-native";
 import { useColorMode, HStack, Center, Avatar, Button, 
  StatusBar, Spinner, Fab, Box, IconButton, Switch, Text,
  Divider, Container, Flex, Input, Icon
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
 
//  console.disableYellowBox = true;
import { LIGHT_COLOR, DARK_COLOR } from '../utils/constants';
import SearchBar from "react-native-dynamic-search-bar";


 const HomeScreen = ({ navigation }) => {

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
    console.log("value", text);
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
        <Avatar 
        style={{ height: 64, width: 64 }}
        source={require('../assets/images/R5.jpg')}
        // source={{ uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}}
        >
         <Text color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } bold fontSize="2xl">
         R
        </Text>
        </Avatar>
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
          <IconButton
          icon={<IonIcon name="color-filter" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={26} solid />} 
          borderRadius="full"  
          />
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
  <View>
    <Divider />
  </View>
  <Box style={{ flex:1 }} 
    _dark={{ bg: "black" }}
    _light={{ bg: "white" }}
    shadow={4}
    >
  <View style={{ paddingTop: 24 }}>
    <SearchBar
      style={{ height: "25%", borderRadius: 20, backgroundColor: colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR}}
      darkMode={colorMode === 'dark'}
      fontSize={16}
      // fontColor="#c6c6c6"
      // iconColor="#c6c6c6"
      // shadowColor="#282828"
      // cancelIconColor="#c6c6c6"
      // backgroundColor="#353d5e"
      placeholder="Search"
      onChangeText={(text) => console.log(text)}
      // onSearchPress={() => console.log("Search Icon is pressed")}
      // onClearPress={() => this.filterList("")}
      // onPress={() => alert("onPress")}
    />
    {/* <Input
      autoCorrect={false}
      autoCapitalize="none"
      size="lg"
      padding={3}
      shadow={2}
      focusOutlineColor={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
      _dark={{ bg: DARK_COLOR, 
        _focus: {
          bg: DARK_COLOR
        } 
      }}
      _light={{ bg: LIGHT_COLOR,
        _focus: {
          bg: LIGHT_COLOR
        } 
       }}
      InputLeftElement={<Icon as={<FontAwesome5Icon name="search" />} ml="3" size={4} color={colorMode === "light" ? DARK_COLOR : LIGHT_COLOR} /> }
      variant="rounded"
      placeholder="Search" 
      value={search}
      onChangeText={debounce(handleChange, 900)}
      />   */}
      
        {/* <TextInput 
              style={styles.textInput}
              onChangeText={debounce(handleChange, 900)}
              //onEndEditing={() => this.changeText(text)}
              placeholder="Search"
              value={search}
            /> */}

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
        </Box>
      <Box>
        <Fab 
          style={{ flex: 1 }}
          onPress={() => navigation.navigate('AddNote')}
          renderInPortal={false} 
          shadow={4} 
          size={16}
          bg={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR}
          icon={<FontAwesome5Icon color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } solid size={28} name="plus" />} />
      </Box>
  </View>
  )
 }
 

 const styles = StyleSheet.create({
  // textInput: {
  //   borderColor: "black",
  //   borderBottomWidth: 1,
  //   borderTopWidth: 1,
  //   borderRadius: 23,
  //   margin: 10,
  //   marginBottom: 5,
  //   marginTop: 15,
  //   padding: 10,
  //   paddingLeft: 20,
  //   elevation: 10
  // },
 });
 
//  const mapStateToProps = ( state ) => {
//      return {
//          category: state.category,
//          notes: state.notes
//      }
//  }
//  export default connect(mapStateToProps)(HomeScreen);
 export default HomeScreen;