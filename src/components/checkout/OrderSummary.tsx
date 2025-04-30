import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  showCampaignCode: boolean;
  campaignCode: string;
  campaignError: string;
  discountApplied: boolean;
  onCampaignCodeToggle: () => void;
  onCampaignCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCampaignCodeBlur: () => void;
  onCampaignCodeKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  getTotalPrice: () => { subtotal: number; shippingFee: number; tax: number; discount: number; total: number };
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

  if (itemId === 'five' || itemId === 'ten' || itemId === 'single') {
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

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  showCampaignCode,
  campaignCode,
  campaignError,
  discountApplied,
  onCampaignCodeToggle,
  onCampaignCodeChange,
  onCampaignCodeBlur,
  onCampaignCodeKeyDown,
  getTotalPrice,
}) => {
  const { subtotal, shippingFee, tax, discount, total } = getTotalPrice();

  return (
    <div className="mt-8 space-y-6">
      <h4 className="font-heading text-2xl font-bold text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text pb-2 border-b-2 border-gradient-to-r from-[#FFD54F] to-[#FFB300]">
        Din beställning
      </h4>
      <div className="space-y-4">
        {cartItems.map((item) => {
          const itemImage = getItemImage(item.id, item.name);
          return (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {itemImage && (
                  <img 
                    src={itemImage}
                    alt={item.name}
                    className={`w-12 h-12 ${item.id.startsWith('extra-') ? 'object-contain p-1' : 'object-cover'} rounded-lg`}
                  />
                )}
                <p className="text-sm text-gray-600">{item.quantity}x {item.name}</p>
              </div>
              <p className="text-sm font-medium text-black whitespace-nowrap">{formatPrice(item.price * item.quantity)}</p>
            </div>
          );
        })}
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delsumma</span>
            <span className="text-black font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Leverans</span>
            <span className="text-black font-medium">
              {shippingFee === 0 ? 'Gratis' : `${shippingFee} kr`}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Moms</span>
            <span className="text-black font-medium">{formatPrice(tax)}</span>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">
              Kampanjkod
            </span>
            <div className="mt-2">
              <input
                type="text"
                value={campaignCode}
                onChange={onCampaignCodeChange}
                onBlur={onCampaignCodeBlur}
                onKeyDown={onCampaignCodeKeyDown}
                placeholder="Ange kampanjkod"
                className="w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black text-sm"
              />
              {campaignError && (
                <p className="text-red-500 text-xs mt-1">{campaignError}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between text-base font-medium mt-2 pt-2 border-t">
            <span className="text-gray-800">Totalt (inkl. moms)</span>
            <div className="flex flex-col items-end">
              {discountApplied && (
                <>
                  <span className="text-gray-400 line-through text-sm">
                    {formatPrice(subtotal + shippingFee + tax)}
                  </span>
                  <span className="text-red-500 text-sm">
                    - {formatPrice(discount)}
                  </span>
                </>
              )}
              <span className="text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;