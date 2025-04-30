import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ExtraOptionsProps {
  selectedDrink: boolean;
  selectedLemon: boolean;
  ayranQuantity: number;
  onDrinkToggle: () => void;
  onLemonToggle: () => void;
  onAyranQuantityAdjust: (delta: number) => void;
  showLemonOption: boolean;
}

export const ExtraOptions: React.FC<ExtraOptionsProps> = ({
  selectedDrink,
  selectedLemon,
  ayranQuantity,
  onDrinkToggle,
  onLemonToggle,
  onAyranQuantityAdjust,
  showLemonOption
}) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Tillval:</p>
      <div className="space-y-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start">
            <button
              onClick={onDrinkToggle}
              className={`inline-flex items-center gap-2 py-1.5 px-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedDrink
                  ? 'bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <img 
                src="https://i.ibb.co/k6wgvh98/IMAGE-2025-04-20-22-43-10-removebg-preview.png"
                alt="Ayran"
                className="w-5 h-5 object-contain rounded-full"
              />
              <span className="whitespace-nowrap">Ayran (+12 kr)</span>
            </button>
            {selectedDrink && (
              <div className="flex items-center gap-3 mt-2 ml-2">
                <button
                  onClick={() => onAyranQuantityAdjust(-1)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-black min-w-[20px] text-center">{ayranQuantity}</span>
                <button
                  onClick={() => onAyranQuantityAdjust(1)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        {showLemonOption && (
          <button
            onClick={onLemonToggle}
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
        )}
      </div>
    </div>
  );
};

export default ExtraOptions;