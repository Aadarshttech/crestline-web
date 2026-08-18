"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";

export interface CollectionItem {
  id: number;
  image: string;
  title: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

// Default items for the component using our Crestline catalog images
const ITEMS: CollectionItem[] = [
  { id: 1, image: "/catalog/product_1.png", title: "The Obsidian Lounge" },
  { id: 2, image: "/catalog/product_2.png", title: "Aethelgard Sectional" },
  { id: 3, image: "/catalog/product_4.png", title: "Crestline Signature" },
  { id: 4, image: "/catalog/product_6.png", title: "Noir Executive" },
  { id: 5, image: "/catalog/product_9.png", title: "Eclipse Dining Set" },
  { id: 6, image: "/catalog/product_12.png", title: "Aura Chaise" },
];

interface CollectionSurferProps {
  items?: CollectionItem[];
  variant?: CollectionSurferVariant;
}

export function CollectionSurfer({
  items = ITEMS,
  variant = "magnetic",
}: CollectionSurferProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use component-specific scroll progress (0 to 1) instead of global scrollY
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  // Step vector
  const stepX = 240;
  const stepY = -84;
  const stepZ = -288;

  // Map 0 -> 1 progress to the total distance needed to clear all items
  const x = useTransform(smoothProgress, [0, 1], [0, -items.length * stepX]);
  const y = useTransform(smoothProgress, [0, 1], [0, -items.length * stepY]);
  const z = useTransform(smoothProgress, [0, 1], [0, -items.length * stepZ]);

  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (variant === "simple") return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    if (variant === "simple") return;
    mouseX.set(-10000);
    mouseY.set(-10000);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black w-full" 
      style={{ height: "300vh" }} 
      id="catalog"
    >
      {/* Sticky viewport */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-container z-0"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* UI Overlays */}
        <div className="absolute top-[10vh] md:top-[8vw] left-[4vw] md:left-[3vw] z-50 pointer-events-none mix-blend-difference">
          <h1 
            className="font-outfit font-light text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] tracking-[0.2em] uppercase text-white"
            style={{
              textShadow: "1px 1px 0px #555, 2px 2px 0px #444, 3px 3px 0px #333, 4px 4px 0px #222, 5px 5px 0px #111, 8px 8px 15px rgba(0,0,0,0.9)",
            }}
          >
            Product<br />Catalogue
            <span className="text-[0.4em] align-top relative top-[0.6em] ml-2 font-mono tabular-nums tracking-widest text-white/50">
              ({items.length})
            </span>
          </h1>
        </div>

        <div className="absolute bottom-[3vw] right-[3vw] z-50 font-outfit text-xs tracking-[0.2em] uppercase text-white/50">
          scroll to explore
        </div>

        {/* 3D Scene */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "10% 10%",
          }}
        >
          {/* Animated Track */}
          <motion.div
            className="relative w-0 h-0"
            style={{
              x,
              y,
              z,
              transformStyle: "preserve-3d",
            }}
          >
            {items.map((item, i) => (
              <Card
                key={`${item.id}-${i}`}
                item={item}
                i={i}
                stepX={stepX}
                stepY={stepY}
                stepZ={stepZ}
                mouseX={mouseX}
                mouseY={mouseY}
                scrollProgress={smoothProgress}
                variant={variant}
                total={items.length}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Card({
  item,
  i,
  stepX,
  stepY,
  stepZ,
  mouseX,
  mouseY,
  scrollProgress,
  variant,
  total,
}: {
  item: CollectionItem;
  i: number;
  stepX: number;
  stepY: number;
  stepZ: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
  variant: CollectionSurferVariant;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to center of card
  const distance = useTransform([mouseX, mouseY, scrollProgress], ([x, y]: number[]) => {
    if (!ref.current || variant === "simple") return 200; // Default large distance
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow((x as number) - centerX, 2) + Math.pow((y as number) - centerY, 2));
    return dist;
  });

  // --- Magnetic Variant ---
  // Map distance to scale: Closer = larger
  const targetScale = useTransform(distance, [0, 400], [1.5, 1]);
  const springScale = useSpring(targetScale, {
    mass: 0.5,
    stiffness: 300,
    damping: 20,
  });

  // --- Uplift Variant ---
  // Map distance to Y uplift: Closer = move up (negative Y)
  const targetUplift = useTransform(distance, [0, 400], [-100, 0]);
  const springUplift = useSpring(targetUplift, {
    mass: 0.5,
    stiffness: 300,
    damping: 20,
  });

  // Combine transforms based on variant
  const innerTransform = useTransform([springScale, springUplift], ([s, u]) => {
    let scaleValue = 1;
    let upliftValue = 0;

    if (variant === "magnetic") {
      scaleValue = Number(s);
    } else if (variant === "uplift") {
      upliftValue = Number(u);
    }

    return `translateY(${upliftValue}px) rotateY(-50deg) scale(${scaleValue})`;
  });

  const baseX = i * stepX;
  const baseY = i * stepY;
  const baseZ = i * stepZ;

  return (
    <div
      ref={ref}
      className="absolute w-[300px] h-[400px]"
      style={{
        transform: `translate3d(${baseX}px, ${baseY}px, ${baseZ}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative w-full h-full bg-neutral-900 overflow-hidden shadow-2xl transition-colors duration-500 ease-out group"
        style={{
          transform: innerTransform,
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          willChange: "transform",
        }}
      >
        {/* Index number */}
        <div className="absolute top-4 right-4 text-white font-outfit text-xs tracking-widest opacity-50 z-10">
          {String((i % total) + 1).padStart(2, "0")}
        </div>
        
        {/* Title */}
        <div className="absolute bottom-6 left-6 right-6 text-white font-outfit text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 translate-y-4 group-hover:translate-y-0">
          {item.title}
        </div>

        {/* Image */}
        <div className="relative w-full h-full brightness-75 group-hover:brightness-100 transition-all duration-700 ease-out">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </div>
  );
}

export default CollectionSurfer;
