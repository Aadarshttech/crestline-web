"use client";

import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const LOCAL_IMAGES = [
  "/gallery/image-1.png",
  "/gallery/image-2.jpg",
  "/gallery/image-3.png",
  "/gallery/image-4.jpg",
  "/gallery/image-5.png",
  "/gallery/image-6.jpg",
  "/gallery/image-7.jpg",
  "/gallery/image-8.png",
  "/gallery/image-9.jpg",
  "/gallery/image-10.png",
  "/gallery/image-11.jpg",
  "/gallery/image-12.jpg",
  "/gallery/image-13.png",
  "/gallery/image-14.jpg",
];

interface ImageCardProps {
  src: string;
  onLoad?: () => void;
}

const ImageCard = ({ src, onLoad }: ImageCardProps) => {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex-shrink-0 bg-white transition-transform duration-300 hover:scale-[1.02] cursor-pointer relative will-change-transform backface-hidden preserve-3d rounded-xl overflow-hidden shadow-lg border border-gray-100">
      <img
        src={src}
        alt="Gallery Asset"
        loading="lazy"
        onLoad={onLoad}
        className="w-full h-full object-cover transition-opacity duration-300 mix-blend-multiply"
      />
    </div>
  );
};

export default function UnfurlingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const loadedCountRef = useRef(0);

  const handleItemLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isReady && loadedCountRef.current >= 1) setIsReady(true);
  }, [isReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const colMedia = useMemo(() => {
    const col1Base = LOCAL_IMAGES.filter((_, i) => i % 4 === 0);
    const col2Base = LOCAL_IMAGES.filter((_, i) => i % 4 === 1);
    const col3Base = LOCAL_IMAGES.filter((_, i) => i % 4 === 2);
    const col4Base = LOCAL_IMAGES.filter((_, i) => i % 4 === 3);

    return {
      col1: [...col1Base, ...col1Base],
      col2: [...col2Base, ...col2Base],
      col3: [...col3Base, ...col3Base],
      col4: [...col4Base, ...col4Base],
    };
  }, []);

  // LINKED SCROLL: Removed the internal scrolling wrapper so it seamlessly tracks window scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    mass: 0.1,
  });

  // Banner animations
  const bannerWidth = useTransform(smoothProgress, [0, 0.15], ["90vw", "100vw"]);
  const bannerHeight = useTransform(smoothProgress, [0, 0.15], ["80vh", "100vh"]);
  const bannerRadius = useTransform(smoothProgress, [0, 0.15], ["48px", "0px"]);
  const bannerBorderWidth = useTransform(smoothProgress, [0, 0.15], ["4px", "0px"]);

  // 3D Matrix animations
  const rotateY = useTransform(smoothProgress, [0.15, 1], [-45, -8]);
  const rotateX = useTransform(smoothProgress, [0.15, 1], [25, 4]);
  const rotateZ = useTransform(smoothProgress, [0.15, 1], [15, 2]);
  const translateZ = useTransform(smoothProgress, [0.15, 1], [-800, 0]);

  // Track columns parallax animations
  const yCol1 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol2 = useTransform(smoothProgress, [0.15, 1], ["-40%", "10%"]);
  const yCol3 = useTransform(smoothProgress, [0.15, 1], ["0%", "-40%"]);
  const yCol4 = useTransform(smoothProgress, [0.15, 1], ["-30%", "20%"]);

  return (
    <section className="relative w-full bg-white text-black font-sans selection:bg-black selection:text-white z-30">
      
      {/* Static Title Section - Scrolls normally and prevents overlap */}
      <div className="w-full pt-32 pb-16 flex flex-col items-center justify-center bg-white relative z-40">
        <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-gray-400 mb-4 uppercase">
          Discover Our Range
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold uppercase tracking-wider text-black mb-8">
          Product Catalog
        </h2>
        <div className="w-12 h-1 bg-black/20"></div>
      </div>

      {/* 3D Parallax Gallery - Sticky Section */}
      <div ref={containerRef} className="relative w-full h-[200vh]">
        <div className="sticky top-0 h-screen w-full flex justify-center items-center overflow-hidden">
          <motion.div
          style={{
            width: bannerWidth,
            height: bannerHeight,
            borderRadius: bannerRadius,
            borderWidth: bannerBorderWidth,
            borderColor: "#f3f4f6", // Light gray border for white theme
          }}
          className="relative bg-white overflow-hidden flex items-center justify-center max-w-[1920px] mx-auto will-change-transform backface-hidden preserve-3d shadow-2xl"
        >
          <div
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
            style={{ perspective: "1000px" }}
          >
            {/* Ambient Shadow Box Masking (Adapted for White Background) */}
            <div className="absolute inset-0 z-20 shadow-[inset_0_100px_150px_-50px_rgba(255,255,255,0.9),inset_0_-100px_150px_-50px_rgba(255,255,255,0.9)]" />
            <div className="absolute inset-0 z-20 shadow-[inset_150px_0_150px_-50px_rgba(255,255,255,0.9),inset_-150px_0_150px_-50px_rgba(255,255,255,0.9)]" />

            {/* Parallax Image Grid Matrix */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                rotateZ,
                z: translateZ,
                transformStyle: "preserve-3d",
              }}
              className="flex gap-4 md:gap-6 justify-center items-center w-[120vw] h-[150vh] origin-center opacity-100 will-change-transform backface-hidden"
            >
              <motion.div style={{ y: yCol1 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col1.map((src, index) => (
                  <ImageCard key={`col1-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol2 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col2.map((src, index) => (
                  <ImageCard key={`col2-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol3 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col3.map((src, index) => (
                  <ImageCard key={`col3-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>

              <motion.div style={{ y: yCol4 }} className="flex flex-col gap-4 md:gap-6 w-[22vw] min-w-[200px] pointer-events-auto">
                {colMedia.col4.map((src, index) => (
                  <ImageCard key={`col4-${index}`} src={src} onLoad={handleItemLoad} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
  );
}
