import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Hero from '../Hero';
import HowItWorks from '../HowItWorks';
import Meals from '../Meals';
import BusinessPackage from '../BusinessPackage';
import CalorieCalculator from '../Pricing';
import About from '../About';
import FAQ from '../FAQ';
import Testimonials from '../Testimonials';
import Footer from '../Footer';

interface HomePageProps {
  cartItemCount: number;
  onCartClick: () => void;
  showQuantity: { [key: string]: boolean };
  quantities: { [key: string]: number };
  buttonStates: { [key: string]: boolean };
  handleButtonClick: (id: string, name: string, price: number) => void;
  adjustQuantity: (id: string, delta: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  cartItemCount,
  onCartClick,
  showQuantity,
  quantities,
  buttonStates,
  handleButtonClick,
  adjustQuantity
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
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
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar
        isScrolled={isScrolled}
        cartItemCount={cartItemCount}
        onCartClick={onCartClick}
        scrollToSection={scrollToSection}
      />

      <main>
        <Hero />
        <HowItWorks />
        <Meals
          showQuantity={showQuantity}
          quantities={quantities}
          buttonStates={buttonStates}
          handleButtonClick={handleButtonClick}
          adjustQuantity={adjustQuantity}
        />
        <BusinessPackage
          showQuantity={showQuantity}
          quantities={quantities}
          buttonStates={buttonStates}
          handleButtonClick={handleButtonClick}
          adjustQuantity={adjustQuantity}
        />
        <CalorieCalculator />
        <About />
        <FAQ />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;