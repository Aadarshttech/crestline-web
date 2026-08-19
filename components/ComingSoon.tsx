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
    <main className="relative w-full min-h-screen bg-black flex flex-col selection:bg-white selection:text-black overflow-hidden">
      <Navbar alwaysShowLogo={true} />

      <section className="relative flex-grow w-full flex flex-col items-center justify-center pt-20">
        
        {/* Background Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6 text-white/50 uppercase tracking-[0.4em] text-xs font-medium"
          >
            <span>Collection</span>
            <div className="w-12 h-[1px] bg-white/30" />
            <span>{title}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-bebas tracking-widest uppercase leading-none drop-shadow-2xl"
          >
            Coming Soon
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-white/70 font-outfit font-light text-lg md:text-2xl max-w-2xl leading-relaxed"
          >
            We are meticulously curating our <span className="text-white font-medium">{title}</span> catalog. Return shortly to explore the pinnacle of premium living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12"
          >
            <Link 
              href="/"
              className="group relative px-8 py-3 border border-white/40 flex items-center justify-center gap-4 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white"
            >
              <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 text-white font-outfit uppercase tracking-[0.2em] text-sm group-hover:text-black transition-colors duration-500">
                Return Home
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="relative z-10 w-full">
        <Footer />
      </div>
    </main>
  );
}
