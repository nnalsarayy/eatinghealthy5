import React from 'react';
import BusinessCard from './business/BusinessCard';
import BusinessInfo from './business/BusinessInfo';

interface BusinessPackageProps {
  showQuantity: { [key: string]: boolean };
  quantities: { [key: string]: number };
  buttonStates: { [key: string]: boolean };
  handleButtonClick: (id: string, name: string, price: number) => void;
  adjustQuantity: (id: string, delta: number) => void;
}

const BusinessPackage: React.FC<BusinessPackageProps> = ({
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity
}) => {
  return (
    <div className="py-12 px-4 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-2xl md:text-3xl text-center mb-8">
          Företagspaket
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Business Card */}
          <div className="md:w-1/3">
            <BusinessCard
              showQuantity={showQuantity}
              quantities={quantities}
              buttonStates={buttonStates}
              handleButtonClick={handleButtonClick}
              adjustQuantity={adjustQuantity}
            />
          </div>

          {/* Business Info Section */}
          <div className="md:w-2/3 relative overflow-hidden rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <BusinessInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPackage;