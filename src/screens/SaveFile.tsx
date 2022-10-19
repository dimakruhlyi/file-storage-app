import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import DocumentPicker, { types } from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Button from '../components/ui/Button';
import BottomContainer from '../components/BottomContainer';
import DocumentItem from '../components/DocumentItem';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { addFileData } from '../store/slices/fileSlice';

interface ISaveFile {
  navigation: NavigationProp<any, any>;
}
// ToDo: display modal window with password right after the file was uploaded

function SaveFile({ navigation }: ISaveFile): JSX.Element {
  const dispatch = useDispatch();
  const { fileData } = useSelector((state: RootState) => state.fileReducer);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      dispatch(addFileData(response[0]));
    } catch (err) {
      console.warn(err);
    }
  }, []);

  async function handleFilePress(fileUri: string): Promise<void> {
    await FileViewer.open(fileUri);
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      {/* <Text color={COLORS.primary}>SaveFile screen</Text> */}
      {fileData.length > 0 && (
        <View
          style={[
            styles.filesContainer,
            { justifyContent: fileData.length > 1 ? 'center' : 'flex-start' },
          ]}>
          {fileData.map(file => (
            <DocumentItem
              {...file}
              onFilePress={() => handleFilePress(file.uri)}
              key={file.name}
            />
          ))}
        </View>
      )}
      <BottomContainer>
        <Button label="Upload file" onPress={handleDocumentSelection} />
      </BottomContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  filesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SaveFile;
