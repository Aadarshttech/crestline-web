"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "../lib/LanguageContext";
import { Language } from "../lib/translations";

const NAV_LINKS = [
  { translationKey: "navHome", href: "/" },
  { translationKey: "navProducts", href: "/collections" },
  { translationKey: "navProfile", href: "/profile" },
  { translationKey: "navContact", href: "/contact" },
];

interface NavbarProps {
  alwaysShowLogo?: boolean;
  theme?: "dark" | "light";
}

export default function Navbar({ alwaysShowLogo = false, theme = "dark" }: NavbarProps) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isLight = theme === "light";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled || isOpen
            ? isLight
              ? "bg-white/85 backdrop-blur-xl py-4 border-b border-neutral-200/80 shadow-sm"
              : "bg-black/40 backdrop-blur-2xl py-4 border-b border-white/10 shadow-lg"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center group transition-all duration-500 hover:scale-[1.02] ${
              alwaysShowLogo || isScrolled || isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <div className="relative w-40 h-10 flex-shrink-0">
              <Image
                src="/hero-logo.svg"
                alt="Crestline Logo"
                fill
                className={`object-contain object-left transition-all duration-500 ${
                  isLight ? "brightness-0" : "brightness-0 invert"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Links & Tools */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.translationKey}>
                  <Link
                    href={link.href}
                    className={`relative group text-xs tracking-[0.22em] uppercase font-outfit font-medium transition-colors duration-300 ${
                      isLight 
                        ? "text-neutral-600 hover:text-neutral-950" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {t(link.translationKey)}
                    <span
                      className={`absolute left-0 -bottom-2 w-full h-[1.5px] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                        isLight ? "bg-neutral-900" : "bg-white"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Language Selector */}
            <div className="relative group">
              <button 
                className={`flex items-center gap-1.5 transition-all duration-300 ${
                  isLight 
                    ? "text-neutral-500 hover:text-neutral-900" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.954 11.954 0 0 1 12 15c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12" />
                </svg>
                <span className="text-xs tracking-[0.2em] uppercase font-outfit font-medium mt-0.5">{t('language')}</span>
                <svg className="w-3 h-3 opacity-60 ml-0.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute right-0 top-full pt-6 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300">
                <div className={`flex flex-col rounded-xl overflow-hidden shadow-xl border w-40 ${isLight ? 'bg-white border-neutral-100' : 'bg-neutral-900 border-white/10'}`}>
                  {[
                    { label: 'English (EN)', value: 'en' },
                    { label: 'العربية (AR)', value: 'ar' },
                    { label: 'Français (FR)', value: 'fr' },
                    { label: '中文 (ZH)', value: 'zh' }
                  ].map((lang, idx) => (
                    <button 
                      key={lang.value} 
                      onClick={() => setLanguage(lang.value as Language)}
                      className={`px-5 py-3.5 text-[10px] tracking-widest uppercase font-medium text-left whitespace-nowrap transition-colors ${idx !== 3 && isLight ? 'border-b border-neutral-100' : ''} ${idx !== 3 && !isLight ? 'border-b border-white/5' : ''} ${language === lang.value ? (isLight ? 'bg-neutral-100 text-neutral-900' : 'bg-white/10 text-white') : (isLight ? 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950' : 'text-white/70 hover:bg-white/5 hover:text-white')}`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden relative z-50 transition-colors p-2 -mr-2 ${
              isLight ? "text-neutral-900 hover:text-black" : "text-white/70 hover:text-white"
            }`}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 ${
              isLight 
                ? "bg-white/95 backdrop-blur-2xl text-neutral-900" 
                : "bg-black/95 backdrop-blur-2xl text-white"
            }`}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.translationKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl tracking-[0.2em] uppercase font-outfit font-medium transition-colors ${
                    isLight 
                      ? "text-neutral-800 hover:text-black" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {t(link.translationKey)}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
