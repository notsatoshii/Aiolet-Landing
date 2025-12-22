import React, { useRef } from "react";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

interface InfiniteGridBackgroundProps {
  gridColor?: string;
  baseColor?: string;
  revealSize?: number;
  speedX?: number;
  speedY?: number;
}

export const InfiniteGridBackground = ({
  gridColor = "hsl(var(--primary))",
  baseColor = "hsl(var(--muted-foreground) / 0.15)",
  revealSize = 400,
  speedX = 0.3,
  speedY = 0.3,
}: InfiniteGridBackgroundProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(${revealSize}px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base grid layer */}
      <div className="absolute inset-0 opacity-40">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} color={baseColor} id="base" />
      </div>

      {/* Mouse-revealed active grid layer */}
      <motion.div
        className="absolute inset-0"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} color={gridColor} id="active" />
      </motion.div>
    </div>
  );
};

const GridPattern = ({ 
  offsetX, 
  offsetY, 
  color,
  id
}: { 
  offsetX: any; 
  offsetY: any; 
  color: string;
  id: string;
}) => {
  const patternId = `grid-bg-${id}`;
  
  return (
    <motion.svg
      className="h-full w-full"
      style={{ x: offsetX, y: offsetY }}
    >
      <defs>
        <pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={color}
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="200%" height="200%" fill={`url(#${patternId})`} />
    </motion.svg>
  );
};

export default InfiniteGridBackground;
