import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  text: string;
}

const StarRating = () => (
  <div className="flex gap-1 mb-2">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className="w-5 h-5"
        style={{ stroke: 'url(#icon-gradient)', fill: 'url(#icon-gradient)' }}
      />
    ))}
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, text }) => {
  return (
    <div className="bg-neutral-800 p-6 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gradient-to-r from-yellow-400/20 to-orange-500/20 h-full">
      <div className="flex items-center mb-4">
        <h3 className="font-heading font-semibold">{name}</h3>
      </div>
      <StarRating />
      <p className="text-gray-300">{text}</p>
    </div>
  );
};

export default TestimonialCard;