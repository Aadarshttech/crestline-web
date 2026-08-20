"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  { 
    id: "home-kitchen", 
    title: "Home & Kitchen", 
    tag: "Commercial Cookware", 
    image: "/home_kitchen.png", 
    href: "/collections/home-kitchen"
  },
  { 
    id: "corporate-gifting", 
    title: "Corporate Gifting", 
    tag: "Executive Sets", 
    image: "/corporate_gifting.png", 
    href: "/collections/corporate-gifting"
  },
  { 
    id: "furnitures", 
    title: "Living & Furnitures", 
    tag: "Architectural Pieces", 
    image: "/furnitures.png", 
    href: "/collections/furnitures"
  },
  { 
    id: "vr-headsets", 
    title: "Optics & VR Headsets", 
    tag: "Wearable Tech", 
    image: "/vr.png", 
    href: "/collections/vr-headsets"
  },
];

export default function SimpleProductGallery() {
  return (
    <section className="w-full py-12 px-4 bg-[#FAFAF8] text-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-100 border border-neutral-200/80 mb-3 text-[11px] font-semibold tracking-wider text-neutral-700 uppercase">
            Manufacturing Catalog
          </div>

          <h1 className="text-3xl font-outfit uppercase tracking-tight font-light text-neutral-950">
            Curated <span className="font-semibold text-neutral-900">Collections</span>
          </h1>
          <p className="text-neutral-500 font-outfit font-light text-sm mt-2">
            Explore commercial culinary hardware and architectural living
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {collections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
            >
              <Link 
                href={collection.href}
                className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm"
              >
                {/* Background Image */}
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                
                {/* Subtle Clean Dark Gradient Overlay for legible typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-white/90 backdrop-blur-md text-neutral-900 shadow-sm">
                    {collection.tag}
                  </span>
                </div>

                {/* Text Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 text-white">
                  <h2 className="text-2xl font-outfit uppercase tracking-wider font-semibold">
                    {collection.title}
                  </h2>
                  <div className="mt-2 flex items-center gap-2 text-neutral-200 font-outfit uppercase tracking-wider text-xs font-medium">
                    <span>View Catalog</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
