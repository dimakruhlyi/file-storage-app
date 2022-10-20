import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import DocumentPicker, { types } from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Button from '../components/ui/Button';
import BottomContainer from '../components/BottomContainer';
import DocumentItem from '../components/DocumentItem';
import FilePasswordModal, {
  FilePasswordInput,
} from '../components/FilePasswordModal';
import { addFileData, IFileDocument } from '../store/slices/fileSlice';

interface ISaveFile {
  navigation: NavigationProp<any, any>;
}

type CheckFilePassword = {
  isCheckModalVisible: boolean;
  fileUri: string;
  filePassword: string;
};

function SaveFile({ navigation }: ISaveFile): JSX.Element {
  const dispatch = useDispatch();
  const { fileData } = useSelector((state: RootState) => state.fileReducer);
  const [isSetPasswordModalVisible, setIsSetPasswordModalVisible] =
    useState<boolean>(false);
  const [checkPasswordData, setCheckPasswordData] = useState<CheckFilePassword>(
    {
      isCheckModalVisible: false,
      fileUri: '',
      filePassword: '',
    },
  );
  const [storedFile, setStoredFile] = useState<IFileDocument>();
  const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      const resultObj = { ...response[0], filePassword: '' };
      setStoredFile(resultObj);
      setIsSetPasswordModalVisible(true);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  async function handleFileOpen(uri: string): Promise<void> {
    await FileViewer.open(uri);
  }

  async function onCheckPassword(data: FilePasswordInput): Promise<void> {
    if (data.filePassword?.trim() === checkPasswordData.filePassword) {
      setIsPasswordWrong(false);
      resetCheckPasswordData();
      await FileViewer.open(checkPasswordData.fileUri);
    } else {
      setIsPasswordWrong(true);
    }
  }

  function resetCheckPasswordData() {
    setCheckPasswordData(prev => ({
      ...prev,
      isCheckModalVisible: false,
      fileUri: '',
      filePassword: '',
    }));
  }

  function onSetPassword(data?: FilePasswordInput) {
    const fileObj = Object.assign({}, storedFile);
    fileObj.filePassword = data?.filePassword?.trim() || '';
    dispatch(addFileData(fileObj));
    setIsSetPasswordModalVisible(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      {fileData.length > 0 && (
        <View style={styles.filesContainer}>
          {fileData.map(file => (
            <DocumentItem
              {...file}
              onFilePress={() =>
                file.filePassword
                  ? setCheckPasswordData(prev => ({
                      ...prev,
                      isCheckModalVisible: true,
                      fileUri: file.uri,
                      filePassword: file.filePassword,
                    }))
                  : handleFileOpen(file.uri)
              }
              key={file.name}
            />
          ))}
        </View>
      )}
      <BottomContainer>
        <Button label="Upload file" onPress={handleDocumentSelection} />
      </BottomContainer>
      <FilePasswordModal
        labelText="Would you mind to set a password to your file?"
        isVisible={isSetPasswordModalVisible}
        onVisibilityChange={() => onSetPassword()}
        onFormSubmit={onSetPassword}
      />
      <FilePasswordModal
        labelText="Enter the password to your file."
        isVisible={checkPasswordData.isCheckModalVisible}
        isPasswordWrong={isPasswordWrong}
        onVisibilityChange={() => {
          setCheckPasswordData(prev => ({
            ...prev,
            isCheckModalVisible: false,
          }));
          setIsPasswordWrong(false);
        }}
        onFormSubmit={onCheckPassword}
      />
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
