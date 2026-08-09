import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    customerId: null,
    fullName: null,
    role: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, customerId, fullName, role } = action.payload;
      state.token = token;
      state.customerId = customerId;
      state.fullName = fullName;
      state.role = role;
    },
    logout: (state) => {
      state.token = null;
      state.customerId = null;
      state.fullName = null;
      state.role = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;