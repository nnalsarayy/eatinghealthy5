import React from 'react';

const Hero: React.FC = () => {
  const scrollToMeals = () => {
    const element = document.getElementById('meals-section');
    if (element) {
      const navbarHeight = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${window.innerWidth < 768 
          ? 'https://i.ibb.co/cXVVK92r/IMAGE-2025-04-12-13-21-03.jpg'
          : 'https://i.ibb.co/qYyd9PDt/IMAGE-2025-04-10-21-40-37.jpg'
        })`,
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/20">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl mb-6 max-w-4xl">
            <span className="md:hidden">
              Hälsosamma{'\n'}
              Matlådor - Örebro
            </span>
            <span className="hidden md:inline">
              Hälsosamma Matlådor{'\n'}
              Örebro
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl">
            Smidiga och näringsrika matlådor – klara att avnjutas.
          </p>
          <button
            onClick={scrollToMeals}
            className="relative bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black rounded-xl font-semibold px-8 py-3 hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 shadow-[0_8px_30px_rgb(255,213,79,0.15)] hover:scale-105 hover:shadow-[0_8px_30px_rgb(255,213,79,0.25)] overflow-hidden group"
          >
            <span className="transition-opacity duration-300">
              BESTÄLL NU!
            </span>
            <span className="absolute inset-0 pointer-events-none group-active:animate-ripple bg-white/25 rounded-full scale-0" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;