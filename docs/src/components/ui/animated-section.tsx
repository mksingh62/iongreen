"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "scaleUp";
  once?: boolean;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.6,
  animation = "fadeInUp",
  once = true,
  threshold = 0.2, // Trigger when 20% of element is in view
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getVariants = (): Variants => {
    switch (animation) {
      case "fadeInDown":
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        };
      case "fadeInLeft":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case "fadeInRight":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case "zoomIn":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        };
      case "scaleUp":
        return {
          hidden: { opacity: 0, scale: 0.95, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0 },
        };
      case "fadeInUp":
      default:
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Cubic bezier for smooth "premium" feel
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
