import { useState, useRef, useEffect } from 'react';
import { CheckoutForm, InputRefs } from '../types';

export const useCheckoutForm = () => {
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    email: '',
    comment: '',
    doorCode: '',
    floor: '',
    termsAccepted: false
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const inputRefs: InputRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    address: useRef<HTMLInputElement>(null),
    postalCode: useRef<HTMLInputElement>(null),
    city: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    comment: useRef<HTMLTextAreaElement>(null),
    doorCode: useRef<HTMLInputElement>(null),
    floor: useRef<HTMLInputElement>(null)
  };

  useEffect(() => {
    if (focusedInput && inputRefs[focusedInput]?.current) {
      inputRefs[focusedInput].current?.focus();
    }
  }, [checkoutForm, focusedInput]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutForm(prev => ({
      ...prev,
      termsAccepted: e.target.checked
    }));
  };

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setFocusedInput(null);
    }, 100);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checkout form submitted:', checkoutForm);
  };

  return {
    checkoutForm,
    inputRefs,
    handleInputChange,
    handleTermsChange,
    handleInputFocus,
    handleInputBlur,
    handleCheckoutSubmit
  };
};