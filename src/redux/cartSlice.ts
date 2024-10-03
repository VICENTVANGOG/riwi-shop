import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../interfaces/Product'; // Asegúrate de que esta ruta sea correcta

interface CartState {
  items: Product[]; // Cambia 'Product' a tu tipo de producto real si es necesario
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});


export const { addItem, removeItem, clearCart } = cartSlice.actions;


export default cartSlice.reducer;
