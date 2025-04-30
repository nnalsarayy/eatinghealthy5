import React from 'react';

interface PaymentMethodProps {
  selectedPayment: string;
  onPaymentSelect: (method: string) => void;
  swishPhone: string;
  onSwishPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  selectedPayment,
  onPaymentSelect,
  swishPhone,
  onSwishPhoneChange,
}) => {
  return (
    <div className="mt-8 space-y-6">
      <h4 className="font-heading text-2xl font-bold text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text pb-2 border-b-2 border-gradient-to-r from-[#FFD54F] to-[#FFB300]">
        Betalningsmetod
      </h4>
      <button
        type="button"
        onClick={() => onPaymentSelect('swish')}
        className={`w-full px-4 py-3 border rounded-lg text-left transition-all duration-200 flex items-center justify-between ${
          selectedPayment === 'swish'
            ? 'border-[#FFD54F] bg-yellow-50'
            : 'border-gray-300 hover:border-[#FFD54F]'
        }`}
      >
        <span className="text-black font-medium">Swish</span>
        <img 
          src="https://i.ibb.co/jPtZxwTR/Swish-Logo-Secondary-Light-BG.png"
          alt="Swish"
          className="h-5 w-auto"
        />
      </button>

      {selectedPayment === 'swish' && (
        <div className="space-y-6">
          <label htmlFor="swishPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefonnummer för Swish*
          </label>
          <input
            type="tel"
            id="swishPhone"
            name="swishPhone"
            value={swishPhone}
            onChange={onSwishPhoneChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
            required
            placeholder="07X XXX XX XX"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;