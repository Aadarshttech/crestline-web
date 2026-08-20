"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../lib/data';
import VideoThumbnail from './VideoThumbnail';
import SearchBar from './SearchBar';

interface ProductGalleryProps {
  products: Product[];
  categories: string[];
  topPicks?: Product[];
}

export default function ProductGallery({ products, categories, topPicks = [] }: ProductGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredProducts = useMemo(() => {
    // 1. Tokenize search query
    const tokens = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    let results = products.filter(p => {
      // Category filter
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      
      // Tokenized Fuzzy Search
      const searchString = `${p.title} ${p.category} ${Object.values(p.keyAttributes || {}).join(" ")}`.toLowerCase();
      const matchesSearch = tokens.length === 0 || tokens.every(token => searchString.includes(token));
      
      return matchesCategory && matchesSearch;
    });

    // If we are viewing "All Products", prioritize Air Fryers
    if (activeCategory === "All" && !searchQuery) {
      results.sort((a, b) => {
        const aIsAirFryer = a.category?.includes("Air Fryer") ? -1 : 1;
        const bIsAirFryer = b.category?.includes("Air Fryer") ? -1 : 1;
        return aIsAirFryer - bIsAirFryer;
      });
    }

    return results;
  }, [products, activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex flex-col max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12">
      
      {/* Search and Top Bar */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-neutral-200 pb-8">
        
        {/* New Advanced Search Bar Component */}
        <SearchBar 
          products={products} 
          currentQuery={searchQuery}
          onSearch={(val) => setSearchQuery(val)} 
        />
        
        <div className="flex items-center gap-2">
           <span className="text-xs font-outfit text-neutral-500 uppercase tracking-wider">Quick Filters:</span>
           <button onClick={() => {setActiveCategory("All"); setSearchQuery("");}} className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs font-outfit text-neutral-700 transition-colors">Clear All</button>
        </div>
      </div>

      {/* Top 5 Hottest Picks (Only show when not actively searching/filtering heavily) */}
      {topPicks.length > 0 && activeCategory === "All" && !searchQuery && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32-2.59 2.08-3.61 5.75-2.39 8.9.04.1.08.2.08.33 0 .22-.15.42-.35.5-.22.1-.46.04-.56-.12-.32-.53-.55-1.12-.67-1.7-.35-1.5-.2-3.03.35-4.37-1.67 1.3-2.92 3.1-3.32 5.2-.42 2.12.02 4.3 1.32 6.07 1.57 2.13 4.18 3.3 6.95 3.3 4.14 0 7.69-3.23 7.82-7.36.03-1.05-.2-2.12-.73-3.06-.2-.3-.5-.6-.73-.83z"/>
            </svg>
            <h2 className="text-xl font-outfit font-medium text-neutral-900 uppercase tracking-wider">Hottest Picks</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topPicks.map((product) => (
              <motion.div
                key={`top-${product.id}`}
                whileHover={{ y: -4 }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300"
              >
                <Link href={`/collections/product/${product.id}`} className="flex flex-col h-full">
                  <VideoThumbnail 
                    imageSrc={product.images?.remote?.[0] || ""} 
                    videoSrc={product.video?.remote} 
                    alt={product.title} 
                    category={product.category}
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="text-sm font-outfit font-medium text-neutral-900 leading-snug line-clamp-2 mb-2 group-hover:text-black">
                      {product.title}
                    </h4>
                    <p className="text-base font-semibold text-neutral-900 mt-auto">{product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar - Categories */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-28">
            <h2 className="text-sm font-outfit font-semibold uppercase tracking-widest text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
              Categories
            </h2>
            <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              <li>
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-outfit tracking-wider transition-all w-full text-left ${
                    activeCategory === "All"
                      ? "bg-neutral-900 text-white font-medium shadow-md"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  All Products
                  <span className="ml-2 text-[10px] opacity-50">({products.length})</span>
                </button>
              </li>
              {categories.map(category => {
                const count = products.filter(p => p.category === category).length;
                return (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-outfit tracking-wider transition-all w-full text-left ${
                        activeCategory === category
                          ? "bg-neutral-900 text-white font-medium shadow-md"
                          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                      }`}
                    >
                      {category}
                      <span className="ml-2 text-[10px] opacity-50">({count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="flex-grow">
          <div className="mb-6 flex justify-between items-end pb-4 border-b border-neutral-200">
            <h3 className="text-2xl font-outfit font-light uppercase tracking-widest text-neutral-900">
              {searchQuery ? "Search Results" : activeCategory} <span className="font-semibold">{activeCategory === "All" && !searchQuery ? "Collection" : ""}</span>
            </h3>
            <span className="text-sm font-outfit text-neutral-500">
              Showing {filteredProducts.length} results
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {displayedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:border-neutral-300 transition-all duration-300"
                >
                  <Link href={`/collections/product/${product.id}`} className="flex flex-col h-full">
                    
                    {/* Hover Video Thumbnail */}
                    <VideoThumbnail 
                      imageSrc={product.images?.remote?.[0] || ""} 
                      videoSrc={product.video?.remote} 
                      alt={product.title}
                      category={product.category}
                    />

                    {/* Product Details */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <p className="text-[10px] font-outfit font-medium text-neutral-400 uppercase tracking-widest mb-2 line-clamp-1">
                          {product.category}
                        </p>
                        <h4 className="text-sm font-outfit font-medium text-neutral-900 leading-snug line-clamp-2 mb-4 group-hover:text-black">
                          {product.title}
                        </h4>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-4 border-t border-neutral-100">
                        <div>
                          <p className="text-xs text-neutral-500 font-outfit mb-0.5">Price / MOQ</p>
                          <p className="text-base font-semibold text-neutral-900">{product.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-outfit text-neutral-400 uppercase tracking-wider">
                            {product.minOrder || "Min. 1 piece"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {displayedProducts.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-outfit font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-sm text-neutral-500 max-w-sm">
                  Try adjusting your search query or selecting a different category.
                </p>
                <button 
                  onClick={() => {setSearchQuery(""); setActiveCategory("All"); setCurrentPage(1);}}
                  className="mt-6 px-6 py-2 bg-neutral-900 text-white text-sm font-outfit rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="w-full flex justify-center items-center gap-2 mt-16 pt-8 border-t border-neutral-200">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-1 mx-4">
                {/* Simplified page numbers logic to prevent clutter */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                  // Show pages around current page
                  let pageNum = currentPage;
                  if (currentPage <= 3) pageNum = idx + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + idx;
                  else pageNum = currentPage - 2 + idx;
                  
                  if (pageNum > 0 && pageNum <= totalPages) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full text-sm font-outfit transition-colors ${
                          currentPage === pageNum 
                            ? "bg-neutral-900 text-white font-medium" 
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
