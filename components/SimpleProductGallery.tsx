"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  { id: 1, title: "HOME & KITCHEN", image: "/home_kitchen.png", href: "/collections/home-kitchen" },
  { id: 2, title: "CORPORATE GIFTING", image: "/corporate_gifting.png", href: "/collections/corporate-gifting" },
  { id: 3, title: "FURNITURES", image: "/furnitures.png", href: "/collections/furnitures" },
  { id: 4, title: "VR HEADSETS", image: "/vr.png", href: "/collections/vr-headsets" },
];

export default function SimpleProductGallery() {
  return (
    <section className="w-full py-20 px-4 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-5xl md:text-7xl font-bebas tracking-widest uppercase mb-4"
          >
            Our Collections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/60 font-outfit font-light text-lg tracking-widest uppercase"
          >
            Explore our curated categories
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
            >
              <Link 
                href={collection.href}
                className="group relative block w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-white/5"
              >
                {/* Background Image */}
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                {/* Text Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <h2 className="text-white text-3xl md:text-4xl font-bebas tracking-widest uppercase translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    {collection.title}
                  </h2>
                  <div className="mt-4 flex items-center gap-3 opacity-0 -translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-white font-outfit uppercase tracking-[0.2em] text-xs font-medium">
                      Explore Series
                    </span>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
