import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Zap, Trophy } from 'lucide-react';
import { calculateDailyCalories } from '../utils/calculateDailyCalories';

interface Question {
  id: string;
  text: string;
  type: 'number' | 'select';
  options?: string[];
  icon?: string;
}

const CalorieCalculator: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
  const [showResult, setShowResult] = useState(false);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showAnimation, setShowAnimation] = useState(false);

  const questions: Question[] = [
    { 
      id: 'age', 
      text: 'Hur gammal är du?', 
      type: 'number',
      icon: '🎂'
    },
    { 
      id: 'height', 
      text: 'Hur lång är du? (i cm)', 
      type: 'number',
      icon: '📏'
    },
    { 
      id: 'weight', 
      text: 'Vad väger du? (i kg)', 
      type: 'number',
      icon: '⚖️'
    },
    { 
      id: 'gender', 
      text: 'Vad är ditt kön?', 
      type: 'select',
      options: ['Man', 'Kvinna'],
      icon: '👤'
    },
    {
      id: 'activity',
      text: 'Hur aktiv är du?',
      type: 'select',
      options: [
        'Stillasittande (ingen eller väldigt lite träning)',
        'Lätt aktiv (träning 1–2 gånger/vecka)',
        'Måttligt aktiv (träning 3–5 gånger/vecka)',
        'Mycket aktiv (träning 6–7 gånger/vecka)'
      ],
      icon: '🏃'
    },
    {
      id: 'goal',
      text: 'Vad är ditt mål?',
      type: 'select',
      options: ['Gå ner i vikt', 'Bibehålla vikt', 'Gå upp i vikt'],
      icon: '🎯'
    }
  ];

  const validateAnswers = (newAnswers: { [key: string]: string | number }) => {
    const requiredFields = ['age', 'height', 'weight', 'gender', 'activity', 'goal'];
    return requiredFields.every(field => field in newAnswers && newAnswers[field] !== '');
  };

  const calculateCalories = (newAnswers: { [key: string]: string | number }) => {
    setError('');
    
    if (!validateAnswers(newAnswers)) {
      setError('Vänligen svara på alla frågor innan du beräknar kalorier.');
      return;
    }

    const age = Number(newAnswers.age);
    const height = Number(newAnswers.height);
    const weight = Number(newAnswers.weight);
    const gender = newAnswers.gender === 'Man' ? 'male' : 'female';
    
    let activityLevel: 'sedentary' | 'light' | 'moderate' | 'active';
    switch (newAnswers.activity) {
      case 'Lätt aktiv (träning 1–2 gånger/vecka)':
        activityLevel = 'light';
        break;
      case 'Måttligt aktiv (träning 3–5 gånger/vecka)':
        activityLevel = 'moderate';
        break;
      case 'Mycket aktiv (träning 6–7 gånger/vecka)':
        activityLevel = 'active';
        break;
      default:
        activityLevel = 'sedentary';
    }

    const result = calculateDailyCalories({
      age,
      weight,
      height,
      gender,
      activityLevel,
      goal: newAnswers.goal as string
    });

    setCalories(result.calories);
    setProtein(result.protein);
    setShowResult(true);
  };

  const handleNumberInput = (value: string) => {
    if (value === '' || /^\d+$/.test(value)) {
      setCurrentAnswer(value);
    }
  };

  const handleNext = () => {
    if (currentAnswer) {
      setShowAnimation(true);
      const newAnswers = {
        ...answers,
        [questions[currentQuestionIndex].id]: Number(currentAnswer)
      };
      setAnswers(newAnswers);
      
      setTimeout(() => {
        setCurrentAnswer('');
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          calculateCalories(newAnswers);
        }
        setShowAnimation(false);
      }, 300);
    }
  };

  const handleSelectOption = (option: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: option
    };
    setAnswers(newAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      calculateCalories(newAnswers);
    } else {
      setShowAnimation(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowAnimation(false);
      }, 300);
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setShowAnimation(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setCurrentAnswer('');
        setError('');
        setShowAnimation(false);
      }, 300);
    }
  };

  const resetCalculator = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResult(false);
      setCalories(0);
      setProtein(0);
      setCurrentAnswer('');
      setError('');
      setShowAnimation(false);
    }, 300);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div id="calorie-calculator" className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 text-black" tabIndex={-1}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-center animate-letter-spacing">
            Kaloriräknare
          </h2>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-8 transform transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg animate-bounce">
              {error}
            </div>
          )}
          
          {!showResult ? (
            <div className={`space-y-6 transition-all duration-300 ${showAnimation ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
              {currentQuestionIndex > 0 && (
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-4 group"
                >
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                  Tillbaka
                </button>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{currentQuestion.icon}</span>
                <h3 className="text-xl font-semibold">{currentQuestion.text}</h3>
              </div>
              
              {currentQuestion.type === 'number' ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    value={currentAnswer}
                    onChange={(e) => handleNumberInput(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD54F] focus:border-transparent transform transition-all duration-300 hover:scale-102"
                    placeholder="Ange ett nummer"
                  />
                  <button
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className={`w-full px-6 py-3 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black rounded-xl font-semibold transition-all duration-300 transform hover:scale-102 hover:shadow-lg ${
                      currentAnswer
                        ? 'hover:from-[#FFE082] hover:to-[#FFB300]'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Nästa
                      <Zap className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gradient-to-r hover:from-[#FFD54F] hover:to-[#FFB300] hover:text-black transition-all duration-300 transform hover:scale-102 hover:shadow-lg group"
                      onClick={() => handleSelectOption(option)}
                    >
                      <span className="flex items-center gap-2">
                        {option}
                        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <div className="flex gap-2">
                  {Array.from({ length: questions.length }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 w-8 rounded-full transition-all duration-500 ${
                        index === currentQuestionIndex
                          ? 'bg-gradient-to-r from-[#FFD54F] to-[#FFB300] scale-110'
                          : index < currentQuestionIndex
                          ? 'bg-gray-300'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6 transition-all duration-500">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-r from-[#FFD54F] to-[#FFB300] rounded-full flex items-center justify-center mb-6 animate-pulse shadow-lg">
                  <span className="text-3xl font-bold text-black">{calories}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full animate-ping opacity-75"></div>
              </div>
              
              <p className="text-lg font-bold text-transparent bg-gradient-to-r from-[#FFD54F] to-[#FFB300] bg-clip-text animate-pulse">
                Rekommenderat dagligt kaloriintag:<br />
                {calories} kcal varav {protein}g protein
              </p>
              
              <button
                onClick={resetCalculator}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-[#FFD54F] to-[#FFB300] text-black rounded-xl font-semibold hover:from-[#FFE082] hover:to-[#FFB300] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center justify-center gap-2">
                  Börja om
                  <Sparkles className="w-4 h-4" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;