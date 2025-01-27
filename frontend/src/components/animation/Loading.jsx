import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  const text = "CODEFLOW".split("");
  const radius = 50;
  
  // Calculate positions for the circle formation
  const positions = text.map((_, i) => {
    const angle = (i * (360 / text.length)) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  });

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      {/* Container for initial text animation */}
      <div className="relative w-40 h-40">
        {/* Wrapper for rotation */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-full h-full"
          animate={{ 
            rotate: 360 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
          style={{
            transformOrigin: "center"
          }}
        >
          {text.map((char, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              initial={{ 
                x: i * 44 - (text.length * 44) / 2,
                y: 0,
                scale: 1
              }}
              animate={{
                x: positions[i].x,
                y: positions[i].y,
                scale: 0.3
              }}
              transition={{
                delay: 1,
                duration: 1,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: `hsl(${(i * 360) / text.length}, 70%, 50%)`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {char}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;