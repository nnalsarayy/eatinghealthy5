import React, { useState, useEffect, useRef } from 'react';
import { OrderButton } from '../OrderButton';
import NutritionInfo from '../NutritionInfo';

interface DesktopMealCardProps {
  meal: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    calories: number;
    protein: number;
  };
  showQuantity: { [key: string]: boolean };
  quantities: { [key: string]: number };
  buttonStates: { [key: string]: boolean };
  handleButtonClick: (id: string, name: string, price: number) => void;
  adjustQuantity: (id: string, delta: number) => void;
}

const DesktopMealCard: React.FC<DesktopMealCardProps> = ({
  meal,
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOrderClick = () => {
    setIsExpanded(true);
  };

  const handleAddToCart = (id: string, name: string, price: number) => {
    handleButtonClick(id, name, price);
    setIsExpanded(false);
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-103 ${
        isExpanded ? 'relative z-10' : ''
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <NutritionInfo calories={meal.calories} protein={meal.protein} />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold mb-1">{meal.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{meal.description}</p>
        <div className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-2xl font-bold mb-4">
          {formatPrice(meal.price)} kr
        </div>
        
        {isExpanded ? (
          <OrderButton
            id={meal.id}
            name={meal.name}
            price={meal.price}
            showQuantity={showQuantity}
            quantities={quantities}
            buttonStates={buttonStates}
            handleButtonClick={handleAddToCart}
            adjustQuantity={adjustQuantity}
          />
        ) : (
          <button
            onClick={handleOrderClick}
            className="w-full bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black rounded-xl font-semibold py-3 px-6 hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 shadow-[0_8px_30px_rgb(255,213,79,0.15)] hover:scale-105 hover:shadow-[0_8px_30px_rgb(255,213,79,0.25)]"
          >
            BESTÄLL NU
          </button>
        )}
      </div>

      {/* Expanded Options Dropdown */}
      {isExpanded && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-b-xl overflow-hidden z-20 animate-fade-in">
          <div className="p-6 border-t border-gray-100">
            <OrderButton
              id={meal.id}
              name={meal.name}
              price={meal.price}
              showQuantity={showQuantity}
              quantities={quantities}
              buttonStates={buttonStates}
              handleButtonClick={handleAddToCart}
              adjustQuantity={adjustQuantity}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopMealCard;