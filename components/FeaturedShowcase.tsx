"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedShowcase() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12 bg-white border-t border-neutral-200/80 text-neutral-900">
      
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        
        {/* Left: Product Information & Specifications */}
        <div className="flex flex-col">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200/80 w-fit text-[11px] font-semibold tracking-wider text-neutral-700 uppercase mb-6">
            Featured Industrial Series
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit font-light tracking-tight text-neutral-950 uppercase leading-[1.05] mb-6">
            The Obsidian <br />
            <span className="font-semibold text-neutral-900">Executive Lounge</span>
          </h2>

          <p className="text-neutral-600 font-outfit font-light text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Engineered for high-traffic executive lounges and contemporary living spaces. Featuring a cold-rolled aerospace aluminum skeleton wrapped in hand-finished Italian aniline leather.
          </p>

          {/* Clean Technical Specification Table */}
          <div className="grid grid-cols-2 gap-4 py-6 border-y border-neutral-200/80 mb-8">
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400 mb-1">Primary Surface</p>
              <p className="text-sm font-outfit font-medium text-neutral-900">Italian Full-Grain Aniline</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400 mb-1">Frame Alloy</p>
              <p className="text-sm font-outfit font-medium text-neutral-900">6061-T6 Anodized Aluminum</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400 mb-1">Testing Cycle</p>
              <p className="text-sm font-outfit font-medium text-neutral-900">100,000 Cycle Dynamic Load</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-neutral-400 mb-1">Factory Cert</p>
              <p className="text-sm font-outfit font-medium text-neutral-900">BIFMA / ISO 9001 Compliance</p>
            </div>
          </div>

          <div>
            <Link
              href="/collections/furnitures"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-950 text-white font-outfit font-medium uppercase tracking-wider text-xs hover:bg-neutral-800 transition-all duration-300 shadow-sm"
            >
              <span>Explore Series</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>

        {/* Right: Studio Photography */}
        <div className="relative w-full aspect-[4/3] md:aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2F2EE] border border-neutral-200/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)]">
          <Image
            src="/catalog/product_1.png"
            alt="The Obsidian Executive Lounge"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          
          {/* Subtle Corner Badge */}
          <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-neutral-200/80 shadow-sm text-xs font-outfit text-neutral-800">
            <span className="font-semibold text-neutral-950">Model CL-OB84</span> • Series II
          </div>
        </div>

      </div>
    </section>
  );
}
