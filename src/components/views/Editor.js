import React, { useRef, useCallback } from "react";
import { Platform, StyleSheet } from "react-native";
import {  KeyboardAvoidingView, useColorMode } from "native-base";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ANDROID, DARK_COLOR, LIGHT_COLOR } from "../../utils/constants";
import {  } from "native-base";
import { scaledFont, scaledHeight } from '../common/Scale';

import customRichDocumentFont from '../../utils/stylesheet';
  
const Editor = ({
}) => {

    const richText = useRef();
    const { colorMode } = useColorMode();


    const handleCursorPosition = useCallback((scrollY) => {
        // Positioning scroll bar
        scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
    }, [])

	return (
            <>
             {/* <RichToolbar
             style={{ marginHorizontal: 20}}
                     selectedIconTint={'#2095F2'}
                     disabledIconTint={'#bfbfbf'}
                    //  style={[styles.richBar, dark && styles.richBarDark]}
                        flatContainerStyle={styles.flatStyle}
                    // iconTint={color}
                    // iconSize={24}
                    // iconGap={10}
                        editor={richText}
                        actions={[ 
                        actions.setBold, 
                        actions.setItalic, 
                        actions.heading1,
                        // actions.insertImage,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        // actions.insertLink,
                        actions.keyboard,
                        actions.setStrikethrough,
                        actions.setUnderline,
                        actions.removeFormat,
                        // actions.insertVideo,
                        actions.checkboxList,
                        actions.undo,
                        actions.redo,
                        actions.blockquote,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.code,
                        actions.line,
                    ]}
                    iconMap={{ [actions.heading1]: ({tintColor}) => (<Text style={[{color: tintColor}]}>H1</Text>), }}
                 /> */}
           
                 <KeyboardAvoidingView 
                  flex={1}
                  behavior={Platform.OS === ANDROID ? "height" : "padding" }
                  keyboardVerticalOffset={scaledHeight(120)}
                  mx={5}
                  mb={5}
                //   contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
                >
                {/* <ScrollView 
                    keyboardDismissMode={'none'}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={20}
                    ref={scrollRef}
                    flex={1} 
                    bounces 
                    keyboardShouldPersistTaps="handled" 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: 20 }}
                    > */}
                    <RichEditor
                       androidHardwareAccelerationDisabled={true}
                        accessibilityRole={'none'}
                        accessibilityLabel={"Description Field"}
                        accessibilityHint={"Add Description"}
                        showsVerticalScrollIndicator={false}
                        editorStyle={{ 
                            backgroundColor: colorMode === 'light' ? 'white' : 'black' , 
                            color: colorMode ==='light' ? DARK_COLOR : LIGHT_COLOR,
                            placeholderColor: colorMode === 'light' ? '#a3a3a3' : '#525252',
                            initialCSSText: `${customRichDocumentFont}`,
                            contentCSSText:`
                                padding: 16px;
                                font-family: 'Lato';
                                font-size: ${scaledFont(20)}px;
                                min-height: 200px; 
                                position: absolute; 
                                top: 0; right: 0; bottom: 0; left: 0;`,
                        }}
                        // padding: 12px; 
                        // padding: 0 30px; 
                        // font-family: Lato-Regular; 
                        // display: flex;
                        // flex-direction: column; 
                        // padding-horizontal: 20px;
                        // padding-bottom: 20px;

                        style={{ flex: 1 }}
                        ref={richText}
                        placeholder={"ideas"}
                        pasteAsPlainText={true}
                        // initialFocus={true}
                        disabled={false}
                        useContainer={true}
                        onCursorPosition={handleCursorPosition}
                        containerStyle={{ 
                            borderRadius: 20, 
                            backgroundColor: colorMode === 'light' ? 'white' : 'black', 
                            borderWidth: 1,
                            borderColor: colorMode === 'light' ? '#d4d4d4' : '#404040',
                            // padding: 4,
                            }}
                        // initialContentHTML={value}
                        // onChange={onChangeText}
                    />
                    {/* </ScrollView> */}
                </KeyboardAvoidingView>
                </>
    );
};

const styles = StyleSheet.create({
    flatStyle: {
        paddingHorizontal: 8,
    }
  });

export default Editor;