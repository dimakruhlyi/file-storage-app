import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MainState {
  secretPhrase: string;
}

const initialState: MainState = {
  secretPhrase: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addSecretPhrase: (state, action: PayloadAction<string>) => {
      state.secretPhrase = action.payload;
    },
  },
});

export const { addSecretPhrase } = mainSlice.actions;

export default mainSlice.reducer;
