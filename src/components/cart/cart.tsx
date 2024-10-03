import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaShoppingCart } from 'react-icons/fa';
import { removeItem } from '@/redux/cartSlice'; 
import { CartItem } from '@/redux/interfaces/CartItem'; 
import './Cart.scss';

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const totalPrice = items.reduce((total, item: CartItem) => total + (item.price * item.quantity), 0);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id)); 
  };

  return (
    <>
      <div className="cart" onClick={toggleModal}>
        <FaShoppingCart size={30} />
        {isClient && items.length > 0 && <span>{items.length}</span>}
      </div>

      <div className={`modal ${isModalOpen ? 'open' : ''}`}>
        <span className="close-button" onClick={toggleModal}>✖</span>
        <h2>Your Cart</h2>
        <div className="cart-items">
          {items.length > 0 ? (
            items.map((item: CartItem) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="delete"><button onClick={() => handleRemoveItem(item.id)}>Remove</button></div>
                
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="total">Total: ${totalPrice.toFixed(2)}</div>
      </div>
    </>
  );
};

export default Cart;
