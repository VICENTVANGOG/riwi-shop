"use client";
import React, { useState } from 'react';
import ClientLayout from '@/components/layoutCliente/loyout';
import Product from '@/components/product/product';
import Navbar from '@/components/Navbar/Navbar'; 
import { I18nProvider } from '../I18nProvider';
import './home.scss'; 
import store from '@/redux/store';
import { Provider } from 'react-redux';
import Cart from '@/components/cart/cart';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(''); 

  const handleLogout = () => {
 
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category); 
  };

  return (
    <Provider store={store}>
      <I18nProvider> 
        <ClientLayout>
          <Navbar onLogout={handleLogout} onSelectCategory={handleSelectCategory} /> 
          <Product selectedCategory={selectedCategory} /> 
          <Cart/>
        </ClientLayout>
      </I18nProvider>
    </Provider>
  );
};

export default HomePage;
