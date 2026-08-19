"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const slides = [
  { id: 1, title: "HOME & KITCHEN", name: "HOME & KITCHEN", image: "/home_kitchen.png", href: "/collections/home-kitchen" },
  { id: 2, title: "CORPORATE GIFTING", name: "CORPORATE GIFTING", image: "/corporate_gifting.png", href: "/collections/corporate-gifting" },
  { id: 3, title: "FURNITURES", name: "FURNITURES", image: "/furnitures.png", href: "/collections/furnitures" },
  { id: 4, title: "VR HEADSETS", name: "VR HEADSETS", image: "/vr.png", href: "/collections/vr-headsets" },
];

export default function CinemaScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newIndex = Math.floor(latest * slides.length);
    newIndex = Math.min(newIndex, slides.length - 1);
    
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  const activeSlide = slides[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {slides.map((slide, idx) => (
          <motion.div
            key={slide.id}
            initial={false}
            animate={{ 
              opacity: idx === activeIndex ? 1 : 0,
              scale: idx === activeIndex ? 1 : 1.05,
              zIndex: idx === activeIndex ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          </motion.div>
        ))}

        <div className="absolute top-28 md:top-36 left-0 right-0 flex justify-center z-20 pointer-events-none">
           <h2 className="text-white/80 font-outfit uppercase tracking-[0.4em] text-sm md:text-base font-light text-center">
             OUR<br/>
             <span className="font-medium text-white">COLLECTIONS</span>
           </h2>
        </div>

        {/* Massive Center Title & Button */}
        <div className="relative z-20 flex justify-center items-center w-full px-4 md:px-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-10"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas text-white tracking-widest text-center leading-none uppercase drop-shadow-2xl">
                {activeSlide.title}
              </h1>
              
              <Link 
                href={activeSlide.href}
                className="group relative px-10 py-4 border border-white/60 flex items-center gap-6 overflow-hidden transition-all duration-700 hover:bg-white hover:border-white"
              >
                <span className="relative z-10 text-white font-outfit uppercase tracking-[0.3em] text-xs font-medium transition-colors duration-700 group-hover:text-black">
                  Explore
                </span>
                <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                  {/* Current Arrow (Leaves right) */}
                  <svg 
                    className="absolute w-5 h-5 text-white transition-all duration-500 ease-in-out group-hover:translate-x-8 group-hover:opacity-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {/* New Arrow (Enters left) */}
                  <svg 
                    className="absolute w-5 h-5 text-black -translate-x-8 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Left Side Menu */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-8 items-start">
          {slides.map((slide, idx) => (
            <div 
              key={slide.id} 
              className={`flex items-center relative group justify-start transition-transform duration-500 ${idx === activeIndex ? "translate-x-4" : "translate-x-0"}`}
            >
              {idx === activeIndex && (
                <motion.div layoutId="leftDot" className="absolute -left-6 w-2 h-2 bg-white rounded-full" />
              )}
              <span className={`text-sm font-outfit tracking-widest uppercase transition-colors duration-500 ${idx === activeIndex ? "text-white font-bold" : "text-white/40 font-light"}`}>
                {slide.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side Menu */}
        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-8 items-end">
          {slides.map((slide, idx) => (
            <div 
              key={slide.id} 
              className={`flex items-center relative group justify-end transition-transform duration-500 ${idx === activeIndex ? "-translate-x-4" : "translate-x-0"}`}
            >
              <span className={`text-sm font-outfit tracking-widest uppercase transition-colors duration-500 ${idx === activeIndex ? "text-white font-bold" : "text-white/40 font-light"}`}>
                {slide.name}
              </span>
              {idx === activeIndex && (
                <motion.div layoutId="rightDot" className="absolute -right-6 w-2 h-2 bg-white rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom Progress Indicator */}
        <div className="absolute bottom-10 md:bottom-16 left-0 right-0 z-20 flex justify-center items-center gap-4">
           <span className="text-white font-outfit text-sm tracking-widest font-medium">0{activeIndex + 1}</span>
           <div className="w-32 md:w-64 h-[1px] bg-white/30 relative">
             <motion.div 
               className="absolute top-0 left-0 h-full bg-white"
               animate={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
               transition={{ duration: 0.5, ease: "easeInOut" }}
             />
           </div>
           <span className="text-white font-outfit text-sm tracking-widest font-medium">0{slides.length}</span>
        </div>

      </div>
    </section>
  );
}
