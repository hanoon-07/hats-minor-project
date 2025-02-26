import React from 'react';
import Loadinganimation from './Loadinganimation';
import WaveLoading from './Loading';

function Popanim() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="mb-4 p-[2px] text-3xl shimmering-text font-bold">
        Your partial output is being evaluated
      </div>
      <div className="mb-4 text-lg text-gray-300">
        Please do not leave the page
      </div>
      <div className="loader"></div>

      
      
      

   
      <style jsx>{`
        
        .shimmering-text {
          position: relative;
          color: #ffffff;
          background: linear-gradient(90deg,#ffffff, #cfcfcf, #ffffff);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: shimmer 2s linear infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}

export default Popanim;
