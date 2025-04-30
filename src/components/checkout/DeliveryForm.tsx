import React from 'react';
import { Link } from 'react-router-dom';

interface DeliveryFormProps {
  form: {
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
    termsAccepted: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onInputFocus: (inputName: string) => void;
  onInputBlur: () => void;
  inputRefs: {
    [key: string]: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  };
  showPostalCodeError: boolean;
  handlePostalCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePostalCodeBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onTermsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({
  form,
  onChange,
  onInputFocus,
  onInputBlur,
  inputRefs,
  showPostalCodeError,
  handlePostalCodeChange,
  handlePostalCodeBlur,
  onTermsChange
}) => {
  return (
    <div className="space-y-6">
      <h4 className="font-heading text-2xl font-bold text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text pb-2 border-b-2 border-gradient-to-r from-[#FFD54F] to-[#FFB300]">
        Leveransuppgifter
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Förnamn*
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            ref={inputRefs.firstName as React.RefObject<HTMLInputElement>}
            value={form.firstName}
            onChange={onChange}
            onFocus={() => onInputFocus('firstName')}
            onBlur={onInputBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Efternamn*
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            ref={inputRefs.lastName as React.RefObject<HTMLInputElement>}
            value={form.lastName}
            onChange={onChange}
            onFocus={() => onInputFocus('lastName')}
            onBlur={onInputBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          Adress*
        </label>
        <input
          type="text"
          id="address"
          name="address"
          ref={inputRefs.address as React.RefObject<HTMLInputElement>}
          value={form.address}
          onChange={onChange}
          onFocus={() => onInputFocus('address')}
          onBlur={onInputBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
          Postnummer*
        </label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          ref={inputRefs.postalCode as React.RefObject<HTMLInputElement>}
          value={form.postalCode}
          onChange={handlePostalCodeChange}
          onFocus={() => onInputFocus('postalCode')}
          onBlur={handlePostalCodeBlur}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black ${
            showPostalCodeError ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {showPostalCodeError && (
          <p className="text-red-500 text-sm mt-1">Leveranser sker endast inom Örebro kommun</p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          Ort*
        </label>
        <input
          type="text"
          id="city"
          name="city"
          ref={inputRefs.city as React.RefObject<HTMLInputElement>}
          value={form.city}
          onChange={onChange}
          onFocus={() => onInputFocus('city')}
          onBlur={onInputBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="deliveryPhone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefonnummer*
        </label>
        <input
          type="tel"
          id="deliveryPhone"
          name="phone"
          ref={inputRefs.phone as React.RefObject<HTMLInputElement>}
          value={form.phone}
          onChange={onChange}
          onFocus={() => onInputFocus('phone')}
          onBlur={onInputBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          E-post*
        </label>
        <input
          type="email"
          id="email"
          name="email"
          ref={inputRefs.email as React.RefObject<HTMLInputElement>}
          value={form.email}
          onChange={onChange}
          onFocus={() => onInputFocus('email')}
          onBlur={onInputBlur}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="doorCode" className="block text-sm font-medium text-gray-700 mb-1">
            Portkod
          </label>
          <input
            type="text"
            id="doorCode"
            name="doorCode"
            value={form.doorCode}
            onChange={onChange}
            onFocus={() => onInputFocus('doorCode')}
            onBlur={onInputBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
          />
        </div>
        <div>
          <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">
            Våningsplan
          </label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={form.floor}
            onChange={onChange}
            onFocus={() => onInputFocus('floor')}
            onBlur={onInputBlur}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black"
          />
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Kommentar
        </label>
        <textarea
          id="comment"
          name="comment"
          ref={inputRefs.comment as React.RefObject<HTMLTextAreaElement>}
          value={form.comment}
          onChange={onChange}
          onFocus={() => onInputFocus('comment')}
          onBlur={onInputBlur}
          className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent text-black resize-none"
          style={{ 
            height: '100px',
            padding: '8px',
            verticalAlign: 'top',
            lineHeight: '1.5'
          }}
        />
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          name="termsAccepted"
          checked={form.termsAccepted}
          onChange={onTermsChange}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          Jag har läst och godkänner <Link to="/terms" className="text-[#FFB300] hover:underline">allmänna villkor</Link> och <Link to="/privacy-policy" className="text-[#FFB300] hover:underline">integritetspolicy</Link>*
        </label>
      </div>
    </div>
  );
};

export default DeliveryForm;