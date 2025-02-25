import React from 'react';
import { motion } from 'framer-motion';

const WaveLoading = () => {
  const bars = [
    
    { color: '#7E3FF2', width: '10%' },    // Purple
    { color: '#FF4B4B', width: '10%' },    // Red
    { color: '#FFD600', width: '10%' },    // Yellow
    { color: '#00C853', width: '10%' }     // Green (narrowest)
  ];

  const waveVariants = {
    animate: (custom) => ({
      width: [
        custom.width,
        `${parseInt(custom.width) - 5}%`,
        custom.width
      ],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom.index * 0.2 // Creates cascading effect
      }
    })
  };

  return (
    <div className="z-50 absolute top-0 flex flex-col items-center justify-center min-h-screen w-screen gap-2">
      <div className='h-screen absolute top-0 w-screen opacity-55'>
      </div>
      <div className='flex flex-col w-[400px] justify-center items-center gap-1'>
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="h-[5px] rounded-sm"
            style={{ 
              backgroundColor: bar.color,
              originX: 0
            }}
            custom={{ width: bar.width, index }}
            variants={waveVariants}
            animate="animate"
          />
        ))}
      </div>
    </div>
  );
};

export default WaveLoading;