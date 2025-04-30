import React, { useRef } from 'react';
import TestimonialCard from './testimonials/TestimonialCard';
import NavigationArrows from './testimonials/NavigationArrows';
import { testimonials } from './testimonials/TestimonialData';

const Testimonials: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div id="testimonials" className="py-16 px-4 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
          Älskad av Healthy Eaters
        </h2>
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="flex-none w-full md:w-[calc(33.333%-1.33rem)] snap-center"
              >
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
          
          <NavigationArrows onScroll={scroll} />
          <NavigationArrows onScroll={scroll} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;