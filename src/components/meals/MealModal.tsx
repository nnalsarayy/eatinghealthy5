import React from 'react';
import { X } from 'lucide-react';
import { OrderButton } from '../OrderButton';

interface MealModalProps {
  meal: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    calories: number;
    protein: number;
  } | null;
  onClose: () => void;
  showQuantity: { [key: string]: boolean };
  quantities: { [key: string]: number };
  buttonStates: { [key: string]: boolean };
  handleButtonClick: (id: string, name: string, price: number) => void;
  adjustQuantity: (id: string, delta: number) => void;
}

const MealModal: React.FC<MealModalProps> = ({
  meal,
  onClose,
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity
}) => {
  if (!meal) return null;

  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  const handleAddToCart = (id: string, name: string, price: number) => {
    handleButtonClick(id, name, price);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={meal.image}
            alt={meal.name}
            className="w-full aspect-square object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="absolute top-4 left-4">
            <div className="bg-white/90 rounded-full w-16 h-16 flex flex-col items-center justify-center text-black shadow-lg p-1">
              <div className="text-[10px] leading-tight font-semibold text-center">
                <div>{meal.calories} kcal</div>
                <div>{meal.protein}g protein</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold mb-1">{meal.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{meal.description}</p>
          <div className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-2xl font-bold mb-4">
            {formatPrice(meal.price)} kr
          </div>
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
    </div>
  );
};

export default MealModal;