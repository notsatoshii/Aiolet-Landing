import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  speed?: number; // 0.3 = 30% scroll speed, 1 = 100%
  direction?: "y" | "x";
  offset?: ["start end" | "end start" | "center center", "start end" | "end start" | "center center"];
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = "y", offset = ["start end", "end start"] } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const range = direction === "y" ? [-100 * speed, 100 * speed] : [-50 * speed, 50 * speed];
  const transform = useTransform(scrollYProgress, [0, 1], range);

  return { ref, transform, scrollYProgress };
};

export const useParallaxLayers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background moves slowest (30-40%)
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  
  // Connection lines medium speed (60-70%)
  const linesY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  
  // Foreground fastest (90-100%)
  const fgY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  
  // Scale for depth effect
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const fgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);

  return { containerRef, bgY, linesY, fgY, bgScale, fgScale, scrollYProgress };
};

// Check if device prefers reduced motion or is mobile
export const useReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const useIsMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
};
