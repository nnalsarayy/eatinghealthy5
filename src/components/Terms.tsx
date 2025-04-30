import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Truck, CreditCard, Home, Clock, AlertCircle, UserCheck, ScrollText, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TermsProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Terms: React.FC<TermsProps> = ({ cartItemCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = document.querySelectorAll('.terms-section');
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
    { id: 'service', title: '1. Om tjänsten', icon: ScrollText },
    { id: 'ordering', title: '2. Beställning', icon: UserCheck },
    { id: 'payment', title: '3. Betalning', icon: CreditCard },
    { id: 'delivery', title: '4. Leverans', icon: Truck },
    { id: 'cancellation', title: '5. Ångerrätt', icon: AlertCircle },
    { id: 'not-home', title: '6. Avbokning', icon: Home },
    { id: 'delays', title: '7. Reklamation', icon: Clock },
    { id: 'customer-responsibility', title: '8. Kundens Ansvar', icon: UserCog }
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
              Allmänna villkor
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Genom att genomföra ett köp godkänner du dessa villkor.
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
              <section id="service" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">1. Om tjänsten</h2>
                <p className="text-gray-700">
                  Healthy Eating erbjuder färskt lagade matlådor som levereras inom Örebro kommun. Maten tillagas samma dag som leverans sker och går att förvara i kyl i upp till 5 dagar och i frys i flera månader beroende på rätt förvaring.
                </p>
              </section>

              <section id="ordering" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">2. Beställning</h2>
                <p className="text-gray-700 mb-4">För att göra en beställning:</p>
                <ul className="list-none space-y-3">
                  {[
                    'Välj önskade matlådor och eventuella tillbehör',
                    'Lägg produkterna i varukorgen',
                    'Gå till kassan, fyll i dina uppgifter och genomför betalningen via Swish',
                    'En bokningsbekräftelse skickas automatiskt till din e-postadress efter genomförd betalning'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="payment" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">3. Betalning</h2>
                <p className="text-gray-700">
                  Betalning sker i samband med beställningen via Swish. Alla priser anges i svenska kronor (SEK) och moms läggs till i kassan (3 kr).
                </p>
              </section>

              <section id="delivery" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">4. Leverans</h2>
                <p className="text-gray-700">
                  Leverans sker endast inom Örebro kommun, på det datum och den tid som anges vid beställning. Leveransen sker till dörren på den adress du angivit i kassan.<br /><br />
                  Om du inte är hemma vid leverans ringer budet dig. Om vi inte får svar, lämnas maten utanför dörren, förutsatt att det inte angivits något annat i kassan eller under samtalet. Observera att ingen återbetalning sker efter att leveransen har genomförts.
                </p>
              </section>

              <section id="cancellation" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">5. Ångerrätt</h2>
                <p className="text-gray-700">
                  Då våra matlådor tillagas färskt inför varje leverans och är livsmedel som snabbt kan försämras vid fel hantering, omfattas de inte av ångerrätten enligt 11 § i distansavtalslagen. Genom att godkänna dessa villkor vid beställning accepterar du att ångerrätten inte gäller.
                </p>
              </section>

              <section id="not-home" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">6. Avbokning</h2>
                <p className="text-gray-700">
                  Eftersom all mat förbereds på beställning kan vi tyvärr inte ta emot avbokningar efter att betalningen har genomförts.
                </p>
              </section>

              <section id="delays" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">7. Reklamation</h2>
                <p className="text-gray-700">
                  Vi vill att du som kund ska känna dig trygg med din beställning. Om du har fått fel vara, saknar något i leveransen, eller om maten är skadad, ber vi dig kontakta oss så snart som möjligt via support@healthyeating.se.<br /><br />
                  Reklamation ska ske inom 24 timmar efter leverans och gärna kompletteras med bilder som visar felet. Vid godkänd reklamation skickar vi ut en ny beställning eller kommer överens om en annan lösning.<br /><br />
                  Vi följer konsumentköplagen och ansvarar för att leverera produkter i korrekt skick och enligt vad som utlovats vid köpet.
                </p>
              </section>

              <section id="customer-responsibility" className="terms-section bg-white rounded-xl p-8 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">8. Kundens Ansvar</h2>
                <p className="text-gray-700">Det är kundens ansvar att:</p>
                <ul className="list-none space-y-3 mt-4">
                  {[
                    'Ange korrekt adress och ett fungerande telefonnummer',
                    'Vara tillgänglig vid leveranstillfället',
                    'Lämna relevanta instruktioner i kassan vid särskilda behov, portkod, eller andra önskemål'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-4">
                  Healthy Eating ansvarar inte för eventuella konsekvenser som uppstår på grund av felaktigt angivna uppgifter eller otillgänglighet vid leverans.
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

export default Terms;