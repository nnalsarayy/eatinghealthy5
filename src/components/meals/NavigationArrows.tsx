import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationArrowsProps {
  showLeftArrow: boolean;
  showRightArrow: boolean;
  onScroll: (direction: 'left' | 'right') => void;
  isMobile?: boolean;
}

const NavigationArrows: React.FC<NavigationArrowsProps> = ({
  showLeftArrow,
  showRightArrow,
  onScroll,
  isMobile = false
}) => {
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => onScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/80 backdrop-blur-sm"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => onScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-neutral-800/80 backdrop-blur-sm"
          style={{ transform: 'translate(50%, -50%)' }}
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </>
    );
  }

  return (
    <>
      {showLeftArrow && (
        <button
          onClick={() => onScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={() => onScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </>
  );
};

export default NavigationArrows;