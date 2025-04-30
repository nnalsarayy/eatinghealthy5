import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { OrderButtonProps } from './order/OrderButtonTypes';
import { HeroButton } from './order/HeroButton';
import { QuantityControls } from './order/QuantityControls';
import { SauceSelection } from './order/SauceSelection';

export const OrderButton: React.FC<OrderButtonProps> = ({
  id,
  name = '',
  price = 0,
  small = false,
  className = '',
  isHeroButton = false,
  showQuantity = {},
  quantities = {},
  buttonStates = {},
  handleButtonClick = () => {},
  adjustQuantity = () => {},
  scrollToSection = () => {},
}) => {
  const [selectedSauce, setSelectedSauce] = useState<string>('');
  const [selectedLemon, setSelectedLemon] = useState<boolean>(false);

  const needsSauceSelection = ['shawarma', 'spett', 'cevapcici', 'lax', 'teriyaki'].includes(id);

  const handleSauceSelect = (sauce: string) => {
    setSelectedSauce(sauce);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (needsSauceSelection && !selectedSauce) {
      return;
    }

    const mealQuantity = quantities[id] || 1;
    let finalName = name;

    // Add sauce to the meal name if selected
    if (selectedSauce && selectedSauce !== 'Ingen') {
      finalName = `${name} (${selectedSauce})`;
    }

    // Add the meal with the updated name
    handleButtonClick(id, finalName, price);

    // Add lemon if selected for specific meals
    if ((id === 'lax' || id === 'teriyaki') && selectedLemon) {
      handleButtonClick(
        'extra-lemon',
        'Citron',
        7,
        true
      );
    }
    
    // Reset selections
    setSelectedSauce('');
    setSelectedLemon(false);
  };

  if (isHeroButton) {
    return <HeroButton small={small} className={className} scrollToSection={scrollToSection} />;
  }

  const currentQuantity = quantities[id] || 1;
  const totalPrice = price * currentQuantity;

  // Calculate total price including extras
  let extrasPrice = 0;
  if ((id === 'lax' || id === 'teriyaki') && selectedLemon) {
    extrasPrice += 7;
  }
  const finalTotalPrice = totalPrice + extrasPrice;

  return (
    <div className="relative">
      <div className="flex flex-col space-y-2">
        {(id === 'lax' || id === 'teriyaki') && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Tillval:</p>
            <button
              onClick={() => setSelectedLemon(!selectedLemon)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedLemon
                  ? 'bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <img 
                src="https://i.ibb.co/nsxDDpRs/IMAGE-2025-04-20-00-21-30-removebg-preview.png"
                alt="Citron"
                className="w-6 h-6 object-cover rounded-full"
              />
              Citron (+7 kr)
            </button>
          </div>
        )}

        <SauceSelection
          selectedSauce={selectedSauce}
          onSauceSelect={handleSauceSelect}
          needsSauceSelection={needsSauceSelection}
          mealId={id}
        />

        <div className="flex flex-col space-y-2">
          <QuantityControls
            quantity={currentQuantity}
            onAdjust={(delta) => adjustQuantity(id, delta)}
          />
          
          <div className="text-center text-sm text-gray-600">
            Totalt: {finalTotalPrice.toFixed(2).replace('.', ',')} kr
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={needsSauceSelection && !selectedSauce}
          className={`relative bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black rounded-xl font-semibold hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 shadow-[0_8px_30px_rgb(255,213,79,0.15)] hover:scale-105 hover:shadow-[0_8px_30px_rgb(255,213,79,0.25)] overflow-hidden group ${
            needsSauceSelection && !selectedSauce ? 'opacity-50 cursor-not-allowed' : ''
          } ${small ? 'px-8 py-3 text-sm' : 'w-full px-6 py-3'} ${className}`}
        >
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${buttonStates[id] ? 'opacity-100' : 'opacity-0'}`}>
            <Check className="w-6 h-6" />
          </span>
          <span className={`transition-opacity duration-300 ${buttonStates[id] ? 'opacity-0' : 'opacity-100'}`}>
            LÄGG TILL I VARUKORGEN
          </span>
          <span className="absolute inset-0 pointer-events-none group-active:animate-ripple bg-white/25 rounded-full scale-0" />
        </button>
      </div>
    </div>
  );
};

export default OrderButton;