import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import DeliveryForm from './checkout/DeliveryForm';
import DeliveryDate from './checkout/DeliveryDate';
import PaymentMethod from './checkout/PaymentMethod';
import OrderSummary from './checkout/OrderSummary';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  comment: string;
  doorCode?: string;
  floor?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: CheckoutForm;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onInputFocus: (inputName: string) => void;
  onInputBlur: () => void;
  inputRefs: {
    [key: string]: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  };
  cartItems?: CartItem[];
}

interface DeliveryDate {
  dayName: string;
  date: string;
  fullDate: Date;
  deliveryTime: string;
}

const validPostalCodes = [
  '70210', '70211', '70212', '70213', '70214', '70215', '70216', '70217', '70218', '70219',
  '70221', '70222', '70223', '70224', '70225', '70226', '70227', '70228', '70229', '70230',
  '70231', '70232', '70233', '70234', '70235', '70236', '70237', '70239', '70254', '70281',
  '70282', '70283', '70284', '70285', '70286', '70340', '70341', '70342', '70343', '70344',
  '70345', '70346', '70347', '70348', '70349', '70350', '70351', '70352', '70353', '70354',
  '70355', '70356', '70357', '70358', '70359', '70360', '70361', '70362', '70363', '70364',
  '70365', '70366', '70367', '70368', '70369', '70370', '70371', '70372', '70373', '70374',
  '70375', '70376', '70378', '70380', '70381', '70382', '70383', '70385', '70510', '70591',
  '70592', '70593', '70594', '70595', '70596', '70597', '70598', '71531', '71532', '71572',
  '71591', '71592', '71593', '71594', '71595', '71596', '71894', '71895', '71896', '71897',
  '71930', '71931', '71932', '71940', '71941', '71991', '71992', '71994', '71995'
];

const COUPON_USAGE_KEY = 'HE59_usage_count';
const MAX_COUPON_USES = 10;

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  form,
  onSubmit,
  onChange,
  onInputFocus,
  onInputBlur,
  inputRefs,
  cartItems = [],
}) => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>('');
  const [availableDates, setAvailableDates] = useState<DeliveryDate[]>([]);
  const [isValidPostalCode, setIsValidPostalCode] = useState(true);
  const [showPostalCodeError, setShowPostalCodeError] = useState(false);
  const [showCampaignCode, setShowCampaignCode] = useState(false);
  const [campaignCode, setCampaignCode] = useState('');
  const [campaignError, setCampaignError] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [swishPhone, setSwishPhone] = useState('');

  useEffect(() => {
    if (isOpen) {
      updateAvailableDates();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setCampaignCode('');
      setCampaignError('');
      setDiscountApplied(false);
      setSwishPhone('');
    }
  }, [isOpen]);

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const countMealItems = () => {
    return cartItems.reduce((total, item) => {
      // Only count items that are not extras and not the business package
      if (!item.id.startsWith('extra-') && item.id !== 'business-50') {
        return total + item.quantity;
      }
      return total;
    }, 0);
  };

  const validateCoupon = () => {
    if (campaignCode === 'HE59') {
      const usageCount = parseInt(localStorage.getItem(COUPON_USAGE_KEY) || '0');
      const totalItems = calculateTotalItems();

      if (usageCount >= MAX_COUPON_USES || totalItems > 5) {
        setCampaignError('Koden har löpt ut');
        setDiscountApplied(false);
        return;
      }

      setDiscountApplied(true);
      setCampaignError('');
    } else if (campaignCode) {
      setCampaignError('Koden kunde inte hittas');
      setDiscountApplied(false);
    }
  };

  const handleCampaignCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.trim();
    setCampaignCode(code);
    setCampaignError('');
  };

  const handleCampaignCodeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      validateCoupon();
    }
  };

  const handleCampaignCodeBlur = () => {
    validateCoupon();
  };

  const updateAvailableDates = () => {
    const dates: DeliveryDate[] = [];
    const now = new Date();
    const currentHour = now.getHours();
    const isAfter8PM = currentHour >= 20;
    
    const startDays = isAfter8PM ? 2 : 1;
    
    for (let i = startDays; i <= 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      
      const dayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
      const dayName = dayNames[date.getDay()];
      const formattedDate = date.toLocaleDateString('sv-SE', {
        month: 'numeric',
        day: 'numeric'
      });

      const deliveryTime = date.getDay() === 0 || date.getDay() === 6 
        ? '16:00 - 20:00'
        : '08:00 - 13:00';

      dates.push({
        dayName,
        date: formattedDate,
        fullDate: date,
        deliveryTime
      });
    }

    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDeliveryDate(dates[0].date);
    }
  };

  const validatePostalCode = (code: string) => {
    const normalizedCode = code.replace(/\s/g, '');
    return validPostalCodes.includes(normalizedCode);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowPostalCodeError(false);
    onChange(e);
  };

  const handlePostalCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const isValid = validatePostalCode(e.target.value);
    setIsValidPostalCode(isValid);
    setShowPostalCodeError(!isValid && e.target.value !== '');
    onInputBlur();
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const hasBusinessPackage = cartItems.some(item => item.id === 'business-50');
    const mealItemCount = countMealItems();
    const shippingFee = mealItemCount >= 5 || hasBusinessPackage ? 0 : 19;
    const baseTotal = subtotal + shippingFee;
    const discount = discountApplied ? baseTotal * 0.2 : 0;
    const total = baseTotal - discount;

    return { subtotal, shippingFee, discount, total };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountApplied) {
      const currentUsage = parseInt(localStorage.getItem(COUPON_USAGE_KEY) || '0');
      localStorage.setItem(COUPON_USAGE_KEY, (currentUsage + 1).toString());
    }
    onSubmit(e);
  };

  const handleSwishPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSwishPhone(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20 px-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-heading text-xl font-bold text-black">Kassan</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <DeliveryForm
            form={form}
            onChange={onChange}
            onInputFocus={onInputFocus}
            onInputBlur={onInputBlur}
            inputRefs={inputRefs}
            showPostalCodeError={showPostalCodeError}
            handlePostalCodeChange={handlePostalCodeChange}
            handlePostalCodeBlur={handlePostalCodeBlur}
          />

          <DeliveryDate
            selectedDeliveryDate={selectedDeliveryDate}
            availableDates={availableDates}
            onDateSelect={setSelectedDeliveryDate}
          />

          <OrderSummary
            cartItems={cartItems}
            showCampaignCode={showCampaignCode}
            campaignCode={campaignCode}
            campaignError={campaignError}
            discountApplied={discountApplied}
            onCampaignCodeToggle={() => setShowCampaignCode(!showCampaignCode)}
            onCampaignCodeChange={handleCampaignCodeChange}
            onCampaignCodeBlur={handleCampaignCodeBlur}
            onCampaignCodeKeyDown={handleCampaignCodeKeyDown}
            getTotalPrice={getTotalPrice}
          />

          <PaymentMethod
            selectedPayment={selectedPayment}
            onPaymentSelect={setSelectedPayment}
            swishPhone={swishPhone}
            onSwishPhoneChange={handleSwishPhoneChange}
          />

          <button
            type="submit"
            disabled={!selectedPayment || !selectedDeliveryDate || !isValidPostalCode || (selectedPayment === 'swish' && !swishPhone)}
            className={`w-full bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black font-semibold py-3 px-6 rounded-xl hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 mt-8 ${
              (!selectedPayment || !selectedDeliveryDate || !isValidPostalCode || (selectedPayment === 'swish' && !swishPhone)) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Slutför köp
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;