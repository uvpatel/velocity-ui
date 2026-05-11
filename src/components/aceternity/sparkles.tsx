"use client";

import React, { useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparkleType {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
}

export const SparklesCore = ({
  id,
  className,
  background,
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 100,
  particleColor = "#FFF",
}: {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}) => {
  const generatedId = useId();

  const particles = useMemo(() => {
    const newParticles: SparkleType[] = [];
    for (let i = 0; i < particleDensity; i++) {
      const seed = (i + 1) * 9301 + particleDensity * 49297;
      const random = (offset: number) => {
        const value = Math.sin(seed + offset) * 10000;
        return value - Math.floor(value);
      };

      newParticles.push({
        id: `${i}`,
        x: `${random(1) * 100}%`,
        y: `${random(2) * 100}%`,
        size: random(3) * (maxSize - minSize) + minSize,
        delay: random(4) * 2,
        duration: random(5) * 2 + 1,
      });
    }
    return newParticles;
  }, [particleDensity, minSize, maxSize]);

  return (
    <div
      className={cn("relative h-full w-full", className)}
      style={{ background: background || "transparent" }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.span
            key={`${id || generatedId}-${particle.id}`}
            className="absolute inline-block rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              background: particleColor,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
