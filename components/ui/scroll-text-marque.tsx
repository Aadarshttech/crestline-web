"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

interface ScrollBaseAnimationProps {
  children: React.ReactNode;
  baseVelocity?: number;
  clasname?: string;
  delay?: number;
}

export default function ScrollBaseAnimation({
  children,
  baseVelocity = 5,
  clasname,
  delay = 0,
}: ScrollBaseAnimationProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0 leading-none">
      <motion.div
        className={`flex whitespace-nowrap flex-nowrap ${clasname}`}
        style={{ x }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay / 1000, duration: 1 }}
      >
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
        <span className="block mr-10">{children}</span>
      </motion.div>
    </div>
  );
}
