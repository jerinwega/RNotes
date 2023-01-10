import React, { useRef } from "react";
import { StyleSheet, Text, View , KeyboardAvoidingView, ScrollView } from "react-native";
import { Dimensions } from 'react-native';


import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import { ANDROID } from "../../utils/constants";
import { scaledHeight } from "../common/Scale";
// import HTMLView from "react-native-htmlview";

const Editor2 = () => {
    const windowWidth = Dimensions.get('window');

//   const strikethrough = require("./assets/strikethrough.png"); //icon for strikethrough
//   const video = require("./assets/video.png"); //icon for Addvideo
  const richText = useRef(); //reference to the RichEditor component
//   const [article, setArticle] = useState("");

  // this function will be called when the editor has been initialized
//   function editorInitializedCallback() {
//     RichText.current?.registerToolbar(function (items) {
//       // items contain all the actions that are currently active
//       console.log(
//         "Toolbar click, selected items (insert end callback):",
//         items
//       );
//     });
//   }

  // Callback after height change
//   function handleHeightChange(height) {
//     // console.log("editor height change:", height);
//   }

//   function onPressAddImage() {
//     // you can easily add images from your gallery
//     RichText.current?.insertImage(
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
//     );
//   }

//   function insertVideo() {
//     // you can easily add videos from your gallery
//     RichText.current?.insertVideo(
//       "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
//     );
//   }

  return (
    <View style={{flex: 1}}>
        <RichToolbar
        editor={richText}
        actions={[
          actions.undo,
          actions.redo,
          actions.setBold,
          actions.setItalic,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertImage,
          actions.insertVideo,
          actions.removeFormat,
        ]}
      />
    <ScrollView>
        <KeyboardAvoidingView 
                  flex={1}
                  behavior={Platform.OS === ANDROID ? "height" : "padding" }
                //   keyboardVerticalOffset={scaledHeight(120)}
                //   mx={5}
                //   mb={5}
                >
      <RichEditor
        disabled={false}
        ref={richText}
        placeholder={'Start Writing Here'}
        // onChange={(text) => setArticle(text)}
        // editorStyle={editorStyleConfig}
        initialHeight={windowWidth.height}
      />
          </KeyboardAvoidingView>

    </ScrollView>

</View>
  );
};

export default Editor2;

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: "bold",
    color: "purple",
  },
  div: {
    fontFamily: "monospace",
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
//   container: {
//     flex: 1,
//     // marginTop: 40,
//     // backgroundColor: "#F5FCFF",
//   },
//   editor: {
//     flex: 1,
//     // backgroundColor: "black",
//     // borderColor: "black",
//     // borderWidth: 1,
//   },
//   rich: {
//     // minHeight: 300,
//     flex: 1,
//     borderWidth: 1,
//     borderColor: 'red'
//   },
//   richBar: {
//     // height: 50,
//     backgroundColor: "#F5FCFF",
//   },
//   text: {
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   tib: {
//     textAlign: "center",
//     color: "#515156",
//   },
});