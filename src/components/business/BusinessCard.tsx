import React, { useState, useRef, useEffect } from 'react';
import { OrderButton } from '../OrderButton';

interface BusinessCardProps {
  showQuantity: { [key: string]: boolean };
  quantities: { [key: string]: number };
  buttonStates: { [key: string]: boolean };
  handleButtonClick: (id: string, name: string, price: number) => void;
  adjustQuantity: (id: string, delta: number) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
      className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-103"
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src="https://i.ibb.co/p6jzhSjR/IMAGE-2025-04-17-21-58-08.jpg"
          alt="50st Matlådor" 
          className="w-full h-full object-cover scale-100 transform hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold mb-1">50st Matlådor</h3>
        <p className="text-gray-500 text-sm mb-2">50st Mix Matlådor + 50st Mix Såser</p>
        <div className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-xl font-bold mb-3">
          2799,99 kr
        </div>
        
        {isExpanded ? (
          <OrderButton
            id="business-50"
            name="50st Mix Matlådor + 50st Mix Såser"
            price={2799.99}
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
              id="business-50"
              name="50st Mix Matlådor + 50st Mix Såser"
              price={2799.99}
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

export default BusinessCard;