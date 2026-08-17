import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Custom easings for premium feel
export const customEase = [0.76, 0, 0.24, 1]; // "Expo" style
export const smoothSpring = { type: "spring", stiffness: 100, damping: 20, mass: 0.5 };

// Magnetic Button Wrapper
export function Magnetic({ children, intensity = 0.2 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    // Safely check if the ref exists before measuring
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// Staggered Text Reveal
export function TextReveal({ text = "", delay = 0 }) {
  // Fallback to empty string prevents .split() from crashing
  const words = text.split(" ");
  
  return (
    <span className="inline-flex flex-wrap overflow-hidden">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "120%", rotate: 5, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          // Number(delay) ensures we don't accidentally do string concatenation
          transition={{ duration: 0.8, ease: customEase, delay: Number(delay) + i * 0.04 }}
          className="mr-[0.25em] inline-block origin-top-left"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Parallax Image Wrapper
export function ParallaxImage({ src, alt, speed = 0.2, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        style={{ y, scale }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-[130%] object-cover object-top will-change-transform"
      />
    </div>
  );
}
