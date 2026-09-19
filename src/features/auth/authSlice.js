import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    refreshToken: null,
    customerId: null,
    fullName: null,
    role: null,
    branchId: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, refreshToken, customerId, fullName, role, branchId } = action.payload;
      state.token = token;
      state.refreshToken = refreshToken;
      state.customerId = customerId;
      state.fullName = fullName;
      state.role = role;
      state.branchId = branchId ?? null;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.customerId = null;
      state.fullName = null;
      state.role = null;
      state.branchId = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;