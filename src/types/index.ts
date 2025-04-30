export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isExtra?: boolean;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutForm {
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
}

export interface InputRefs {
  [key: string]: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
}