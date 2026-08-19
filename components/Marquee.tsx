"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const words = ["crestline", "•", "premium", "•", "craft", "•", "design", "•", "lifestyle", "•"];

  return (
    <div className="relative flex overflow-hidden w-full select-none">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15, // Speed of the marquee
        }}
      >
        {/* First Set */}
        <div className="flex gap-12 pr-12 items-center">
          {words.map((word, i) => (
            <span
              key={`first-${i}`}
              className="text-7xl md:text-[11rem] font-inter font-black tracking-tighter lowercase text-white"
            >
              {word}
            </span>
          ))}
        </div>
        {/* Second Set (Exact duplicate for seamless looping) */}
        <div className="flex gap-12 pr-12 items-center">
          {words.map((word, i) => (
            <span
              key={`second-${i}`}
              className="text-7xl md:text-[11rem] font-inter font-black tracking-tighter lowercase text-white"
            >
              {word}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
