import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  const text = "CODEFLOW".split("");
  const radius = 30;

  const positions = text.map((_, i) => {
    const angle = i * (360 / text.length) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  });

  const colors = [
    "rgba(32, 12, 111, 1)",
    "rgba(57, 43, 113, 1)",
    "rgba(35, 89, 150, 1)",
    "rgba(27, 121, 152, 1)",
    "rgba(33, 153, 147, 1)",
    "rgba(50, 175, 125, 1)",
    "rgba(139, 201, 85, 1)",
    "rgba(201, 218, 94, 1)",
  ];

  return (
    <div className="z-30 absolute top-0 left-0 h-screen w-screen flex items-center justify-center bg-transparent">
      <div className="h-screen w-screen absolute top-0 left-0 z-0 bg-slate-900 opacity-70"></div>

      <div className="relative w-40 h-40 z-40">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 1.5,
          }}
          style={{
            transformOrigin: "center",
          }}
        >
          {text.map((char, i) => (
            <motion.div
              key={i}
              className="absolute top-[65px] left-[65px]"
              initial={{
                x: i * 44 - (text.length * 44) / 2,
                y: 0,
                scale: 1,
              }}
              animate={{
                x: positions[i].x,
                y: positions[i].y,
                scale: 0.3,
              }}
              transition={{
                delay: 1,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: `${colors[i]}`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.span
                  className="text-bold text-xl"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 2 }}
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
