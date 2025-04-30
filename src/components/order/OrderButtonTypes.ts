export interface OrderButtonProps {
  id: string;
  name?: string;
  price?: number;
  small?: boolean;
  className?: string;
  isHeroButton?: boolean;
  showQuantity?: { [key: string]: boolean };
  quantities?: { [key: string]: number };
  buttonStates?: { [key: string]: boolean };
  handleButtonClick?: (id: string, name: string, price: number) => void;
  adjustQuantity?: (id: string, delta: number) => void;
  scrollToSection?: (id: string) => void;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  quantity: number;
}