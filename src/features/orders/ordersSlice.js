import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [], // full order objects, newest first
  },
  reducers: {
    addOrder: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateOrderStage: (state, action) => {
      const { orderId, stage } = action.payload;
      const order = state.items.find((o) => o.orderId === orderId);
      if (order) order.stage = stage;
    },
    setCustomerReceived: (state, action) => {
      const order = state.items.find((o) => o.orderId === action.payload);
      if (order) order.customerReceivedAt = new Date().toISOString();
    },
    setOrderReview: (state, action) => {
      const { orderId, rating, comment } = action.payload;
      const order = state.items.find((o) => o.orderId === orderId);
      if (order) order.review = { rating, comment };
    },
    markDriverAssigned: (state, action) => {
      const order = state.items.find((o) => o.orderId === action.payload);
      if (order) order.driverAssigned = true;
    },
  },
});

export const { addOrder, updateOrderStage, setCustomerReceived, setOrderReview, markDriverAssigned } = ordersSlice.actions;
export default ordersSlice.reducer;