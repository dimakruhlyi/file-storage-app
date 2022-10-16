import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ImageOrVideo } from 'react-native-image-crop-picker';

export interface ImageState {
  imageData: ImageOrVideo[];
}

const initialState: ImageState = {
  imageData: [],
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    addImageData: (state, action: PayloadAction<ImageOrVideo>) => {
      const isImageExists = state.imageData.find(
        image => image.size === action.payload.size,
      );
      if (!isImageExists) {
        state.imageData = [...state.imageData, action.payload];
      }
    },
  },
});

export const { addImageData } = imageSlice.actions;

export default imageSlice.reducer;
