
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedContainerProps {
  children: ReactNode;
  animation?: "fade" | "slide" | "scale" | "bounce";
  delay?: number;
  className?: string;
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: { duration: 0.3 }
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    transition: { duration: 0.3 }
  },
  bounce: {
    initial: { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 10, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

export function AnimatedContainer({ 
  children, 
  animation = "fade", 
  delay = 0,
  className = ""
}: AnimatedContainerProps) {
  const animationProps = animations[animation];
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...animationProps}
        transition={{ ...animationProps.transition, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
