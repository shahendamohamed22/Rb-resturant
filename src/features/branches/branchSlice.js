import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    selectedBranch: null, // { id, nameAr, nameEn, deliveryFee, etaMinMinutes, etaMaxMinutes }
  },
  reducers: {
    setSelectedBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
  },
});

export const { setSelectedBranch } = branchSlice.actions;
export default branchSlice.reducer;