
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameContext";

// A floating particle effect for the background
export function BackgroundAnimation() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
  }>>([]);
  
  const { theme } = useGame();
  
  // Generate particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      const count = Math.min(window.innerWidth / 50, 20); // Responsive count
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // % of viewport width
          y: Math.random() * 100, // % of viewport height
          size: Math.random() * 60 + 20, // Size between 20-80px
          color: getRandomColor(),
          duration: Math.random() * 20 + 40, // Animation duration
        });
      }
      
      setParticles(newParticles);
    };
    
    // Random color function
    const getRandomColor = () => {
      const colors = theme === "dark" 
        ? ["#6b7280", "#4b5563", "#374151", "#1f2937", "#111827"] // Dark theme colors
        : ["#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9"]; // Light theme colors
      
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    generateParticles();
    
    // Regenerate on window resize
    window.addEventListener("resize", generateParticles);
    return () => window.removeEventListener("resize", generateParticles);
  }, [theme]);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            x: ["-20%", "20%", "-15%", "15%", "-20%"],
            y: ["-20%", "20%", "-15%", "15%", "-20%"],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
