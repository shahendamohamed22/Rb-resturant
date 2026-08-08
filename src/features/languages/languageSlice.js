import { createSlice } from '@reduxjs/toolkit';
import i18n from '../../app/i18n';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    current: 'ar', // matches i18n's default
  },
  reducers: {
    toggleLanguage: (state) => {
      state.current = state.current === 'ar' ? 'en' : 'ar';
      i18n.changeLanguage(state.current);
      document.documentElement.lang = state.current;
      document.documentElement.dir = state.current === 'ar' ? 'rtl' : 'ltr';
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;