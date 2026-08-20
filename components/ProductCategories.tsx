"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    id: "home-kitchen",
    num: "01",
    title: "Home & Kitchen",
    tagline: "Commercial Induction & Infrared Culinary Hardware",
    badge: "High-Volume OEM",
    specs: "2200W–3500W • Ceramic Glass • Touch Controls",
    image: "/home_kitchen.png",
    href: "/collections/all",
  },
  {
    id: "corporate-gifting",
    num: "02",
    title: "Corporate Gifting",
    tagline: "Bespoke Executive Selections & Custom Presentation Sets",
    badge: "Custom Packaging",
    specs: "Laser Engraving • Leatherette Sets • Global Logistics",
    image: "/corporate_gifting.png",
    href: "/collections/corporate-gifting",
  },
  {
    id: "furnitures",
    num: "03",
    title: "Living & Furnitures",
    tagline: "Ergonomic Seating & Architectural Commercial Interior Pieces",
    badge: "Structural Grade",
    specs: "Aniline Leather • Aerospace Alloys • Tested 100k Cycles",
    image: "/furnitures.png",
    href: "/collections/furnitures",
  },
  {
    id: "vr-headsets",
    num: "04",
    title: "Optics & VR Headsets",
    tagline: "Next-Generation Immersive Displays & Wearable Tech",
    badge: "Precision Optics",
    specs: "Ultra-low Latency • Fresnel Optics • Custom Firmware",
    image: "/vr.png",
    href: "/collections/vr-headsets",
  }
];

export default function ProductCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section className="relative w-full h-[100svh] bg-black overflow-hidden flex font-outfit">
      
      {categories.map((category, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={category.id}
            onMouseEnter={() => setHoveredIndex(index)}
            layout
            initial={false}
            animate={{
              flex: isHovered ? 4 : 1,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full overflow-hidden border-r border-white/10 last:border-r-0 cursor-pointer group"
          >
            <Link href={category.href} className="block w-full h-full relative">
              
              {/* Cinematic Background Image */}
              <div className="absolute inset-0 w-full h-full bg-neutral-900">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : 1.15,
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center opacity-80"
                    priority
                  />
                </motion.div>
                
                {/* Dynamic Cinematic Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isHovered 
                    ? "bg-gradient-to-t from-black/90 via-black/20 to-black/40" 
                    : "bg-black/60"
                }`} />
              </div>

              {/* Massive Architectural Number */}
              <div className="absolute top-32 left-8 md:left-12 opacity-20 mix-blend-overlay pointer-events-none transition-transform duration-700 ease-out">
                <span className="text-[12rem] lg:text-[18rem] font-light tracking-tighter text-white leading-none">
                  {category.num}
                </span>
              </div>

              {/* Collapsed Vertical Title */}
              <div className="absolute inset-0 flex items-end justify-center pb-24 pointer-events-none md:hidden">
                {!isHovered && (
                  <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white font-light tracking-[0.3em] uppercase text-xl whitespace-nowrap -rotate-90 origin-bottom"
                  >
                    {category.title}
                  </motion.h2>
                )}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block">
                <AnimatePresence>
                  {!isHovered && (
                    <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/60 font-light tracking-[0.4em] uppercase text-2xl whitespace-nowrap -rotate-90"
                    >
                      {category.title}
                    </motion.h2>
                  )}
                </AnimatePresence>
              </div>

              {/* Expanded Luxury Content Box */}
              <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end z-20 text-white pointer-events-none">
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col gap-4 max-w-2xl pointer-events-auto"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase text-white shadow-lg">
                          {category.badge}
                        </span>
                        <div className="h-px bg-white/30 flex-grow max-w-[100px]" />
                      </div>
                      
                      <h2 className="font-light uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-[0.9]">
                        {category.title}
                      </h2>

                      <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-lg mt-4">
                        {category.tagline}
                      </p>
                      
                      <p className="text-white/50 text-[11px] font-bold tracking-[0.2em] uppercase mt-4 mb-8">
                        {category.specs}
                      </p>

                      <div className="group/btn relative inline-flex items-center justify-center gap-4 bg-white text-black py-4 px-8 rounded-full overflow-hidden self-start cursor-pointer hover:scale-105 transition-all duration-300">
                        <span className="relative z-10 text-[11px] font-bold tracking-[0.2em] uppercase">Explore Collection</span>
                        <svg className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                      
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </Link>
          </motion.div>
        );
      })}

    </section>
  );
}
