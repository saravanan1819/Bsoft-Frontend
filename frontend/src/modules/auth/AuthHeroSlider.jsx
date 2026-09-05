import React, { useState, useEffect } from "react";

const AuthHeroSlider = ({ slides, autoPlayInterval = 4000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides, autoPlayInterval]);

  if (!slides || slides.length === 0) return null;

  const activeSlideData = slides[currentSlide];

  return (
    <div
      className="w-full h-full relative flex flex-col justify-between overflow-hidden p-6 sm:p-10 lg:p-12 box-border transition-colors duration-700 ease-in-out"
      style={{ backgroundColor: activeSlideData.bgColor }}
    >
      {/* Circle loop indicator dots at top right */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-30 flex items-center gap-1.5 sm:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer focus:outline-none ${
              index === currentSlide
                ? "w-6 bg-white shadow-sm"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Contents with smooth fade animation */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between transition-opacity duration-700 ease-in-out ${
              isActive
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Banner Text */}
            <div
              className={`z-10 max-w-lg transition-all duration-700 transform ${
                isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 tracking-wide">
                {slide.title}
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-light leading-relaxed">
                {slide.description}
              </p>
            </div>

            {/* Illustration overlay */}
            <div className={`absolute bottom-0 pointer-events-none transition-all duration-700 ease-in-out ${slide.imageWrapperClass}`}>
              <img
                src={slide.image}
                alt={slide.alt || slide.title}
                className={slide.imgClass}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AuthHeroSlider;
