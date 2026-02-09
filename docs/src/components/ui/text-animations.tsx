"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface StaggeredTextProps {
  text: string;
  className?: string;
  once?: boolean;
  type?: "word" | "char";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function StaggeredText({
  text,
  className = "",
  once = true,
  type = "char",
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
}: StaggeredTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  
  const textArray = type === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {textArray.map((item, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block", marginRight: type === 'word' ? '0.25em' : '0' }}>
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface TypewriterEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypewriterEffect({ text, className = "", speed = 0.05 }: TypewriterEffectProps) {
  const displayText = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
      },
    },
  };

  const child: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {displayText.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
