import React, { useCallback, useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import DocumentPicker, { types } from 'react-native-document-picker';
import FileViewer from 'react-native-file-viewer';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { useForm, Controller } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
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

type SearchFileInput = {
  fileSearch: string;
};

function SaveFile({ navigation }: ISaveFile): JSX.Element {
  const dispatch = useTypedDispatch();
  const { fileData } = useTypedSelector(state => state.fileReducer);
  const { control, getValues, watch } = useForm<SearchFileInput>();
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
  const searchValue = getValues('fileSearch');
  const searchedFileData = useMemo(
    () =>
      searchValue !== undefined
        ? fileData.filter(file => file.name?.includes(searchValue))
        : fileData,
    [watch('fileSearch'), fileData],
  );

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf, types.doc, types.docx, types.xls, types.xlsx],
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
      <View style={{ marginTop: 10 }}>
        <Controller
          control={control}
          render={() => (
            <Input name="fileSearch" iconName="search" control={control} />
          )}
          name="fileSearch"
          rules={{ required: false }}
        />
      </View>
      {searchedFileData.length > 0 && (
        <View style={styles.filesContainer}>
          {searchedFileData.map(file => (
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
