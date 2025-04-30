import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { OrderButtonProps } from './OrderButtonTypes';
import { HeroButton } from './HeroButton';
import { QuantityControls } from './QuantityControls';
import { ExtraOptions } from './ExtraOptions';
import { SauceSelection } from './SauceSelection';

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
  const [selectedDrink, setSelectedDrink] = useState<boolean>(false);
  const [ayranQuantity, setAyranQuantity] = useState(1);

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

    // First add the base meal
    handleButtonClick(id, name, price);

    // Then add the sauce if selected (this will modify the meal name)
    if (selectedSauce && selectedSauce !== 'Ingen') {
      const sauceId = `sauce_${selectedSauce.toLowerCase()}`;
      handleButtonClick(sauceId, selectedSauce, 0);
    }

    // Add extras if selected
    if ((id === 'lax' || id === 'teriyaki') && selectedLemon) {
      handleButtonClick('extra-lemon', 'Citron', 7, true);
    }

    if (selectedDrink) {
      handleButtonClick('extra-ayran', 'Ayran', 15 * ayranQuantity, true);
    }
    
    // Reset selections
    setSelectedSauce('');
    setSelectedLemon(false);
    setSelectedDrink(false);
    setAyranQuantity(1);
  };

  if (isHeroButton) {
    return <HeroButton small={small} className={className} scrollToSection={scrollToSection} />;
  }

  const currentQuantity = quantities[id] || 1;
  const totalPrice = price * currentQuantity;

  return (
    <div className="relative">
      <div className="flex flex-col space-y-2">
        <ExtraOptions
          selectedDrink={selectedDrink}
          selectedLemon={selectedLemon}
          ayranQuantity={ayranQuantity}
          onDrinkToggle={() => setSelectedDrink(!selectedDrink)}
          onLemonToggle={() => setSelectedLemon(!selectedLemon)}
          onAyranQuantityAdjust={(delta) => setAyranQuantity(prev => Math.max(1, prev + delta))}
          showLemonOption={id === 'lax' || id === 'teriyaki'}
        />

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
            Totalt: {totalPrice.toFixed(2).replace('.', ',')} kr
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