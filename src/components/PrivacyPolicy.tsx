import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Shield, Lock, UserCheck, Clock, Database, Cookie } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PrivacyPolicyProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ cartItemCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('.policy-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const sections = [
    { id: 'collection', title: '1. Information vi samlar in', icon: Shield },
    { id: 'purpose', title: '2. Syfte', icon: UserCheck },
    { id: 'sharing', title: '3. Delning av information', icon: Lock },
    { id: 'storage', title: '4. Lagring', icon: Database },
    { id: 'cookies', title: '5. Cookies', icon: Cookie },
    { id: 'contact', title: '6. Kontakt', icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar 
        isScrolled={isScrolled} 
        cartItemCount={cartItemCount} 
        onCartClick={onCartClick} 
        scrollToSection={handleNavClick}
      />
      <div className="pt-[110px]">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">
              Integritetspolicy
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Din integritet är viktig för oss. Här förklarar vi hur vi hanterar dina personuppgifter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-xl p-6 sticky top-[130px] shadow-lg">
                <nav className="space-y-2">
                  {sections.map(({ id, title, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                        activeSection === id
                          ? 'bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black font-medium'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <section id="collection" className="policy-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">1. Information vi samlar in</h2>
                <p className="text-gray-700 mb-4">När du gör en beställning via vår hemsida samlar vi in följande information:</p>
                <ul className="list-none space-y-3">
                  {['Namn', 'Adress', 'Telefonnummer', 'E-postadress'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="purpose" className="policy-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">2. Syfte</h2>
                <p className="text-gray-700">
                  Syftet med att samla in personuppgifter är att vi ska kunna leverera din beställning till rätt adress, kontakta dig vid behov samt säkerställa korrekt betalning.
                </p>
              </section>

              <section id="sharing" className="policy-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">3. Delning av information</h2>
                <p className="text-gray-700 mb-4">Vi delar endast din information med Swish, och då endast:</p>
                <ul className="list-none space-y-3">
                  {['Telefonnummer', 'Belopp för beställningen'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="storage" className="policy-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">4. Lagring</h2>
                <p className="text-gray-700">
                  Dina personuppgifter sparas endast tills beställningen är genomförd och levererad. Därefter raderas informationen automatiskt inom 24 timmar.
                </p>
              </section>

              <section id="cookies" className="policy-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">5. Cookies</h2>
                <p className="text-gray-700">
                  Vi använder inte cookies för att samla in personuppgifter.
                </p>
              </section>

              <section id="contact" className="policy-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">6. Kontakt</h2>
                <p className="text-gray-700">
                  Om du har frågor om hur vi hanterar dina personuppgifter är du välkommen att kontakta oss via e-post på <strong>support@healthyeating.se</strong>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;