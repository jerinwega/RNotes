import React, { useRef, useCallback } from "react";
import { Platform, StyleSheet } from "react-native";
import { useColorMode, KeyboardAvoidingView, ScrollView } from "native-base";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { ANDROID, DARK_COLOR, LIGHT_COLOR } from "../../utils/constants";
import {  } from "native-base";
import { scaledFont, scaledHeight } from '../common/Scale';
import customRichDocumentFont from '../../utils/stylesheet';
  
const Editor = ({
    value,
    onChangeText
}) => {

    const richText = useRef(null);
    const scrollRef = useRef(null);
    const { colorMode } = useColorMode();


    let handleCursorPosition = useCallback((scrollY) => {
        // Positioning scroll bar
        scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
    }, [])

	return (
            <>  
                 <KeyboardAvoidingView 
                    enabled
                  flex={1}
                  behavior={Platform.OS === ANDROID ? "height" : "padding" }
                  keyboardVerticalOffset={scaledHeight(120)}
                >
                    <ScrollView 
                    flex={1} 
                    ref={scrollRef}
                    contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled
                    bounces={false}
                    keyboardShouldPersistTaps="handled" 
                    showsVerticalScrollIndicator={false}
                    mx={5}
                    > 
                
                    <RichEditor
                        androidLayerType="software"
                        accessibilityRole={'none'}
                        accessibilityLabel={"Description Field"}
                        accessibilityHint={"Add Description"}
                        showsVerticalScrollIndicator={false}
                        editorStyle={{
                            caretColor: colorMode === 'light' ? 'black': 'white',
                            backgroundColor: colorMode === 'light' ? 'white' : 'black' , 
                            color: colorMode ==='light' ? DARK_COLOR : LIGHT_COLOR,
                            placeholderColor: colorMode === 'light' ? '#a3a3a3' : '#525252',
                            initialCSSText: `${customRichDocumentFont}`,
                            contentCSSText:`
                                padding: 14px; 
                                font-family: 'Lato';
                                font-size: ${scaledFont(20)}px;
                                `
                        }}

                        style={{flex: 1, borderRadius: 20 }}
                        ref={richText}
                        placeholder={"ideas"}
                        pasteAsPlainText={false}
                        initialFocus={false}
                        disabled={false}
                        useContainer={true}
                        onCursorPosition={handleCursorPosition}
                        containerStyle={{
                            borderRadius: 20, 
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            borderBottomWidth: 0,
                            backgroundColor: colorMode === 'light' ? 'white' : 'black', 
                            borderWidth: 1,
                            borderColor: colorMode === 'light' ? '#d4d4d4' : '#404040',
                            }}
                        initialContentHTML={value}
                        onChange={onChangeText}
                    />
                </ScrollView>
                <RichToolbar
                    editor={richText}
                    selectedIconTint={colorMode === 'light' ? '#cb7bff' : '#c05eff'}
                    iconTint={colorMode=== 'light' ? DARK_COLOR : LIGHT_COLOR }
                    iconSize={scaledFont(22)}
                    flatContainerStyle={{ paddingHorizontal: 6 }}
                    actions={[
                    // actions.insertImage,
                    actions.setBold,
                    actions.setItalic,
                    actions.setStrikethrough,
                    actions.undo,
                    actions.redo,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    // actions.checkboxList,
                    // actions.insertLink, // check html view
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.setUnderline,
                    actions.keyboard,
                    ]}
                    style={[
                        styles.richTextToolbarStyle, { 
                        height: scaledHeight(48), 
                        backgroundColor: colorMode=== 'light' ? LIGHT_COLOR : DARK_COLOR, 
                        borderColor: colorMode==='light' ? '#d4d4d4' : '#404040'}
                    ]}
                />

                </KeyboardAvoidingView>
                </>
    );
};
const styles = StyleSheet.create({
    richTextToolbarStyle: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        marginHorizontal: 20,
        marginBottom: 20,
      },
  });

export default Editor;

