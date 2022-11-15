/**
 * LoveProject999 : RNotes
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from "react";
 import { View, StyleSheet, TextInput, TouchableOpacity} from "react-native";
 import { useColorMode, HStack, Center, Avatar, Button, StatusBar, Spinner, Image, Box, IconButton, Switch, Text} from "native-base";
//  import Menu, { MenuItem } from 'react-native-material-menu';
 import Icon from 'react-native-vector-icons/FontAwesome5';
 //  import { debounce } from 'lodash';
//  import { getNotes, getSearch, getSort } from '../publics/redux/actions/notes'
//  import { getCategory } from '../publics/redux/actions/category'
//  import { connect } from 'react-redux'
//  import ListData from '../Components/listData';
 
//  console.disableYellowBox = true;
import { LIGHT_COLOR, DARK_COLOR } from '../utils/constants';

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <IconButton 
      icon={colorMode === 'light' ? <Icon name="moon" color={DARK_COLOR} size={25} solid /> 
      : <Icon name="sun" color={LIGHT_COLOR} size={25} solid />} 
      borderRadius="full"
      onPress={toggleColorMode}
      />

    </HStack>
  );
}

 const HomeScreen = () => {
  const { colorMode } = useColorMode();

  return (
    <Center 
    shadow="2"
    _dark={{ bg: DARK_COLOR }}
    _light={{ bg: LIGHT_COLOR }}
      >
    <StatusBar _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
    <Box safeAreaTop bg="#f5f5f5" />
    <HStack  _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" minW="350">
      <HStack px="2">
        <Avatar 
        _dark={{ bg: LIGHT_COLOR }}
        _light={{ bg: DARK_COLOR }}
        style={{ height: 50, width: 50}}
        source={require('../assets/images/R5.jpg')}
        // source={{ uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}}
        >
         <Text color={colorMode === 'light' ? LIGHT_COLOR : DARK_COLOR } bold fontSize="2xl">
         R
        </Text>
        </Avatar>
      </HStack>
      <HStack m="auto">
        <Text color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} fontSize="4xl" style={{ fontFamily: 'ChocoChici'}}>
          RNotes
        </Text>
        </HStack>
      <HStack>
      <ToggleDarkMode/>
        {/* <IconButton icon={<Icon name="moon" color={colorMode === 'light' ? DARK_COLOR : 'white'} size={20} solid />} borderRadius="full"/> */}
        <IconButton icon={<Icon name="lightbulb" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid />} />
        <IconButton icon={<Icon name="ellipsis-v" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={25} solid />} />
      </HStack>
    </HStack>
    </Center>
  )
 }
 
  //  _menu = null;
  
  //  setMenuRef = ref => {
  //    this._menu = ref;
  //  };
  
  //  hideMenu = () => {
  //    this._menu.hide();
  //  };
  
  //  showMenu = () => {
  //    this._menu.show();
  //  };
 
  //  constructor(props) {
  //    super(props);
  //    this.state = {
  //      text: '',
  //      sortBy: 'DESC',
  //      search: ''
  //    }
  //  }
 
  //  changeText = (value) => {
  //   //  this.setState({search:value})
  //   //  this.Search()
  //  }
 
  //  Search = () => {
  //    this.props.dispatch(getNotes(this.state.search, this.state.sortBy))
  //  }
 
   // endEditing() {
   //   const Text = this.state.text;
   //   this.props.dispatch(getSearch(Text))
   // }
 
  //  componentDidMount = () => {
  //    this.getDataCategory()
  //    this.getDataNotes()
  //  }
 
   // componentWillUpdate(nextProps, nextState) {
   //   if (nextState.open == true && this.state.open == false) {
   //     this.endEditing()
   //   }
   // }
  //  pickSort = (value) => {
  //   console.log("value", value);
  //   //  this.setState({sortBy: value})
  //   //  this.props.dispatch(getNotes(this.state.search ,value))
  //  }
 
  //  getDataNotes = () => {
  //    this.props.dispatch(getNotes())
  //  }
 
  //  getDataCategory = () => {
  //    this.props.dispatch(getCategory())
  //  }  
 
//      return (
//        <Container>
//         {/* <StatusBar bg="#3700B3" barStyle="light-content" />
//       <Box safeAreaTop bg="violet.600" />
//       <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" maxW="350">
//         <HStack alignItems="center">
//           <IconButton icon={<Icon size="sm" name="menu" color="white" />} />
//           <Text color="white" fontSize="20" fontWeight="bold">
//             Home
//           </Text>
//         </HStack>
//         <HStack>
//           <IconButton icon={<Icon name="favorite" size="sm" color="white" />} />
//           <IconButton icon={<Icon name="search" size="sm" color="white" />} />
//           <IconButton icon={<Icon name="more-vert" size="sm" color="white" />} />
//         </HStack>
//       </HStack> */}
//          <HStack style={{ backgroundColor: 'red'}}>
//            <Center>
//              <Button
//                transparent
//                onPress={() => this.props.navigation.openDrawer()}>
//                <Image
//                  style={{height: 40, width: 40, borderRadius: 30 }}
//                  source={
//                    require('../assets/topImage.jpg')
//                  }
//                />
//              </Button>
//            </Center>
//            <Text>
//              <Text style={{alignSelf:'center', color:'#000000'}}>NOTE APP</Text>
//            </Text>
//            <Center>
//              <View style={{right:10}}>
//                {/* <Menu
//                  ref={this.setMenuRef}
//                  button={<Icon onPress={this.showMenu} name="sort-amount-asc" style={{ fontSize:20, color: "#000000" }}/>}>
//                  <MenuItem onPress={()=>{this.hideMenu(), this.pickSort('ASC')}}>ASCENDING</MenuItem>
//                  <MenuItem onPress={()=>{this.hideMenu(), this.pickSort('DESC')}}>DESCENDING</MenuItem>
//                </Menu> */}
//              </View>
//            </Center>
//          </HStack>
//          {/* <View style={{padding: 10}}>
//              <TextInput 
//                style={styles.textInput}
//                onChangeText={() => debounce(this.changeText,900)}
//                onEndEditing={() => this.changeText(text)}
//                placeholder="Search Here!"
//              />
//              <Text>{this.state.text}</Text>
//          </View> */}
//          <View style={{ flex:1}}>
//          <Spinner color='blue' /> 
//            {/* { this.props.notes.isLoading == true ? 
//              <Spinner color='blue' /> 
//              :
//              ( 
//               <ListData navigation={this.props.navigation}/>
//              )
//            } */}
//          </View>
//          <TouchableOpacity style={styles.fab} onPress={() => this.props.navigation.navigate('AddNote')}>
//           <Icon name={'plus'} size={21} color="#000" solid />
//          </TouchableOpacity> 
//        </Container>
//      );
//  }
 
//  const styles = StyleSheet.create({
//    textInput: {
//      borderRadius: 23,
//      margin: 10,
//      marginBottom: 5,
//      marginTop: 15,
//      padding: 10,
//      paddingLeft: 20,
//      elevation: 2
//    },
//    fab: {
//      elevation: 3,
//      alignItems:'center',
//      justifyContent:'center',
//      width:60,
//      height:60,
//      position: 'relative',                                          
//      bottom: 35,                                                    
//      right: 15,
//      backgroundColor:'#FFF',
//      borderRadius:100,
//    },
//  });
 
//  const mapStateToProps = ( state ) => {
//      return {
//          category: state.category,
//          notes: state.notes
//      }
//  }
//  export default connect(mapStateToProps)(HomeScreen);
 export default HomeScreen;