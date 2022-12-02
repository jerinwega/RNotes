import React, { useRef, useState } from 'react';
import { TextInput, Dimensions, TouchableWithoutFeedback, StyleSheet, Keyboard } from 'react-native';
import { Text, HStack, Heading, Divider, Select, Box, StatusBar, Center, useColorMode, IconButton, TextArea, Input, View, ScrollView } from "native-base";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { DARK_COLOR, LIGHT_COLOR } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';
import moment from 'moment';
import DeleteAlert from "../components/common/DeleteAlert";
import DoubleClick from 'react-native-double-tap'


const ViewNotes = ({
  navigation,
  route
}) => { 
//   const { notes } = get(route, 'params');
  const { width: deviceWidth } = Dimensions.get('window');
  const { colorMode } = useColorMode();

//   const [priority, setPriority] = useState('low');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');


  const { viewedNote } = get(route, 'params');
  const { allNotes } = get(route, 'params');

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const cancelRef = useRef(null);

  // console.log(viewedNote)

//   useEffect(() => {
//     if (isEdit) {
//       setTitle(viewedNote.title);
//       setDescription(viewedNote.description)
//       setPriority(viewedNote.priority)
//     }
//   }, [])


  // console.log(data)


//   const handleChange = (value, name) => {
//     if (name === 'title') {
//       setTitle(value);
//     }
//     if (name === 'description') {
//       setDescription(value)
//     }
//     if (name === 'priority') {
//       setPriority(value)
//     }
//   }

//   const handleSubmit = async () => {
//     if (!title.trim() && !description.trim()) {
//       setPriority('low')
//       navigation.navigate('Home');
//       return;
//     }

//     const sameNote = (data || []).some(item => item.id === viewedNote.id)

//     if (sameNote && viewedNote.title === title && viewedNote.description === description && viewedNote.priority === priority) {
//       setPriority('low')
//       navigation.navigate('Home');
//       return;
//     }

//     const note = {
//       id: Date.now(),
//       title,
//       description,
//       priority,
//       time: Date.now()
//     }    
//     if (isEdit) {
//        const  allNotes = [...data, note];
//         await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
//         navigation.navigate('Home', { allNotes })
//         setTitle('')
//         setDescription('')
//         setPriority('low')
//     } else {
//       const allNotes = [...notes, note];
//       await AsyncStorage.setItem('notes', JSON.stringify(allNotes));
//       navigation.navigate('Home', { allNotes })
//       setTitle('')
//       setDescription('')
//       setPriority('low')
//     }
//   }

    const onDeleteAlertClose = () => {
      setIsDeleteAlertOpen(false);
    }

    const handleDeleteAlert = async () => {
      const newNotes = allNotes.filter(item => item.id !== get(viewedNote, 'id'));
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setIsDeleteAlertOpen(false);
      navigation.navigate('Home', { allNotes: newNotes })
    }


    let startEndIconColor = '#16a34a';
    let hashBgColor = '#dcfce7';
    let borderColor = 'green.200';
    if (get(viewedNote, 'priority') === 'medium') {
        startEndIconColor = '#ca8a04';
        hashBgColor = '#fef9c3';
        borderColor = 'yellow.200';
    } else if (get(viewedNote, 'priority') === 'high') {
        startEndIconColor = '#dc2626';
        hashBgColor = '#fee2e2'
        borderColor = 'red.200';
    }

   
        return (
          <View style={{ flex: 1, width: deviceWidth }}>
            <Center
              _dark={{ bg: DARK_COLOR }}
              _light={{ bg: hashBgColor }}
              >
            <StatusBar barStyle={colorMode === 'light' ? "dark-content" : "light-content"} />
            <Box safeAreaTop />
              <HStack _dark={{ bg: DARK_COLOR }} _light={{ bg: hashBgColor }}  px="2" py="2" 
              justifyContent="space-between" 
              alignItems={'center'}
              style={{ width: deviceWidth }}
              borderBottomWidth={3}
              borderBottomColor={colorMode === 'light' ? borderColor : startEndIconColor}
              >
            <HStack>
              <IconButton 
                  icon={<IonIcon name="arrow-back-circle-outline" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} size={36} />}
                  borderRadius="full"
                  onPress={() => navigation.goBack()}
                  />  
            </HStack>
            <HStack space={4}>
              <IconButton 
                  icon={<FontAwesome5Icon color={'#dc2626'} name="trash-alt" size={24} solid />}
                  borderRadius="full"
                  onPress={() => setIsDeleteAlertOpen(true)}
                  />
              <IconButton 
                  icon={<FontAwesome5Icon name="pen-alt" color={colorMode === 'light' ? DARK_COLOR : LIGHT_COLOR} solid size={24} />}
                  borderRadius="full"
                  onPress={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: allNotes })}
                  />
            </HStack>
            </HStack>
          </Center>


          <DoubleClick
              doubleTap={() => navigation.navigate('AddNote', { viewedNote , isEdit: true, data: allNotes })}
              delay={300}
          >
            <View flex={1}>
            <View pt={6} pb={2} px={6} bg={colorMode === 'light' ? 'white' : 'black'}>
              <Text opacity={0.5} mb={4} textAlign={'right'} bold fontFamily={'Lato-Regular'}>             
                {`${get(viewedNote, 'edited', false) ? "Updated At": "Created At"} : ${moment(get(viewedNote, 'time', '')).format('DD/MM/YYYY - hh:mm A')}`}
              </Text>
              <Text color={startEndIconColor} bold fontFamily={'Lato-Regular'} fontSize={26}>             
                {get(viewedNote, 'title', '')}
              </Text>
            </View>
      
            <ScrollView indicatorStyle={colorMode === 'light' ? 'black' : 'white'} px={7} pt={4} bg={colorMode === 'light' ? 'white' : 'black'}>
             
              <Text fontFamily={'Lato-Regular'} fontSize={20}>             
              {get(viewedNote, 'description', '')}
              </Text>
            </ScrollView>
            </View>
            </DoubleClick>
            <DeleteAlert 
              isDeleteAlertOpen={isDeleteAlertOpen} 
              cancelRef={cancelRef}
              handleDeleteAlert={handleDeleteAlert}
              onDeleteAlertClose={onDeleteAlertClose} 
          />
          </View>
        ); 
    }
export default ViewNotes;