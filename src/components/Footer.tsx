import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-heading text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text text-xl font-bold mb-4">HEALTHY EATING</h3>
          <p className="text-gray-300 text-sm text-center md:text-left">Enskild firma - Healthy Eating<br />Juridiskt namn - Jawad Abbas<br />Org. Nummer - 050703-3595<br /><br />HEALTHY EATING är dedikerade till att erbjuda färska, näringsrika och utsökta matlådelösningar som förenklar din vardag. Vi tror att hälsosam kost ska vara smidig, god och tillgänglig för alla.</p>
        </div>

        {/* Middle Column */}
        <div className="flex flex-col items-center">
          <h3 className="font-heading text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text text-xl font-bold mb-4">INFORMATION</h3>
          <div className="flex flex-col space-y-2">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-300">Integritetspolicy</Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">Allmänna villkor</Link>
          </div>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col items-center md:items-start pl-0 md:pl-8">
          <h3 className="font-heading text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text text-xl font-bold mb-4">     KONTAKTA OSS</h3>
          <div className="text-gray-300 text-sm">
            <p>Björkrisvägen 6A<br />702 34 Örebro</p>
            <p className="my-2">0736333867</p>
            <p>support@healthyeating.se</p>
          </div>
        </div>

        {/* Social Media Column */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-heading text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text text-xl font-bold mb-4">FÖLJ OSS!</h3>
          <div className="flex space-x-4">
            <a href="https://www.tiktok.com/@healthyeating_10" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
              <img 
                src="https://i.ibb.co/2Ytw6h94/6057996-tiktok-logotyp-pa-transparent-bakgrund-gratis-vector-removebg-preview.png" 
                alt="TikTok" 
                className="w-8 h-8"
              />
            </a>
            <a href="https://www.instagram.com/healthyeating1__/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-300">
              <img 
                src="https://i.ibb.co/KxyX7skz/instagram-logo-instagram-icon-transparent-free-png-ezgif-com-webp-to-png-converter-removebg-preview.png" 
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-1 md:col-span-4 text-center mt-8">
          <img 
            src="https://i.ibb.co/Wm44Bkt/Swish-Logo-Secondary-Dark-BG-removebg-preview-1.png"
            alt="Swish"
            className="h-8 mx-auto mb-4"
          />
          <p className="text-gray-400 text-sm">© 2025 HEALTHY EATING. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;