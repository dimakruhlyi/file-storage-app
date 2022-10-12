import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface MainState {
  secretPhrase: string;
  isSecretVerified: boolean;
}

const initialState: MainState = {
  secretPhrase: '',
  isSecretVerified: false,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addSecretPhrase: (state, action: PayloadAction<string>) => {
      state.secretPhrase = action.payload;
    },
    setVerifiedSecret: (state, action: PayloadAction<boolean>) => {
      state.isSecretVerified = action.payload;
    },
  },
});

export const { addSecretPhrase, setVerifiedSecret } = mainSlice.actions;

export default mainSlice.reducer;
