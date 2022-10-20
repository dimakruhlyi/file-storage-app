import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DocumentPickerResponse } from 'react-native-document-picker';

export interface IFileState {
  fileData: IFileDocument[];
}

export interface IFileDocument extends DocumentPickerResponse {
  filePassword: string;
};

const initialState: IFileState = {
  fileData: [],
};

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    addFileData: (state, action: PayloadAction<IFileDocument>) => {
      const isFileExists = state.fileData.find(
        file => file.name === action.payload.name,
      );
      if (!isFileExists) {
        state.fileData = [...state.fileData, action.payload];
      }
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.fileData = state.fileData.filter(
        file => file.name !== action.payload,
      );
    },
  },
});

export const { addFileData, removeFile } = fileSlice.actions;

export default fileSlice.reducer;
