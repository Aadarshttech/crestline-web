"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ComingSoonProps {
  title: string;
  bgImage: string;
}

export default function ComingSoon({ title, bgImage }: ComingSoonProps) {
  return (
    <main className="relative w-full min-h-screen bg-[#FAFAF8] flex flex-col selection:bg-neutral-900 selection:text-white overflow-hidden text-neutral-900">
      <Navbar alwaysShowLogo={true} theme="light" />

      <section className="relative flex-grow w-full flex flex-col items-center justify-center pt-28 pb-16 z-10">
        
        {/* Background Subtle Silhouette */}
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-[#FAFAF8]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200/80 mb-6 text-[11px] font-semibold tracking-wider text-neutral-700 uppercase"
          >
            <span>Product Portfolio</span>
            <span className="text-neutral-400">•</span>
            <span>{title}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-outfit font-light tracking-tight text-neutral-950 uppercase leading-none"
          >
            Catalog <span className="font-semibold text-neutral-900">In Production</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-neutral-600 font-outfit font-light text-base md:text-lg max-w-xl leading-relaxed"
          >
            We are indexing the full technical specifications, factory test certifications, and SKU variants for the <span className="font-medium text-neutral-900">{title}</span> series.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10"
          >
            <Link 
              href="/collections"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-neutral-950 text-white font-outfit font-medium uppercase tracking-wider text-xs hover:bg-neutral-800 transition-all duration-300 shadow-sm"
            >
              <span>Back to Collections</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 w-full">
        <Footer theme="light" />
      </div>
    </main>
  );
}
