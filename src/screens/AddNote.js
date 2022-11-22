import React, { useState } from 'react';
import { View, TextInput, Dimensions } from 'react-native';
// import { Picker } from 'react-native-picker/picker';
import { Text, HStack, Heading, Divider, Select, Box, StatusBar, Center, useColorMode, IconButton, TextArea, Input } from "native-base";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import OctIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
// import { addNote } from '../publics/redux/actions/notes'
// import { connect } from 'react-redux'
import { DARK_COLOR, LIGHT_COLOR } from '../utils/constants';

const AddNote = ({
  navigation
}) => { 

  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();

  const [priority, setPriority] = useState('low');
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');



    // addDataNote(title,note,category_id) {
    //   this.props.dispatch(addNote(title,note,category_id))
    //   this.props.navigation.goBack()
    // }

    // updateDataNote(id,title,note,category_id) {
    //   this.props.dispatch(updateNote(id,title,note,category_id))
    //   this.props.navigation.goBack()
    // }

   let startEndIconColor = '#16a34a';
    if (priority === 'medium') {
      startEndIconColor = '#ca8a04';
    } else if (priority === 'high') {
      startEndIconColor = '#dc2626';
    }
   

        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: LIGHT_COLOR }}
              >
            <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
            <Box safeAreaTop />
              <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: LIGHT_COLOR }} px="2" py="2" justifyContent="space-between" alignItems="center" style={{ width: deviceWidth }}>
              <HStack>
              <IconButton 
                  icon={<IonIcon name="arrow-back-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={36} />}
                  borderRadius="full"
                  onPress={() => {
                    navigation.goBack()
                    setPriority('low')
                  }}
                  />  
              </HStack>
              <HStack>
              <Box>
                <Select 
                selectedValue={priority} 
                minWidth="150" 
                accessibilityLabel="PRIORITY" 
                placeholder="PRIORITY" 
                textAlign={'center'}
                fontWeight={'bold'}
                fontSize={16}
                _selectedItem={{
                    startIcon: <FontAwesome5Icon size={16} name="angle-double-right" style={{ paddingTop: 5 }} solid color={startEndIconColor} />,
                    endIcon: <FontAwesome5Icon size={16} name="angle-double-left" style={{ paddingTop: 5 }} solid color={startEndIconColor} />,
                }}
                _light={{
                  bg: "white",
                }} _dark={{
                  bg: "black",
                }}
                onValueChange={itemValue => setPriority(itemValue)}
                color={startEndIconColor}
                _item={{
                  _text: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR
                  }
                }}
                variant="rounded"
              >
                  <Select.Item alignItems={'center'} label="High" value="high"/>
                  <Select.Item alignItems={'center'} label=" Medium" value="medium" />
                  <Select.Item alignItems={'center'} label=" Low" value="low" />
                  </Select>
            </Box>
            </HStack>
            <HStack>
              <IconButton 
                  icon={<IonIcon name="checkmark-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={36} />}
                  borderRadius="full"
                  onPress={() => {
                    navigation.goBack()
                    setPriority('low')
                  }}
                  />
            </HStack>
            </HStack>
          </Center>

            <View style={{
              shadowColor: DARK_COLOR,
              shadowOpacity: 0.5,
              shadowRadius: 1,
              shadowOffset: {
                height: 1,
                width: 1
              } }}>
              <Divider />
            </View>

            <View style={{ flex: 1, backgroundColor: colorMode === 'light' ? 'white' : 'black', paddingTop: 24 }}>
              <Box mx={8}>
              <Input
                fontSize={'24'}
                autoCorrect={false}
                autoFocus={false}
                value={title} 
                fontWeight={'bold'} 
                textAlign={'center'} 
                variant={'underlined'} 
                placeholder="Title" 
                onChangeText={(text) => setTitle(text)}
              />
              </Box>
              <Box mx={8} py={6}>
                <TextArea 
                  autoCorrect={false} 
                  autoFocus={false}
                  autoCapitalize={'none'}
                  fontSize={'20'} 
                  rounded={'2xl'}
                  px={3} 
                  py={3} 
                  h={'xl'} 
                  placeholder="Ideas..." 
                  _light={{
                      bg: 'white',
                    }} 
                  _dark={{
                      bg: 'black',
                    }} 
                  value={note} 
                  onChangeText={(text) => setNote(text)}
                />
              </Box>
              </View>
          </View>
        ); 
    }
// const mapStateToProps = ( state ) => {
//   return (
//     category: state.category
//   )
// }
// export default connect(mapStateToProps)(AddNote);
export default AddNote;