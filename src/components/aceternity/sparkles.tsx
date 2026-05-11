"use client";

import React, { useId } from "react";
import { useEffect, useState } from "react";
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
  const [particles, setParticles] = useState<SparkleType[]>([]);
  const generatedId = useId();

  useEffect(() => {
    const newParticles: SparkleType[] = [];
    for (let i = 0; i < particleDensity; i++) {
      newParticles.push({
        id: `${i}`,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() * (maxSize - minSize) + minSize,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 1,
      });
    }
    setParticles(newParticles);
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
