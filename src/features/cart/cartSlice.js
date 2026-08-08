import { createSlice } from '@reduxjs/toolkit';

let localIdSeq = 1;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { localId, menuItemId (null for custom), nameAr, nameEn, descAr, descEn, price, quantity }
  },
  reducers: {
    addItem: (state, action) => {
      const { menuItemId, nameAr, nameEn, descAr, descEn, price } = action.payload;
      const existing = state.items.find(
        (i) => i.nameAr === nameAr && i.descAr === descAr
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          localId: localIdSeq++,
          menuItemId: menuItemId ?? null,
          nameAr,
          nameEn,
          descAr,
          descEn,
          price,
          quantity: 1,
        });
      }
    },
    changeQuantity: (state, action) => {
      const { localId, delta } = action.payload;
      const item = state.items.find((i) => i.localId === localId);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.localId !== localId);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.localId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, changeQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);