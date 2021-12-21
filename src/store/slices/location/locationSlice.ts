import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface LocationState {
  homeLocationName: string;
}

const initialState: LocationState = {
  homeLocationName: '',
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setHomeLocation: (state, action: PayloadAction<string>) => {
      localStorage.setItem('weather-home', action.payload);

      state.homeLocationName = action.payload;
    },
  },
});

export const { setHomeLocation } = locationSlice.actions;

export const selectHomeLocation = (state: RootState) =>
  state.location.homeLocationName;

export default locationSlice.reducer;
