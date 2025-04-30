import React from 'react';
import { MenuSquare, ChefHat, Truck } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div id="how-it-works" className="py-16 px-4 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-12">
          Hälsosam Mat – På Ett Enkelt Sätt
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <MenuSquare className="w-16 h-16 stroke-[#FFC107] mx-auto mb-4" style={{ stroke: 'url(#icon-gradient)' }} />
            <h3 className="font-heading text-xl font-semibold mb-2">Välj dina måltider</h3>
            <p className="text-gray-600">Välj bland våra näringsrika och välbalanserade måltider</p>
          </div>
          <div className="text-center">
            <ChefHat className="w-16 h-16 stroke-[#FFC107] mx-auto mb-4" style={{ stroke: 'url(#icon-gradient)' }} />
            <h3 className="font-heading text-xl font-semibold mb-2">Vi lagar och packar färskt</h3>
            <p className="text-gray-600">Våra kockar tillagar din mat med färska råvaror</p>
          </div>
          <div className="text-center">
            <Truck className="w-16 h-16 stroke-[#FFC107] mx-auto mb-4" style={{ stroke: 'url(#icon-gradient)' }} />
            <h3 className="font-heading text-xl font-semibold mb-2">Måltider levererade till dig</h3>
            <p className="text-gray-600">Bekväm hemleverans direkt till din dörr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;