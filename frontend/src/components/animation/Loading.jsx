import React from 'react';
import { motion } from 'framer-motion';

const WaveLoading = () => {
  
  return <>
    <div className='absolute top-0 w-screen h-screen bg-black grid place-content-center'>
      <div className='loader'>
      </div>
    </div>
  </>
};

export default WaveLoading;