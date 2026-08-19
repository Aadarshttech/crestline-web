"use client";

import ScrollWordHighlight from "./ui/ScrollWordHighlight";

export default function WordHighlightSection() {
  return (
    <section className="relative w-full bg-black py-20 hidden md:block">
      <div className="w-full max-w-7xl mx-auto px-4">
        <ScrollWordHighlight
          prefixText="We craft"
          items={[
            "elegance",
            "luxury",
            "comfort",
            "innovation",
          ]}
          textColor="#ffffff"
          backgroundColor="transparent"
          inactiveOpacity={0.15}
          font={{
            fontFamily: "inherit",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 4.5rem)", // Responsive font size
            lineHeight: 1.1,
          }}
          style={{
            textShadow: "1px 1px 0px #555, 2px 2px 0px #444, 3px 3px 0px #333, 4px 4px 0px #222, 5px 5px 0px #111, 8px 8px 15px rgba(0,0,0,0.9)",
            textTransform: "uppercase",
            letterSpacing: "0.15em", // Slightly tighter to ensure it fits
          }}
          gap={32}
          animationMode="spotlight" // Keep words visible but faded
        />
      </div>
    </section>
  );
}
