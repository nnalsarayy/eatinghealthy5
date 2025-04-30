import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface QuantityControlsProps {
  quantity: number;
  onAdjust: (delta: number) => void;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({ quantity, onAdjust }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAdjust(-1);
        }}
        className="text-black bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-black font-semibold text-lg min-w-[20px] text-center">
        {quantity}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAdjust(1);
        }}
        className="text-black bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};