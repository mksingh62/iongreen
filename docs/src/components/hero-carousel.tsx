'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StaggeredText } from "@/components/ui/text-animations";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

type Slide = {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  image_url: string;
};

type ProductCategory = {
  name: string;
  icon: string;
  href: string;
  sectionId: string;
  image: string;
};

export type { Slide };
export function HeroCarousel({ slides, categories = [] }: { slides: Slide[]; categories?: ProductCategory[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll effect with pause on hover - every 5 seconds (slightly slower for text to read)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div
      className="relative w-full bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Background with increased height for products below */}
      <div className="relative w-full h-[800px]">
        {/* Carousel Items */}
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 1, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={slides[currentIndex]?.image_url}
                alt={slides[currentIndex]?.title}
                fill
                className="object-cover"
                priority={true}
              />
              {/* Slight dark overlay for text readability, kept light to avoid blurry look */}
              <div className="absolute inset-0 bg-black/50"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-8 pointer-events-none">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Text Overlay - vertically centered, left-aligned on desktop */}
        <div className="absolute inset-0 z-15 flex flex-col justify-center pointer-events-none px-4 md:px-16">
          <div className="text-white max-w-5xl w-full mx-auto md:mx-0 md:ml-8 lg:ml-16 text-center md:text-left">
            <div key={`title-${currentIndex}`} className="mb-6 overflow-hidden">
              <StaggeredText
                text={slides[currentIndex]?.title}
                className="text-4xl md:text-7xl font-bold drop-shadow-2xl leading-tight"
                stagger={0.04}
                duration={0.6}
              />
            </div>

            <motion.div
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <p className="text-lg md:text-3xl drop-shadow-xl font-light tracking-wide mb-10 max-w-3xl mx-auto md:mx-0 text-gray-100">
                {slides[currentIndex]?.description}
              </p>

              <Link href={slides[currentIndex]?.cta_href || "#"}>
                <button className="pointer-events-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/50 shadow-lg text-lg">
                  {slides[currentIndex]?.cta_label}
                </button>
              </Link>
            </motion.div>

            {/* Slide Indicators */}
            <div className="mt-8 flex justify-center md:justify-start gap-2 pointer-events-auto">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Categories - Overlapped at bottom of carousel */}
        {categories.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/3">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                {categories.map((category, index) => (
                  <ScrollReveal key={category.name} direction="up" duration={1.2} delay={0.2 * (index + 1)}>
                    <Link
                      href={category.href}
                      className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border border-white/30 hover:border-green-400/50 hover:scale-105 block transform hover:-translate-y-1 h-40 md:h-48"
                    >
                      {/* Image container with proper sizing */}
                      <div className={`absolute inset-0 ${index === 2 ? 'p-4' : 'p-3'}`}>
                        <div className="relative w-full h-full">
                          {category.image ? (
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className={`object-contain object-center group-hover:scale-110 transition-transform duration-500 ${index === 2 ? 'opacity-90' : ''}`}
                              sizes="(max-width: 768px) 200px, 240px"
                              priority
                              style={{
                                objectFit: 'contain',
                                objectPosition: 'center',
                                ...(index === 2 && { maxWidth: '85%', maxHeight: '85%', margin: 'auto' })
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                              <span className="text-4xl">{category.icon}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Text overlay - appears on hover */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-montserrat text-center drop-shadow-lg">
                          {category.name}
                        </h3>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-2 md:mb-3"></div>
                        <span className="text-green-300 text-xs md:text-sm font-medium uppercase tracking-wider">Explore Now</span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacing for overlapped boxes */}
      {categories.length > 0 && (
        <div className="h-32 md:h-40"></div>
      )}
    </div>
  );
}
