import { useState } from 'react';
import { CartItem, Extra } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState<CartItem | null>(null);
  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({});
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [showQuantity, setShowQuantity] = useState<{ [key: string]: boolean }>({});

  const getTotalCartItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const adjustQuantity = (buttonId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === buttonId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));

    setQuantities(prev => ({
      ...prev,
      [buttonId]: Math.max(1, (prev[buttonId] || 1) + delta)
    }));
  };

  const handleAddExtras = (extras: Extra[]) => {
    extras.forEach(extra => {
      const extraItem = {
        id: extra.id,
        name: extra.name,
        price: extra.price,
        quantity: extra.quantity,
        isExtra: true
      };
      setCartItems(prev => [...prev, extraItem]);
    });
  };

  const handleButtonClick = (buttonId: string, itemName: string, price: number, isExtra = false) => {
    const quantity = quantities[buttonId] || 1;

    // Handle sauce selection for meals
    if (buttonId.startsWith('sauce_')) {
      const sauceName = buttonId === 'sauce_sriracha' ? 'Sriracha' : 'Vitlök';
      
      setCartItems(prev => {
        // Find the most recent non-extra item
        const lastMealIndex = [...prev].map((item, index) => ({ item, index }))
          .reverse()
          .find(({ item }) => !item.isExtra)?.index;

        if (lastMealIndex !== undefined) {
          // Create updated meal with sauce
          const updatedMeal = {
            ...prev[lastMealIndex],
            name: `${prev[lastMealIndex].name} (${sauceName})`
          };

          // Check if this exact meal + sauce combination already exists
          const existingComboIndex = prev.findIndex((item, index) => 
            index !== lastMealIndex && 
            item.id === updatedMeal.id && 
            item.name === updatedMeal.name
          );

          if (existingComboIndex >= 0) {
            // Combine quantities if same meal + sauce exists
            return prev
              .filter((_, index) => index !== lastMealIndex)
              .map((item, index) => 
                index === existingComboIndex 
                  ? { ...item, quantity: item.quantity + updatedMeal.quantity }
                  : item
              );
          }

          // Update the meal with sauce
          return prev.map((item, index) => 
            index === lastMealIndex ? updatedMeal : item
          );
        }
        return prev;
      });
      return;
    }

    // Handle regular items and extras
    const newItem: CartItem = {
      id: buttonId,
      name: itemName,
      price: price,
      quantity: quantity,
      isExtra
    };

    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.id === buttonId && 
        item.name === itemName
      );

      if (existingItemIndex >= 0) {
        return prev.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
    
    setButtonStates(prev => ({ ...prev, [buttonId]: true }));
    setShowQuantity(prev => ({ ...prev, [buttonId]: false }));
    setQuantities(prev => ({ ...prev, [buttonId]: 1 }));
    
    setTimeout(() => {
      setButtonStates(prev => ({ ...prev, [buttonId]: false }));
    }, 150);

    if (!isExtra && buttonId !== 'business-50') {
      setIsExtrasOpen(true);
    }
  };

  return {
    cartItems,
    isCartOpen,
    isCheckoutOpen,
    isExtrasOpen,
    pendingCartItem,
    buttonStates,
    quantities,
    showQuantity,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsExtrasOpen,
    setPendingCartItem,
    getTotalCartItems,
    getTotalPrice,
    removeFromCart,
    adjustQuantity,
    handleAddExtras,
    handleButtonClick
  };
};