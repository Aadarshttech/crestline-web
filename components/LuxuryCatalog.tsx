"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  { id: 1, image: "/catalog/product_1.png", name: "The Obsidian Lounge", spanClass: "col-span-1 row-span-1" },
  { id: 2, image: "/catalog/product_2.png", name: "Aethelgard Sectional", spanClass: "col-span-2 row-span-2 md:col-span-2 md:row-span-2" },
  { id: 3, image: "/catalog/product_3.png", name: "Vanguard Minimalist", spanClass: "col-span-1 row-span-1" },
  { id: 4, image: "/catalog/product_4.png", name: "Crestline Signature", spanClass: "col-span-1 row-span-2" },
  { id: 5, image: "/catalog/product_5.png", name: "Ivory Cloud Sofa", spanClass: "col-span-1 row-span-1" },
  { id: 6, image: "/catalog/product_6.png", name: "Noir Executive", spanClass: "col-span-2 row-span-1" },
  { id: 7, image: "/catalog/product_7.png", name: "Zenith Armchair", spanClass: "col-span-1 row-span-1" },
  { id: 8, image: "/catalog/product_8.png", name: "Horizon Recliner", spanClass: "col-span-1 row-span-1" },
  { id: 9, image: "/catalog/product_9.png", name: "Eclipse Dining Set", spanClass: "col-span-2 row-span-2" },
  { id: 10, image: "/catalog/product_10.png", name: "Nova Side Table", spanClass: "col-span-1 row-span-1" },
  { id: 11, image: "/catalog/product_11.png", name: "Lumina Floor Lamp", spanClass: "col-span-1 row-span-1" },
  { id: 12, image: "/catalog/product_12.png", name: "Aura Chaise", spanClass: "col-span-1 row-span-2 md:col-span-2" },
];

export default function LuxuryCatalog() {
  return (
    <section className="relative w-full bg-black py-32 px-4 md:px-8 overflow-hidden z-10" id="catalog">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-thin tracking-[0.2em] uppercase text-white leading-tight"
            style={{
              textShadow: "1px 1px 0px #555, 2px 2px 0px #444, 3px 3px 0px #333, 4px 4px 0px #222, 5px 5px 0px #111, 8px 8px 15px rgba(0,0,0,0.9)",
            }}
          >
            Product<br />Catalogue
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-white/50 font-outfit text-sm md:text-base tracking-[0.2em] max-w-xl uppercase"
          >
            An editorial collection of our most iconic silhouettes and visionary designs.
          </motion.p>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
              className={`relative group cursor-pointer overflow-hidden bg-[#0a0a0a] rounded-sm ${product.spanClass}`}
            >
              {/* Product Image */}
              <div className="w-full h-full relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

              {/* Hover Text Info */}
              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out flex flex-col justify-end">
                <h3 className="text-white font-outfit text-xl md:text-2xl font-light tracking-widest uppercase mb-1">
                  {product.name}
                </h3>
                <p className="text-white/60 font-outfit text-xs tracking-[0.2em] uppercase">
                  Explore Details &rarr;
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
