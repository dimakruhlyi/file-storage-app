import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import DocumentPicker, { types } from 'react-native-document-picker';
import FileViewer from "react-native-file-viewer";
import { useDispatch } from 'react-redux';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';

interface ISaveFile {
    navigation: NavigationProp<any, any>;
}



function SaveFile({ navigation }: ISaveFile): JSX.Element {
    const dispatch = useDispatch();

    const handleDocumentSelection = useCallback(async () => {
        try {
          const response = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            type: [types.pdf],
          });
          console.log('--------+++++response:', response);
          await FileViewer.open(response[0].uri); // ToDo: check this
        } catch (err) {
          console.warn(err);
        }
      }, []);

    return (
        <View style={screenContainer}>
            {/* <Text color={COLORS.primary}>SaveFile screen</Text> */}
            <Button label='Upload file' onPress={handleDocumentSelection} />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SaveFile;