import React from 'react';

interface NutritionInfoProps {
  calories: number;
  protein: number;
}

const NutritionInfo: React.FC<NutritionInfoProps> = ({ calories, protein }) => {
  return (
    <div className="absolute top-4 right-4">
      <div className="bg-white/90 rounded-full w-16 h-16 flex flex-col items-center justify-center text-black shadow-lg p-1">
        <div className="text-[10px] leading-tight font-semibold text-center">
          <div>{calories} kcal</div>
          <div>{protein}g protein</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionInfo;