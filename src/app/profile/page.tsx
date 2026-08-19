"use client";

import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const certifications = ["TUV", "CB", "CE", "SAA", "ROHS", "EMC", "KC", "GS"];
  const products = [
    "Intelligent Rice Cookers",
    "Pressure Cookers",
    "Air Fryers",
    "Electric Ovens",
    "Juice Blenders",
    "Electric Kettles"
  ];

  return (
    <main className="relative w-full bg-black min-h-screen flex flex-col selection:bg-white selection:text-black overflow-x-clip">
      <Navbar alwaysShowLogo={true} />

      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-16 overflow-hidden">
        
        {/* Background Image Layer */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/corporate_gifting.png"
            alt="Corporate Profile Background"
            fill
            className="object-cover object-center opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black"></div>
        </div>

        {/* Massive Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-5 z-0">
          <h1 className="text-[30vw] font-outfit font-bold whitespace-nowrap text-white">
            2011
          </h1>
        </div>
        
        <div className="relative z-10 max-w-5xl text-center flex flex-col items-center gap-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="uppercase tracking-[0.4em] text-white/50 text-xs md:text-sm font-medium"
          >
            Company Profile
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-white text-4xl md:text-6xl lg:text-7xl font-outfit font-light uppercase tracking-widest leading-tight drop-shadow-2xl"
          >
            Foshan City <br/> Crestline
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="w-24 h-[1px] bg-white/30 mt-4"
          ></motion.div>
        </div>
      </section>

      {/* The Foundation */}
      <section className="relative w-full py-32 px-6 md:px-12 overflow-hidden">
        
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/furnitures.png"
            alt="Manufacturing Facility"
            fill
            className="object-cover object-center opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white text-3xl md:text-5xl font-outfit font-light tracking-wide uppercase mb-8 drop-shadow-lg">
              The <br/> Foundation
            </h2>
            <div className="flex flex-col gap-6 text-white/70 font-light text-lg md:text-xl leading-relaxed">
              <p>
                Established in 2011, Crestline Life Products has grown into an industry-leading force with two massive state-of-the-art manufacturing facilities strategically located in Zhongshan and Foshan Shunde.
              </p>
              <p>
                We operate strictly under ISO 9001 and BSCI quality management systems, ensuring that every product leaving our facilities meets the absolute highest global standards.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            <div className="backdrop-blur-md bg-black/40 border border-white/10 p-8 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/[0.02] transition-colors shadow-2xl">
              <span className="text-4xl md:text-6xl font-outfit font-light text-white">2011</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">Established</span>
            </div>
            <div className="backdrop-blur-md bg-black/40 border border-white/10 p-8 flex flex-col items-center justify-center text-center gap-4 hover:bg-white/[0.02] transition-colors shadow-2xl">
              <span className="text-4xl md:text-6xl font-outfit font-light text-white">02</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40">Major Factories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Excellence */}
      <section className="relative z-10 w-full py-32 px-6 md:px-12 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24">
          
          <div className="lg:w-1/3 flex flex-col gap-6">
            <h2 className="text-white text-3xl md:text-5xl font-outfit font-light tracking-wide uppercase">
              Mastery In <br/> Production
            </h2>
            <div className="w-16 h-[1px] bg-white/20"></div>
            <p className="text-white/60 font-light text-lg leading-relaxed mt-4">
              We are a professional manufacturer equipped with entirely complete production lines. We proudly offer comprehensive OEM, ODM, and SKD services to globally renowned brands with reliable quality and professional support.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product, i) => (
              <motion.div 
                key={product}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-6 border-b border-white/10 flex items-center justify-between group"
              >
                <span className="text-white/80 font-outfit text-xl font-light group-hover:text-white transition-colors">{product}</span>
                <span className="text-white/20 text-sm font-outfit group-hover:translate-x-2 transition-transform">0{i + 1}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Trust & Certifications */}
      <section className="relative w-full py-32 border-t border-b border-white/10 overflow-hidden">
        
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/endingbg.avif"
            alt="Global Trust"
            fill
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-12">
          
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-white/50 uppercase tracking-[0.4em] text-xs font-medium">Global Trust</h3>
            <p className="text-white/90 text-xl md:text-3xl font-outfit font-light max-w-3xl leading-relaxed drop-shadow-md">
              Our products are trusted and sold all over the world, meeting the rigorous certification needs of different countries.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8">
            {certifications.map((cert) => (
              <span key={cert} className="text-3xl md:text-5xl font-outfit font-light text-white/40 hover:text-white transition-colors duration-500 cursor-default hover:scale-105 transform">
                {cert}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* Push footer to bottom */}
      <div className="relative z-10 w-full mt-auto">
        <Footer />
      </div>
    </main>
  );
}
