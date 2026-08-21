"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CorporateGift {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function LuxuryGallery() {
  const [gifts, setGifts] = useState<CorporateGift[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const WHATSAPP_NUMBER = "1234567890";

  useEffect(() => {
    fetch("/corporateGifts.json")
      .then((res) => res.json())
      .then((data) => {
        setGifts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load corporate gifts:", err);
        setLoading(false);
      });
  }, []);

  const handleInquiry = (productName: string) => {
    const message = encodeURIComponent(`Hello, I am interested in inquiring about the "${productName}" corporate gift kit. Could you please provide more details?`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const filteredGifts = gifts.filter(gift => 
    gift.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    gift.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-t-2 border-[#C5A059] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Search and Header Section */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#EADDCA]">
          <div>
            <h3 className="text-2xl font-outfit font-light uppercase tracking-widest text-[#2C2620] mb-2">
              The Platinum <span className="font-semibold text-[#C5A059]">Collection</span>
            </h3>
            <span className="text-sm font-outfit text-[#8B7355]">
              Showing {filteredGifts.length} results
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#C5A059]/60">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search corporate gifts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#EADDCA] rounded-xl text-[#2C2620] placeholder-[#8B7355]/50 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] font-outfit text-sm transition-all shadow-[0_4px_20px_rgba(197,160,89,0.05)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#C5A059]/60 hover:text-[#C5A059]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredGifts.map((gift, index) => (
              <motion.div 
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#EADDCA]/50 shadow-[0_8px_30px_rgba(44,38,32,0.04)] hover:shadow-[0_12px_40px_rgba(197,160,89,0.12)] hover:border-[#C5A059]/40 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FBF9F6]">
                  <Image
                    src={gift.image}
                    alt={gift.name}
                    fill
                    className="object-cover object-center transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 opacity-95 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={90}
                  />
                  {/* Subtle warm overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7]/40 via-transparent to-transparent opacity-80" />
                  
                  {/* Crestline Logo Top Left Overlay */}
                  <div className="absolute top-4 left-5 w-24 h-6 z-10 opacity-90 drop-shadow-md">
                    <Image
                      src="/hero-logo.svg"
                      alt="Crestline Logo"
                      fill
                      className="object-contain object-left brightness-0 invert drop-shadow-sm"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col flex-grow justify-between relative z-10">
                  <div>
                    <p className="text-[10px] font-outfit font-medium text-[#C5A059] uppercase tracking-widest mb-2 line-clamp-1">
                      Crestline Exclusive
                    </p>
                    <h4 className="text-xl font-outfit font-medium text-[#2C2620] leading-snug line-clamp-2 mb-3">
                      {gift.name}
                    </h4>
                    <p className="text-[#8B7355] font-outfit text-sm leading-relaxed line-clamp-3 mb-6">
                      {gift.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-5 border-t border-[#EADDCA]/50">
                    <button 
                      onClick={() => handleInquiry(gift.name)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white hover:bg-[#FDFBF7] text-[#2C2620] border border-[#C5A059]/40 hover:border-[#C5A059] rounded-full font-outfit font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-[0_4px_15px_rgba(197,160,89,0.15)]"
                    >
                      <svg className="w-4 h-4 text-[#C5A059]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                      Inquire via WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredGifts.length === 0 && !loading && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-white border border-[#EADDCA] flex items-center justify-center mb-4 shadow-sm">
                <svg className="w-6 h-6 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-outfit font-medium text-[#2C2620] mb-2">No corporate gifts found</h3>
              <p className="text-sm text-[#8B7355] max-w-sm mb-6">
                We couldn't find anything matching "{searchQuery}".
              </p>
              <button 
                onClick={() => setSearchQuery("")}
                className="px-6 py-2 bg-white text-[#C5A059] text-sm font-outfit rounded-full hover:bg-[#FDFBF7] border border-[#C5A059]/40 transition-colors shadow-sm"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
}
