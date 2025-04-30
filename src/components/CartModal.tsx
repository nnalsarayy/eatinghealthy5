import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isExtra?: boolean;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (id: string) => void;
  getTotalPrice: () => number;
  adjustQuantity?: (id: string, delta: number) => void;
}

const getItemImage = (itemId: string, itemName: string): string | null => {
  if (itemId.startsWith('extra-')) {
    const extraImages: { [key: string]: string } = {
      'extra-spett': 'https://i.ibb.co/q3T4kYKP/IMAGE-2025-04-15-20-30-25-removebg-preview.png',
      'extra-cevapcici': 'https://i.ibb.co/yczRd1nS/IMAGE-2025-04-15-20-33-24-removebg-preview.png',
      'extra-sriracha': 'https://i.ibb.co/WWhwHxX7/IMAGE-2025-04-20-23-09-10-removebg-preview.png',
      'extra-vitlok': 'https://i.ibb.co/yFYBcDQN/IMAGE-2025-04-20-23-10-16-removebg-preview.png',
      'extra-ayran': 'https://i.ibb.co/k6wgvh98/IMAGE-2025-04-20-22-43-10-removebg-preview.png',
      'extra-lemon': 'https://i.ibb.co/nsxDDpRs/IMAGE-2025-04-20-00-21-30-removebg-preview.png'
    };
    return extraImages[itemId] || null;
  }

  const images: { [key: string]: string } = {
    shawarma: 'https://i.ibb.co/gbj9crjb/IMAGE-2025-04-12-14-37-11.jpg',
    spett: 'https://i.ibb.co/jPHLg8TR/IMAGE-2025-04-12-14-37-01.jpg',
    cevapcici: 'https://i.ibb.co/PZ2TrdBB/IMAGE-2025-04-12-14-37-06.jpg',
    pasta: 'https://i.ibb.co/Cp5n3GNZ/IMAGE-2025-04-19-22-36-22.jpg',
    lax: 'https://i.ibb.co/CpD0tsms/IMAGE-2025-04-19-22-36-26.jpg',
    teriyaki: 'https://i.ibb.co/GBR9NdL/IMAGE-2025-04-20-22-32-47.jpg',
    'business-50': 'https://i.ibb.co/1GBZ1Rsx/IMAGE-2025-04-14-14-25-23.jpg'
  };

  const baseId = itemId.split('-')[0];
  if (baseId === 'five' || baseId === 'ten' || baseId === 'single') {
    if (itemName.includes('Kyckling Shawarma')) return images.shawarma;
    if (itemName.includes('Kyckling Spett')) return images.spett;
    if (itemName.includes('Cevapcici')) return images.cevapcici;
    if (itemName.includes('Laxfile')) return images.lax;
    if (itemName.includes('Teriyaki')) return images.teriyaki;
  }

  return images[itemId] || null;
};

const formatPrice = (price: number) => {
  const formattedPrice = price.toFixed(2).replace('.', ',');
  if (Number(formattedPrice.replace(',', '.')) >= 10000) {
    return `${Math.floor(Number(formattedPrice.replace(',', '.'))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} kr`;
  }
  return `${formattedPrice} kr`;
};

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  removeFromCart,
  getTotalPrice,
  adjustQuantity,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  // Filter out sauce items as they're now part of the meal names
  const displayItems = cartItems.filter(item => !item.id.startsWith('sauce_'));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-10 md:pt-20 px-2 md:px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-2 md:mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-xl font-bold text-black">Din varukorg</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {displayItems.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Din varukorg är tom</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {displayItems.map((item) => {
                const itemImage = getItemImage(item.id, item.name);
                return (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      {itemImage && (
                        <img 
                          src={itemImage}
                          alt={item.name}
                          className={`w-16 h-16 ${item.isExtra ? 'object-contain p-2' : 'object-cover'} rounded-lg`}
                        />
                      )}
                      <div>
                        <h4 className="font-medium text-black text-sm md:text-base">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => adjustQuantity?.(item.id, -1)}
                            className="text-gray-500 hover:text-black transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-gray-500">{item.quantity}</span>
                          <button
                            onClick={() => adjustQuantity?.(item.id, 1)}
                            className="text-gray-500 hover:text-black transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="font-semibold text-black whitespace-nowrap text-sm md:text-base">
                        {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="font-heading font-bold text-black">Totalt:</span>
                <span className="font-heading font-bold text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text text-xl whitespace-nowrap">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black font-semibold py-3 px-6 rounded-xl hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300"
              >
                Till kassan
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;