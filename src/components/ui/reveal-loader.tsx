"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Register plugin outside component
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

// --- EXPORTED TYPES ---
export type StaggerType =
  | "left-to-right"
  | "right-to-left"
  | "center-out"
  | "edges-in";

export type MovementType =
  | "top-down"
  | "bottom-up"
  | "fade-out"
  | "scale-vertical";

interface RevealLoaderProps {
  text?: string;
  textSize?: string;
  textColor?: string;
  bgColors?: string[];
  angle?: number;
  staggerOrder?: StaggerType;
  movementDirection?: MovementType;
  textFadeDelay?: number;
  className?: string;
  onComplete?: () => void;
}

const RevealLoader = ({
  text = "Velocity-UI",
  textSize = "100px",
  textColor = "white",
  bgColors = ["#000000"],
  angle = 0,
  staggerOrder = "left-to-right",
  movementDirection = "top-down",
  textFadeDelay = 0.5,
  className,
  onComplete,
}: RevealLoaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);

  const getBackgroundStyle = () => {
    if (bgColors.length === 0) return { backgroundColor: "black" };
    if (bgColors.length === 1) return { backgroundColor: bgColors[0] };
    return {
      backgroundImage: `linear-gradient(${angle}deg, ${bgColors.join(", ")})`,
    };
  };

  const getStaggerFrom = (type: StaggerType): "start" | "end" | "center" | "edges" => {
    switch (type) {
      case "right-to-left":
        return "end";
      case "center-out":
        return "center";
      case "edges-in":
        return "edges";
      case "left-to-right":
      default:
        return "start";
    }
  };

  const getAnimationProperties = (type: MovementType) => {
    switch (type) {
      case "bottom-up":
        return { y: "-100%", ease: "power2.inOut" };
      case "fade-out":
        return { autoAlpha: 0, ease: "power2.inOut" };
      case "scale-vertical":
        return { scaleY: 0, transformOrigin: "top center", ease: "power2.inOut" };
      case "top-down":
      default:
        return { y: "100%", ease: "power2.inOut" };
    }
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      const moveProps = getAnimationProperties(movementDirection);
      const staggerConfig = {
        each: 0.1,
        from: getStaggerFrom(staggerOrder),
      };

      // Set initial states
      gsap.set(".name-text span", { y: 100, autoAlpha: 1 });
      gsap.set(".preloader-item", { y: 0 });

      // 1. Reveal Text
      tl.to(".name-text span", {
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });

      // 2. Wait a bit
      tl.to({}, { duration: 0.8 });

      // 3. Fade Text
      tl.to(
        ".name-text span",
        {
          autoAlpha: 0,
          duration: 0.3,
          stagger: 0.02,
        },
        `-=${textFadeDelay}`
      );

      // 4. Animate Bars
      tl.to(
        ".preloader-item",
        {
          duration: 0.8,
          stagger: staggerConfig,
          ...moveProps,
        },
        "<"
      );

      // 5. Hide Container
      tl.to(preloaderRef.current, {
        autoAlpha: 0,
        duration: 0.2,
      });
    },
    { scope: preloaderRef, dependencies: [staggerOrder, movementDirection, textFadeDelay, onComplete] }
  );

  return (
    <div
      ref={preloaderRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden",
        className
      )}
      style={getBackgroundStyle()}
    >
      <div className="relative flex h-full w-full">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="preloader-item h-full flex-1 bg-inherit"
            style={getBackgroundStyle()}
          />
        ))}
      </div>

      <div
        className={cn(
          "name-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap",
          anton.className
        )}
        style={{
          fontSize: textSize,
          color: textColor,
        }}
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RevealLoader;