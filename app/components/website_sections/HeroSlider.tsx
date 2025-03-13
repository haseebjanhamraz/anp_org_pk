"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import Image from "next/image";
import { historyData } from "../../lib/SliderData";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isAnimating && isPlaying && !isHovered) {
      setIsAnimating(true);
      setCurrentSlide((prev) =>
        prev === historyData.length - 1 ? 0 : prev + 1
      );
    }
  }, [isAnimating, isPlaying, isHovered]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) =>
        prev === 0 ? historyData.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main content */}
      <div className="relative w-full h-full">
        {historyData.map((slide, index) => (
          <div
            key={slide.year}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
              <Image
                width={500}
                height={500}
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div
                className="
                absolute inset-0
                bg-gradient-to-t
                from-transparent
                via-red-600
                to-red-900
                opacity-75
                dark:bg-gradient-to-b 
                dark:from-black/70
                dark:via-black/50
                dark:to-black/70"
              />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center px-4">
              <div className="max-w-5xl text-center text-white">
                <div className="mb-4">
                  <span className="inline-block font-[opensans] bg-red-600 text-white px-6 py-2 rounded-full text-3xl transform hover:scale-105 transition-transform duration-300">
                    {slide.year}
                  </span>
                </div>
                <h2 className="text-6xl font-medium mb-6 tracking-tight font-[opensans] shadow-xl py-5">
                  {slide.title}
                </h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                  {slide.description}
                </p>

                {/* Key Facts */}
                <div className="flex justify-center gap-4 mt-8">
                  {slide.facts.map((fact, i) => (
                    <div
                      key={i}
                      className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      {fact}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-6">
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / historyData.length) * 100}%`,
            }}
          />
        </div>

        {/* Dot Navigation */}
        <div className="flex items-center gap-4">
          {historyData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-12 h-3 bg-red-600"
                  : "w-3 h-3 bg-white/50 hover:bg-white/70"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Arrow Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
          <PauseCircle className="w-6 h-6 text-white" />
        ) : (
          <PlayCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};

export default HeroSlider;
