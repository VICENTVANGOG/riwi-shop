import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usar localStorage
import cartReducer from './cartSlice';
import { PersistConfig } from 'redux-persist/es/types';
import { Product } from '../interfaces/Product';

// Define el tipo del estado del carrito
interface CartState {
  items: Product[]; // Asegúrate de importar tu interfaz Product
}

// Configuración de persistencia
const persistConfig: PersistConfig<CartState> = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

// Crea el persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
