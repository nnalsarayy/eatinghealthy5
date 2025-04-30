import React from 'react';

const About: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="relative h-[300px] md:h-[500px] overflow-hidden">
      {isMobile ? (
        // Mobile version - single static image
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://i.ibb.co/BDTwctS/jawad-balanced-cropped-resized.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ) : (
        // Desktop version - sliding images
        <div className="absolute inset-0 flex animate-scroll">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex min-w-full">
              <div 
                className="w-1/2 h-[300px] md:h-[500px] flex-shrink-0"
                style={{
                  backgroundImage: 'url(https://i.ibb.co/rSVdLcf/jawad2-cropped-resized-1.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div 
                className="w-1/2 h-[300px] md:h-[500px] flex-shrink-0"
                style={{
                  backgroundImage: 'url(https://i.ibb.co/BDTwctS/jawad-balanced-cropped-resized.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center">
          <div className="text-center animate-fade-in">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-8 tracking-wider animate-letter-spacing">
              Om Healthy Eating
            </h2>
            <p className="text-center text-lg md:text-xl max-w-[800px] leading-relaxed font-normal text-white tracking-wide">
              Healthy Eating är dedikerade till att erbjuda färska, näringsrika och utsökta matlådelösningar som förenklar din vardag. Vi tror att hälsosam kost ska vara smidig, god och tillgänglig för alla.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;