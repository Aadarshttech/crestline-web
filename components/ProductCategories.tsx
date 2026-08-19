"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const categories = [
  {
    id: 1,
    title: "HOME & KITCHEN",
    subtitle: "Premium Culinary Essentials",
    image: "/home_kitchen.png",
  },
  {
    id: 2,
    title: "CORPORATE GIFTING",
    subtitle: "Exclusive Executive Selections",
    image: "/corporate_gifting.png",
  },
  {
    id: 3,
    title: "FURNITURES",
    subtitle: "Architectural Living Spaces",
    image: "/furnitures.png",
  },
  {
    id: 4,
    title: "VR HEADSETS",
    subtitle: "Next-Generation Immersions",
    image: "/vr.png",
  }
];

export default function ProductCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="catalog" className="relative w-full min-h-screen bg-black py-32 px-6 md:px-12 flex flex-col items-center justify-center">
      
      {/* Section Header */}
      <div className="w-full max-w-[1400px] flex flex-col items-center text-center mb-24">
        <span className="text-white/40 uppercase tracking-[0.5em] text-xs font-medium mb-6">Our Collections</span>
        <h2 className="text-white text-4xl md:text-6xl font-outfit font-light uppercase tracking-widest leading-tight">
          Curated <br /> Excellence
        </h2>
        <div className="w-16 h-[1px] bg-white/30 mt-8"></div>
      </div>

      {/* Expanding Accordion Gallery */}
      <div className="w-full max-w-[1400px] h-[60vh] md:h-[70vh] flex flex-col md:flex-row gap-4">
        {categories.map((category, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <motion.div
              key={category.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(0)} // Default back to first or just stay
              layout
              initial={false}
              animate={{
                flex: isHovered ? (typeof window !== "undefined" && window.innerWidth < 768 ? 4 : 4) : 1,
              }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-full bg-white/5 border border-white/10"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <motion.div
                  animate={{
                    scale: isHovered ? 1.05 : 1.15,
                  }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover object-center"
                  />
                </motion.div>
                <div className={`absolute inset-0 transition-opacity duration-700 ${isHovered ? "bg-gradient-to-t from-black via-black/40 to-transparent" : "bg-black/60 group-hover:bg-black/50"}`}></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
                <motion.div 
                  layout
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-white/40 font-outfit text-sm tracking-widest">0{index + 1}</span>
                    <motion.div 
                      animate={{ width: isHovered ? "40px" : "0px", opacity: isHovered ? 1 : 0 }}
                      className="h-[1px] bg-white hidden md:block"
                    />
                  </div>
                  <motion.h3 
                    animate={{ 
                      rotate: isHovered ? 0 : -90,
                      originX: 0,
                      originY: 1,
                      x: isHovered ? 0 : 16,
                      y: isHovered ? 0 : -40,
                      scale: isHovered ? 1 : 0.6
                    }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    className="text-white font-outfit font-light uppercase tracking-widest text-2xl md:text-4xl whitespace-nowrap origin-bottom-left"
                  >
                    {category.title}
                  </motion.h3>
                  
                  <div className="overflow-hidden">
                    <motion.p
                      initial={false}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="text-white/60 font-light tracking-wide text-sm md:text-base mt-2"
                    >
                      {category.subtitle}
                    </motion.p>
                  </div>
                </motion.div>
              </div>

              {/* Explore Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-6 right-6 md:top-10 md:right-10"
              >
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-black/20 group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
