"use client";

import { useState, useRef } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../lib/data';
import { useLanguage } from '../lib/LanguageContext';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const allImages = product.images.remote || [];
  const hasVideo = product.hasVideo && !!product.video?.remote;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState<"Photos" | "Video">(hasVideo ? "Video" : "Photos");
  const thumbnailListRef = useRef<HTMLDivElement>(null);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center' });
  const { t, language } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMedia !== "Photos") return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  // Initialize selected options with the first value of each SKU option
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.skuOptions) {
      Object.entries(product.skuOptions).forEach(([key, values]) => {
        if (values && values.length > 0) {
          initial[key] = values[0];
        }
      });
    }
    return initial;
  });

  // Auto-switch to Photos if we click an image thumbnail
  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (activeMedia === "Video") {
      setActiveMedia("Photos");
    }
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const scrollThumbnails = (dir: "up" | "down") => {
    if (thumbnailListRef.current) {
      const scrollAmount = 80;
      thumbnailListRef.current.scrollBy({
        top: dir === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 font-outfit selection:bg-neutral-900 selection:text-white pb-24">
      
      {/* Luxury Breadcrumbs */}
      <div className="w-full border-b border-neutral-100">
        <div className="max-w-[1400px] mx-auto px-6 py-5 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 flex items-center gap-4">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home Appliances</Link>
          <span className="text-neutral-200">/</span>
          <Link href="/collections/all" className="hover:text-neutral-900 transition-colors">{product.category || "General"}</Link>
          <span className="text-neutral-200">/</span>
          <span className="text-neutral-900 truncate">{product.title.substring(0, 30)}...</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* ========================================= */}
        {/* LEFT COLUMN: Media Viewer */}
        {/* ========================================= */}
        <div className="w-full lg:w-[50%] flex flex-col items-center">
          
          <div className="flex gap-4 w-full h-[550px] lg:h-[650px]">
            {/* Vertical Thumbnails */}
            <div className="w-20 flex-shrink-0 flex flex-col relative group">
              <button 
                onClick={() => scrollThumbnails("up")}
                className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-white/95 backdrop-blur border border-neutral-200 shadow-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-neutral-400"
              >
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" /></svg>
              </button>
              
              <div 
                ref={thumbnailListRef}
                className="flex-grow overflow-y-auto hide-scrollbar flex flex-col gap-3 py-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    onMouseEnter={() => handleThumbnailClick(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all duration-300 flex-shrink-0 ${
                      activeIndex === idx && activeMedia === "Photos" 
                        ? "border-neutral-900 shadow-md ring-2 ring-neutral-100 scale-[1.02]" 
                        : "border-neutral-200 hover:border-neutral-400 hover:shadow-sm opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumb ${idx}`} fill sizes="80px" className="object-contain p-2 mix-blend-multiply" />
                  </button>
                ))}
              </div>

              <button 
                onClick={() => scrollThumbnails("down")}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 w-8 h-8 bg-white/95 backdrop-blur border border-neutral-200 shadow-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-neutral-400"
              >
                <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>

            {/* Main Stage */}
            <div 
              className="flex-grow relative bg-[#FAFAF8] rounded-3xl border border-neutral-200/60 overflow-hidden group"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomStyle({ transformOrigin: 'center center' })}
            >
              
              <AnimatePresence mode="wait">
                {activeMedia === "Video" && hasVideo ? (
                  <motion.video 
                    key="video"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                    src={product.video!.remote} autoPlay loop muted playsInline className="w-full h-full object-cover" 
                  />
                ) : (
                  allImages[activeIndex] && (
                    <motion.div 
                      key={`img-${activeIndex}`}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center p-8"
                    >
                      <Image 
                        src={allImages[activeIndex]} 
                        alt={product.title} 
                        fill 
                        sizes="(max-width: 1024px) 100vw, 50vw" 
                        style={zoomStyle}
                        className="object-contain mix-blend-multiply p-8 transition-transform duration-200 ease-out group-hover:scale-[2] cursor-zoom-in"
                        priority
                      />
                    </motion.div>
                  )
                )}
              </AnimatePresence>


              {/* Luxury Utilities */}
              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white/40 text-neutral-600 hover:text-red-500 hover:scale-105 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm border border-white/40 text-neutral-600 hover:text-neutral-900 hover:scale-105 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </button>
              </div>

              {/* Navigation Arrows */}
              {activeMedia === "Photos" && allImages.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm border border-white/40 text-neutral-400 hover:text-neutral-900 opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-sm border border-white/40 text-neutral-400 hover:text-neutral-900 opacity-0 group-hover:opacity-100 transition-all hover:scale-105">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* iOS Style Media Toggle */}
          <div className="mt-8 bg-neutral-100/80 backdrop-blur p-1 rounded-full flex border border-neutral-200/50 relative overflow-hidden">
            <div 
              className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm border border-neutral-200/60 transition-transform duration-300 ease-out z-0 ${activeMedia === "Photos" ? (language === 'ar' ? 'translate-x-[calc(-100%+2px)]' : 'translate-x-0') : (language === 'ar' ? 'translate-x-0' : 'translate-x-[calc(100%-2px)]')}`} 
            />
            <button 
              onClick={() => setActiveMedia("Photos")}
              className={`relative z-10 w-28 py-2 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-colors ${activeMedia === "Photos" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"}`}
            >
              {t('gallery')}
            </button>
            <button 
              onClick={() => hasVideo && setActiveMedia("Video")}
              className={`relative z-10 w-28 py-2 text-[11px] font-bold tracking-[0.15em] uppercase rounded-full transition-colors ${!hasVideo ? "opacity-30 cursor-not-allowed" : activeMedia === "Video" ? "text-neutral-900" : "text-neutral-400 hover:text-neutral-600"}`}
            >
              {t('showcase')}
            </button>
          </div>
        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN: Product Info */}
        {/* ========================================= */}
        <div className="w-full lg:w-[50%] flex flex-col font-outfit mt-4">
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase border border-neutral-200 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-light text-neutral-950 uppercase tracking-tight leading-[1.1] mb-8">
            {product.title}
          </h1>
          
          {/* Pricing */}
          <div className="mb-8">
            {product.priceLadder && product.priceLadder.length > 0 ? (
              <div className="flex flex-wrap gap-8">
                {product.priceLadder.map((tier, idx) => (
                  <div key={idx} className={`flex flex-col border-neutral-200/50 ${language === 'ar' ? 'border-r-2 pr-4 first:border-0 first:pr-0' : 'border-l-2 pl-4 first:border-0 first:pl-0'}`}>
                    <span className="text-3xl font-medium text-neutral-900 tracking-tighter mb-1">{tier.price}</span>
                    <span className="text-[10px] font-bold tracking-[0.1em] text-neutral-500 uppercase">{tier.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-2">{t('unitPrice')}</span>
                <span className="text-4xl font-medium text-neutral-900 tracking-tighter">{product.price}</span>
              </div>
            )}
          </div>

          <div className="w-full h-px bg-neutral-200/60 mb-8" />

          {/* Dynamic SKU Options */}
          {product.skuOptions && Object.keys(product.skuOptions).length > 0 && (
            <div className="mb-10 flex flex-col gap-6">
              {Object.entries(product.skuOptions).map(([optionName, optionValues]) => (
                <div key={optionName}>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 uppercase mb-4">{optionName}</p>
                  <div className="flex flex-wrap gap-3">
                    {optionValues.map((val, idx) => {
                      const isSelected = selectedOptions[optionName] === val;
                      return (
                        <button 
                          key={idx} 
                          onClick={() => setSelectedOptions(prev => ({ ...prev, [optionName]: val }))}
                          className={`px-5 py-2.5 border rounded-full text-[11px] font-bold tracking-widest uppercase transition-all ${
                            isSelected 
                              ? 'border-neutral-900 bg-neutral-900 text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5' 
                              : 'border-neutral-200 bg-transparent text-neutral-500 hover:border-neutral-900 hover:text-neutral-900'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="w-full h-px bg-neutral-200/60 mb-8" />

          {/* True Product Specifications */}
          {((product.keyAttributes && Object.keys(product.keyAttributes).length > 0) || Object.keys(product.attributes).length > 0) && (
            <div className="mb-12">
              <h3 className="text-[11px] font-bold tracking-[0.2em] text-neutral-900 uppercase mb-6">{t('quickSpecs')}</h3>
              <div className="grid grid-cols-1 divide-y divide-neutral-100 border-t border-neutral-100">
                {Object.entries(product.keyAttributes || product.attributes).slice(0, 6).map(([k, v]) => (
                  <div key={k} className="flex py-3 group">
                    <span className="w-2/5 font-medium text-xs text-neutral-400 capitalize">{k}</span>
                    <span className="w-3/5 text-sm text-neutral-900 truncate">{v as string}</span>
                  </div>
                ))}
              </div>
              <a href="#full-specs" className="inline-block mt-4 text-[11px] font-bold tracking-[0.1em] text-neutral-400 uppercase hover:text-neutral-900 transition-colors">
                {t('viewAllSpecs')}
              </a>
            </div>
          )}

          {/* Luxury CTA */}
          <div className="sticky bottom-6 z-20 mt-4">
            <button 
              onClick={() => window.open("https://wa.me/YOUR_NUMBER", "_blank")}
              className="group relative w-full flex items-center justify-center gap-4 bg-neutral-900 text-white py-5 px-8 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span className="relative z-10 text-[13px] font-bold tracking-[0.2em] uppercase">{t('initiateOrder')}</span>
            </button>
            <p className="text-center text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-4">
              {t('b2bPricing')}
            </p>
          </div>

        </div>
      </div>

      {/* ========================================= */}
      {/* BELOW THE FOLD: Detailed Sections */}
      {/* ========================================= */}
      <div id="full-specs" className="max-w-[1400px] mx-auto px-6 py-16 mt-8 border-t border-neutral-200/60">
        
        {/* Detailed Attributes Table */}
        {Object.keys(product.attributes).length > 0 && (
          <div className="w-full">
            <div className="mb-10">
              <h2 className="text-3xl font-light tracking-tight text-neutral-900 mb-2">{t('productSpecs')}</h2>
              <p className="text-neutral-500 font-light">{t('productSpecsSub')}</p>
            </div>
            
            <div className="w-full bg-neutral-200/60 border border-neutral-200/60 rounded-2xl overflow-hidden gap-[1px] grid grid-cols-1 md:grid-cols-4 shadow-sm">
              {Object.entries({ ...(product.keyAttributes || {}), ...product.attributes }).map(([key, value]) => (
                <React.Fragment key={key}>
                  {/* Label Cell */}
                  <div className="bg-[#FAFAF8] p-5 lg:p-6 text-[14px] text-neutral-600 font-bold tracking-wide capitalize flex items-center leading-snug">
                    {key}
                  </div>
                  {/* Value Cell */}
                  <div className="bg-white p-5 lg:p-6 text-[15px] text-neutral-900 font-medium flex items-center leading-snug">
                    {value as string}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Packaging and delivery Mock */}
            <h2 className="text-2xl font-light tracking-tight text-neutral-900 mt-16 mb-8">Packaging and delivery</h2>
            <div className="w-full bg-neutral-200/60 border border-neutral-200/60 rounded-2xl overflow-hidden gap-[1px] grid grid-cols-1 md:grid-cols-4 shadow-sm">
              <div className="bg-[#FAFAF8] p-5 lg:p-6 text-[14px] text-neutral-600 font-bold tracking-wide capitalize flex items-center leading-snug">Selling Units</div>
              <div className="bg-white p-5 lg:p-6 text-[15px] text-neutral-900 font-medium flex items-center leading-snug">Single item</div>
              <div className="bg-[#FAFAF8] p-5 lg:p-6 text-[14px] text-neutral-600 font-bold tracking-wide capitalize flex items-center leading-snug">Single package size</div>
              <div className="bg-white p-5 lg:p-6 text-[15px] text-neutral-900 font-medium flex items-center leading-snug">19X19X10 cm</div>
              <div className="bg-[#FAFAF8] p-5 lg:p-6 text-[14px] text-neutral-600 font-bold tracking-wide capitalize flex items-center leading-snug">Single gross weight</div>
              <div className="bg-white p-5 lg:p-6 text-[15px] text-neutral-900 font-medium flex items-center col-span-1 md:col-span-3 leading-snug">1.0 kg</div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
