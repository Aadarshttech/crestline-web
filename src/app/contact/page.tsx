"use client";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="relative w-full bg-black min-h-screen flex flex-col selection:bg-white selection:text-black overflow-x-clip">
      <Navbar alwaysShowLogo={true} />

      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1.05, 1.1, 1.05] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full opacity-30"
        >
          <Image
            src="/home_kitchen.png"
            alt="Luxury Background"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        
        {/* Deep Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
        
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-30"></div>
      </div>

      <section className="relative z-10 w-full flex-grow flex flex-col items-center justify-center px-6 md:px-12 py-32 mt-10 md:mt-16">
        <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Massive Typographic Impact */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-2">
              <span className="text-white/50 uppercase tracking-[0.5em] text-sm font-medium">Headquarters</span>
              <h1 className="text-white text-[clamp(3.5rem,8vw,7rem)] font-outfit font-light tracking-wide uppercase leading-[0.9]">
                Get In <br /> Touch
              </h1>
            </div>
            
            <div className="w-32 h-[1px] bg-white/30"></div>
            
            <p className="text-white/60 text-lg md:text-2xl font-light max-w-lg leading-relaxed">
              Experience the pinnacle of premium living. Connect with our global team for inquiries, elite partnerships, or support.
            </p>
          </motion.div>

          {/* Right Column: Classic Minimalist Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-12 w-full max-w-xl justify-self-center lg:justify-self-end"
          >
            
            {/* Telephone Section */}
            <div className="flex flex-col gap-2">
              <p className="text-white/40 uppercase text-xs tracking-[0.4em] font-medium flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
                Direct Line
              </p>
              <p className="text-white text-3xl md:text-5xl font-light font-outfit tracking-widest mt-2">
                86-0757-23279316
              </p>
              <div className="w-full h-[1px] bg-white/10 mt-6"></div>
            </div>

            {/* Address Section */}
            <div className="flex flex-col gap-2">
              <p className="text-white/40 uppercase text-xs tracking-[0.4em] font-medium flex items-center gap-3">
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Location
              </p>
              <p className="text-white/90 text-xl md:text-2xl font-light font-outfit leading-relaxed mt-2">
                No. 3, Sanheng Road, Rong'ai, <br />
                Chun'an District, Foshan City, <br />
                Guangdong Province, China
              </p>
              <div className="w-full h-[1px] bg-white/10 mt-6"></div>
            </div>

            {/* Classic Call Action Button */}
            <a 
              href="tel:+86075723279316"
              className="mt-4 w-full border border-white/30 py-6 flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-colors duration-500 group"
            >
              <span className="uppercase tracking-[0.4em] text-sm font-semibold">
                Call Us Directly
              </span>
              <svg className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

          </motion.div>
        </div>
      </section>

      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </main>
  );
}
