import React from 'react';
import { OrderButtonProps } from './OrderButtonTypes';

export const HeroButton: React.FC<Pick<OrderButtonProps, 'small' | 'className' | 'scrollToSection'>> = ({
  small = false,
  className = '',
  scrollToSection = () => {}
}) => {
  return (
    <button
      onClick={() => scrollToSection('meals-section')}
      className={`relative bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black rounded-xl font-semibold hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 shadow-[0_8px_30px_rgb(255,213,79,0.15)] hover:scale-105 hover:shadow-[0_8px_30px_rgb(255,213,79,0.25)] overflow-hidden group ${small ? 'px-8 py-3 text-sm' : 'w-full px-6 py-3'} ${className}`}
    >
      <span className="transition-opacity duration-300">
        BESTÄLL NU
      </span>
      <span className="absolute inset-0 pointer-events-none group-active:animate-ripple bg-white/25 rounded-full scale-0" />
    </button>
  );
};