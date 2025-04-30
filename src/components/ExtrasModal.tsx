import React, { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';

interface Extra {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ExtrasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (extras: Extra[]) => void;
}

const ExtrasModal: React.FC<ExtrasModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [extras, setExtras] = useState<Extra[]>([
    { 
      id: 'extra-ayran', 
      name: 'Ayran', 
      price: 12, 
      quantity: 0,
      image: 'https://i.ibb.co/k6wgvh98/IMAGE-2025-04-20-22-43-10-removebg-preview.png'
    },
    { 
      id: 'extra-spett', 
      name: '1st Kyckling Spett', 
      price: 20, 
      quantity: 0,
      image: 'https://i.ibb.co/q3T4kYKP/IMAGE-2025-04-15-20-30-25-removebg-preview.png'
    },
    { 
      id: 'extra-cevapcici', 
      name: '3st Cevapcici', 
      price: 20, 
      quantity: 0,
      image: 'https://i.ibb.co/yczRd1nS/IMAGE-2025-04-15-20-33-24-removebg-preview.png'
    },
    { 
      id: 'extra-sriracha', 
      name: 'Sriracha', 
      price: 7, 
      quantity: 0,
      image: 'https://i.ibb.co/WWhwHxX7/IMAGE-2025-04-20-23-09-10-removebg-preview.png'
    },
    { 
      id: 'extra-vitlok', 
      name: 'Vitlök', 
      price: 7, 
      quantity: 0,
      image: 'https://i.ibb.co/yFYBcDQN/IMAGE-2025-04-20-23-10-16-removebg-preview.png'
    },
  ]);

  const hasSelectedExtras = extras.some(extra => extra.quantity > 0);

  const adjustQuantity = (id: string, delta: number) => {
    setExtras(prev => prev.map(extra => {
      if (extra.id === id) {
        return { ...extra, quantity: Math.max(0, extra.quantity + delta) };
      }
      return extra;
    }));
  };

  const handleAddToCart = () => {
    const selectedExtras = extras.filter(extra => extra.quantity > 0);
    onAddToCart(selectedExtras);
    onClose();
    setExtras(prev => prev.map(extra => ({ ...extra, quantity: 0 })));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-auto my-4 max-h-[90vh] flex flex-col animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-heading text-lg font-bold text-black">Tillval</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4 flex-1 overflow-y-auto">
          {extras.map((extra) => (
            <div key={extra.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <img 
                  src={extra.image}
                  alt={extra.name}
                  className="w-12 h-12 object-contain rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-black text-sm">{extra.name}</h4>
                  <p className="text-xs text-gray-500">{extra.price} kr</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustQuantity(extra.id, -1)}
                  className="text-gray-500 hover:text-black transition-colors"
                  disabled={extra.quantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-black min-w-[20px] text-center text-sm">{extra.quantity}</span>
                <button
                  onClick={() => adjustQuantity(extra.id, 1)}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={hasSelectedExtras ? handleAddToCart : onClose}
          className="w-full bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black font-semibold py-2.5 px-6 rounded-xl hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 text-sm"
        >
          {hasSelectedExtras ? 'LÄGG TILL I VARUKORGEN' : 'GÅ VIDARE'}
        </button>
      </div>
    </div>
  );
};

export default ExtrasModal;