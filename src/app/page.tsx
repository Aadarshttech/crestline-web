"use client";

import Navbar from "../../components/Navbar";
import CinemaScroll from "../../components/CinemaScroll";
import AnimatedLogo from "../../components/ui/AnimatedLogo";
import CssImageStacking from "../../components/ui/css-image-stacking";
import DualMarquee from "../../components/ui/DualMarquee";
import WordHighlightSection from "../../components/WordHighlightSection";
import EndingSection from "../../components/EndingSection";
import Footer from "../../components/Footer";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Elegant, subtle parallax depths
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-1%", "1%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-1%", "1%"]);
  
  const textX = useTransform(smoothX, [-0.5, 0.5], ["2%", "-2%"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["2%", "-2%"]);

  const stampX = useTransform(smoothX, [-0.5, 0.5], ["4%", "-4%"]);
  const stampY = useTransform(smoothY, [-0.5, 0.5], ["4%", "-4%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Removed text animation variables for SVG logo replacement

  return (
    <main className="relative w-full bg-black min-h-screen overflow-x-clip selection:bg-white selection:text-black">
      <Navbar />

      {/* Ultra-Luxury Cinematic Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        
        {/* Breathing & Parallax Background */}
        <motion.div 
          style={{ x: bgX, y: bgY }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.div
            animate={{ scale: [1.05, 1.1, 1.05] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/new-hero.png"
              alt="Hero Background"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
          {/* Deep Cinematic Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        </motion.div>

        {/* Foreground Layout */}
        <motion.div 
          style={{ x: textX, y: textY }}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none"
        >
          
          {/* Top Elegant Framing */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute top-32 w-full flex justify-center px-10 md:px-20 text-[10px] md:text-xs font-medium tracking-[0.4em] text-white/50 uppercase"
          >
            <span>Premium Living</span>
          </motion.div>
          
          {/* Main Cinematic Logo */}
          <div className="relative flex flex-col items-center justify-center -mt-16 md:mt-20 w-[90vw] md:w-[75vw] max-w-[1200px] h-[20vh] md:h-[35vh]">
            <AnimatedLogo />
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 2 }}
            className="absolute bottom-10 flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-medium tracking-[0.3em] text-white/40 uppercase">Discover</span>
            <motion.div 
              animate={{ height: ["0px", "40px", "0px"], opacity: [0, 1, 0], y: [0, 20, 40] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] bg-white/50 origin-top"
            />
          </motion.div>

        </motion.div>

        {/* Glassmorphic Stamp */}
        <motion.div
          style={{ x: stampX, y: stampY }}
          initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20 w-32 h-32 md:w-[140px] md:h-[140px] hidden sm:block pointer-events-none"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-full h-full rounded-full border-[0.5px] border-white/30 flex items-center justify-center p-2 backdrop-blur-xl bg-gradient-to-tr from-white/5 to-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ring-1 ring-white/10 inset-0"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full text-white/90 fill-current opacity-90">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text fontSize="9.5" fontWeight="600" letterSpacing="0.2em" className="font-outfit">
                <textPath href="#circlePath" startOffset="0%">
                  PREMIUM LIVING • CRESTLINE • 
                </textPath>
              </text>
            </svg>
          </motion.div>
          {/* Elegant center dot with subtle pulse */}
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
          />
        </motion.div>

      </section>

      {/* Product Collection Carousel */}
      <section className="relative z-10 w-full bg-black">
        <CinemaScroll />
      </section>

      {/* Dual Premium Marquee */}
      <DualMarquee />

      {/* Image Stacking Catalog */}
      <CssImageStacking />

      {/* Word Highlight Section */}
      <WordHighlightSection />

      {/* Ending Section with Background */}
      <EndingSection />

      {/* Luxury Footer */}
      <Footer />
    </main>
  );
}
