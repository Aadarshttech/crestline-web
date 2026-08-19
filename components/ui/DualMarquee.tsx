"use client";

import React from "react";
import ScrollBaseAnimation from "./scroll-text-marque";

export default function DualMarquee() {
  return (
    <div className="w-full bg-black py-6 overflow-hidden flex flex-col gap-2 relative z-10">
      <ScrollBaseAnimation
        baseVelocity={-2}
        clasname="font-bold tracking-[-0.02em] leading-[90%] text-4xl md:text-6xl lg:text-7xl uppercase flex items-center gap-8 md:gap-16"
      >
        <span className="text-white">PREMIUM</span>
        <span 
          className="text-transparent" 
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
        >
          LIVING
        </span>
      </ScrollBaseAnimation>

      <ScrollBaseAnimation
        baseVelocity={2}
        clasname="font-bold tracking-[-0.02em] leading-[90%] text-4xl md:text-6xl lg:text-7xl uppercase flex items-center gap-8 md:gap-16"
      >
        <span 
          className="text-transparent" 
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
        >
          PREMIUM
        </span>
        <span className="text-white">LIVING</span>
      </ScrollBaseAnimation>
    </div>
  );
}
