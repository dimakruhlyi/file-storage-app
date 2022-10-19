import { configureStore, combineReducers } from '@reduxjs/toolkit';
import mainReducer from './slices/mainSlice';
import imageReducer from './slices/imageSlice';
import fileReducer from './slices/fileSlice';

const combinedReducer = combineReducers({
  mainReducer: mainReducer,
  imageReducer: imageReducer,
  fileReducer: fileReducer,
});

export const store = configureStore({
  reducer: combinedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
