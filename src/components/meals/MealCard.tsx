import React from 'react';
import { OrderButton } from '../OrderButton';

interface MealCardProps {
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
  onMealClick: (id: string) => void;
}

const MealCard: React.FC<MealCardProps> = ({
  meal,
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity,
  onMealClick
}) => {
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace('.', ',');
  };

  return (
    <div 
      key={meal.id} 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
      onClick={() => onMealClick(meal.id)}
    >
      <div className="flex items-center p-4">
        <img 
          src={meal.image}
          alt={meal.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="ml-4 flex-1">
          <h3 className="font-heading text-lg font-bold">{meal.name}</h3>
          <p className="text-sm text-gray-500">{meal.calories} kcal • {meal.protein}g protein</p>
          <div className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-lg font-bold">
            {formatPrice(meal.price)} kr
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;