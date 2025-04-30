import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "Hur fungerar leveransen?",
      answer: "Vi erbjuder leverans direkt till din dörr inom Örebro kommun, på det datum och den tid du själv väljer."
    },
    {
      question: "Hur mycket kostar leveransen?",
      answer: "Fri leverans vid köp av minst 5 matlådor. Vid färre än 5 matlådor tillkommer en leveransavgift på 19 kr."
    },
    {
      question: "Hur länge håller matlådorna?",
      answer: "Våra matlådor håller sig färska i 3-4 dagar i kylskåp. I frysen kan de hålla upp till 3 månader"
    },
    {
      question: "Vilka betalningsmetoder accepterar ni?",
      answer: "Vi accepterar endast Swish. Betalning sker i samband med beställning."
    },
    {
      question: "Vad gör jag om jag inte är hemma när leveransen är schemalagd?",
      answer: "Om du inte är hemma vid leverans lämnar vi maten vid din dörr, om du inte har angett andra önskemål i kommentarsfältet i kassan.\n\n<strong>Observera att ingen återbetalning sker efter genomförd betalning.</strong>"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-center mb-4 animate-letter-spacing text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text">
          Vanliga Frågor
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Har du fler frågor? Kontakta oss på <strong>support@healthyeating.se</strong>
        </p>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="w-full px-6 py-4 text-left bg-white flex justify-between items-center"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-heading font-semibold text-lg text-gray-900">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;