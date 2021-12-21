import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface ThemeState {
  switchThemeTemperature: number;
  showWarmTheme: boolean;
}

const initialState: ThemeState = {
  switchThemeTemperature: 0,
  showWarmTheme: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeTemperature: (state, action: PayloadAction<string>) => {
      localStorage.setItem('weather-switch-theme', action.payload);

      const temperature = parseInt(action.payload, 10);

      state.switchThemeTemperature = temperature;

      state.showWarmTheme = temperature > 2;
    },

    setShowWarmTheme: (state, action: PayloadAction<boolean>) => {
      state.showWarmTheme = action.payload;
    },
  },
});

export const { setThemeTemperature, setShowWarmTheme } = themeSlice.actions;

export const selectThemeTemperature = (state: RootState) =>
  state.theme.switchThemeTemperature;

export const selectShowWarmTheme = (state: RootState) =>
  state.theme.showWarmTheme;

export default themeSlice.reducer;
