import React, { useRef, useState, useEffect } from 'react';
import MealCard from './meals/MealCard';
import MealModal from './meals/MealModal';
import DesktopMealCard from './meals/DesktopMealCard';
import NavigationArrows from './meals/NavigationArrows';
import { meals } from './meals/MealData';

interface MealsProps {
  showQuantity: { [key: string]: boolean };
  quantities: { [key: string]: number };
  buttonStates: { [key: string]: boolean };
  handleButtonClick: (id: string, name: string, price: number) => void;
  adjustQuantity: (id: string, delta: number) => void;
}

const Meals: React.FC<MealsProps> = ({
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      window.addEventListener('resize', checkScrollPosition);

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  useEffect(() => {
    if (selectedMeal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMeal]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth;
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const openMealModal = (id: string) => {
    setSelectedMeal(id);
  };

  const selectedMealData = meals.find(meal => meal.id === selectedMeal);

  return (
    <div id="meals-section" className="py-16 px-4 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-10">
          Utforska Våra Utsökta Måltider
        </h2>
        
        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              showQuantity={showQuantity}
              quantities={quantities}
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
              adjustQuantity={adjustQuantity}
              onMealClick={openMealModal}
            />
          ))}
        </div>

        {/* Mobile Modal */}
        <MealModal
          meal={selectedMealData}
          onClose={() => setSelectedMeal(null)}
          showQuantity={showQuantity}
          quantities={quantities}
          buttonStates={buttonStates}
          handleButtonClick={handleButtonClick}
          adjustQuantity={adjustQuantity}
        />

        {/* Desktop Layout */}
        <div className="relative hidden md:block">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {meals.map((meal) => (
              <div key={meal.id} className="flex-none w-[calc(33.333%-1.33rem)] lg:w-[calc(25%-1rem)] snap-center">
                <DesktopMealCard
                  meal={meal}
                  showQuantity={showQuantity}
                  quantities={quantities}
                  buttonStates={buttonStates}
                  handleButtonClick={handleButtonClick}
                  adjustQuantity={adjustQuantity}
                />
              </div>
            ))}
          </div>

          {/* Desktop Navigation Arrows */}
          <NavigationArrows
            showLeftArrow={showLeftArrow}
            showRightArrow={showRightArrow}
            onScroll={scroll}
          />
        </div>
      </div>
    </div>
  );
};

export default Meals;