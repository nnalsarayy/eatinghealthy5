import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './components/layout/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';
import Checkout from './components/pages/Checkout';
import CartModal from './components/CartModal';
import ExtrasModal from './components/ExtrasModal';
import { useCart } from './hooks/useCart';
import { useCheckoutForm } from './hooks/useCheckoutForm';

const App: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    isExtrasOpen,
    pendingCartItem,
    buttonStates,
    quantities,
    showQuantity,
    setIsCartOpen,
    setIsExtrasOpen,
    setPendingCartItem,
    getTotalCartItems,
    getTotalPrice,
    removeFromCart,
    adjustQuantity,
    handleAddExtras,
    handleButtonClick
  } = useCart();

  const {
    checkoutForm,
    inputRefs,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    handleCheckoutSubmit
  } = useCheckoutForm();

  return (
    <Router>
      <ScrollToTop />
      
      {/* SVG Definitions */}
      <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD54F" />
              <stop offset="100%" stopColor="#FFB300" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        adjustQuantity={adjustQuantity}
      />
      <ExtrasModal
        isOpen={isExtrasOpen}
        onClose={() => {
          setIsExtrasOpen(false);
          setPendingCartItem(null);
        }}
        onAddToCart={handleAddExtras}
      />

      <Routes>
        <Route path="/" element={
          <HomePage
            cartItemCount={getTotalCartItems()}
            onCartClick={() => setIsCartOpen(true)}
            showQuantity={showQuantity}
            quantities={quantities}
            buttonStates={buttonStates}
            handleButtonClick={handleButtonClick}
            adjustQuantity={adjustQuantity}
          />
        } />
        <Route 
          path="/privacy-policy" 
          element={
            <PrivacyPolicy 
              cartItemCount={getTotalCartItems()} 
              onCartClick={() => setIsCartOpen(true)} 
            />
          } 
        />
        <Route 
          path="/terms" 
          element={
            <Terms 
              cartItemCount={getTotalCartItems()} 
              onCartClick={() => setIsCartOpen(true)} 
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <Checkout 
              cartItems={cartItems}
              cartItemCount={getTotalCartItems()}
              onCartClick={() => setIsCartOpen(true)}
              form={checkoutForm}
              onSubmit={handleCheckoutSubmit}
              onChange={handleInputChange}
              onInputFocus={handleInputFocus}
              onInputBlur={handleInputBlur}
              inputRefs={inputRefs}
            />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;