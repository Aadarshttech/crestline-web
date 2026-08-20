"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../lib/data';

interface SearchBarProps {
  products: Product[];
  onSearch: (query: string) => void;
  currentQuery: string;
}

export default function SearchBar({ products, onSearch, currentQuery }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [localQuery, setLocalQuery] = useState(currentQuery);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Sync local query with parent query if it changes externally (e.g. "Clear Filters")
  useEffect(() => {
    setLocalQuery(currentQuery);
  }, [currentQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalQuery(val);
    onSearch(val);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setLocalQuery("");
    onSearch("");
    setSelectedIndex(-1);
  };

  // Generate Suggestions (Tokenized fuzzy search with scoring)
  const suggestions = useMemo(() => {
    if (!localQuery.trim()) return [];
    
    const tokens = localQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const rawQuery = localQuery.toLowerCase().trim();
    
    const matched = products.filter(p => {
      const searchString = `${p.title} ${p.category} ${Object.values(p.keyAttributes || {}).join(" ")}`.toLowerCase();
      // Must match ALL tokens
      return tokens.every(token => searchString.includes(token));
    });
    
    // Score the matches so actual titles/categories rank higher than attribute matches
    const scoredMatches = matched.map(p => {
      let score = 0;
      const titleLower = p.title.toLowerCase();
      const categoryLower = p.category?.toLowerCase() || "";

      // Exact phrase match gets massive boost
      if (titleLower.includes(rawQuery)) score += 100;
      if (categoryLower.includes(rawQuery)) score += 50;

      // Token matches
      tokens.forEach(token => {
        if (titleLower.includes(token)) score += 10;
        else if (categoryLower.includes(token)) score += 5;
        else score += 1; // matched in attributes
      });

      return { product: p, score };
    });

    // Sort by score descending
    scoredMatches.sort((a, b) => b.score - a.score);
    
    return scoredMatches.map(m => m.product).slice(0, 5); // Show top 5 suggestions
  }, [localQuery, products]);

  // Handle Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isFocused || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex > -1) {
      e.preventDefault();
      // Normally we'd navigate, but since it's an autocomplete, we'll just set the search to the selected title for now,
      // or directly navigate to the product. Let's navigate to the product.
      window.location.href = `/collections/product/${suggestions[selectedIndex].id}`;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full md:w-[28rem] z-40">
      <div 
        className={`relative flex items-center w-full bg-white border transition-all duration-300 rounded-2xl overflow-hidden ${
          isFocused 
            ? "border-neutral-400 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-4 ring-neutral-100" 
            : "border-neutral-200 shadow-sm hover:border-neutral-300"
        }`}
      >
        <div className="pl-4 pr-2 text-neutral-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for Air Fryers, Cookers..."
          value={localQuery}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full py-3.5 px-2 text-sm font-outfit text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
        />
        
        {localQuery && (
          <button 
            onClick={handleClear}
            className="p-2 mr-2 text-neutral-400 hover:text-neutral-800 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      <AnimatePresence>
        {isFocused && localQuery.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
            className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-neutral-200 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden flex flex-col"
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                <div className="px-5 py-2.5 text-[10px] font-outfit font-bold tracking-[0.2em] text-neutral-400 uppercase border-b border-neutral-100/50 mb-1">
                  Top Suggestions
                </div>
                {suggestions.map((item, idx) => (
                  <Link 
                    href={`/collections/product/${item.id}`} 
                    key={item.id}
                    onClick={() => setIsFocused(false)}
                    className={`group flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                      idx === selectedIndex ? "bg-neutral-50" : "hover:bg-neutral-50/80"
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-grow">
                      <div className="relative w-14 h-14 rounded-xl bg-white overflow-hidden flex-shrink-0 border border-neutral-200/50 shadow-sm group-hover:shadow-md transition-shadow">
                        {item.images?.remote?.[0] ? (
                          <Image 
                            src={item.images.remote[0]} 
                            alt={item.title} 
                            fill 
                            className="object-contain p-1"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-neutral-300 bg-neutral-50">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-[13px] font-outfit font-medium text-neutral-900 leading-tight line-clamp-2 pr-4">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 font-outfit uppercase tracking-wider mt-1">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    
                    {/* Enter arrow icon */}
                    <div className={`flex-shrink-0 text-neutral-300 transition-all duration-300 ${idx === selectedIndex ? "opacity-100 translate-x-0 text-neutral-500" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-10 px-4 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
                   <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-sm font-outfit text-neutral-600 font-medium">
                  No matches found
                </p>
                <p className="text-[11px] text-neutral-400 font-outfit mt-1">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
