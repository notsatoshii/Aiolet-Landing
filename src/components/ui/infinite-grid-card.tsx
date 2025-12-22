import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  useAnimationFrame 
} from "framer-motion";

interface InfiniteGridCardProps {
  children?: React.ReactNode;
  className?: string;
  gridColor?: string;
  revealSize?: number;
  speedX?: number;
  speedY?: number;
}

export const InfiniteGridCard = ({
  children,
  className,
  gridColor = "hsl(var(--primary))",
  revealSize = 300,
  speedX = 0.5,
  speedY = 0.5,
}: InfiniteGridCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm",
        className
      )}
    >
      {/* Base grid layer */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} color="hsl(var(--muted-foreground) / 0.3)" />
      </div>

      {/* Mouse-revealed active grid layer */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} color={gridColor} />
      </motion.div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const GridPattern = ({ 
  offsetX, 
  offsetY, 
  color 
}: { 
  offsetX: any; 
  offsetY: any; 
  color: string;
}) => {
  return (
    <motion.svg
      className="h-full w-full"
      style={{ x: offsetX, y: offsetY }}
    >
      <defs>
        <pattern
          id={`grid-${color.replace(/[^a-zA-Z0-9]/g, '')}`}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="200%" height="200%" fill={`url(#grid-${color.replace(/[^a-zA-Z0-9]/g, '')})`} />
    </motion.svg>
  );
};

export default InfiniteGridCard;
