import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationReducer from './slices/location/locationSlice';
import themeReducer from './slices/theme/themeSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
