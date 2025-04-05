import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { LangAnim } from './LangAnim';
import { PoweredByAnim } from './PoweredByAnim';


export const AnimSlider = ({animState, setAnimState}) => {
    
    const arr = new Array(4).fill(0);

    useEffect(() => {

        // const interval = setInterval(() => {
        //     setAnimState((prev) => ((prev + 1) % 4));
        // }, 6000);

        // return () => {
        //     clearInterval(interval);
        // }
    }, []);

    return (
      <div className="min-w-[40vw] h-[70vh] bg-white/0 absolute right-[132px] top-[-40px]">
        <div className="h-full w-full grid place-content-center">
          <AnimatePresence>
            {animState == 0 && <LangAnim setAnimState={setAnimState}/>}
            {animState == 1 && <PoweredByAnim setAnimState={setAnimState}/>}
          </AnimatePresence>
        </div>

        <div className="flex w-full z-40 absolute h-[40px]  bottom-0 justify-center items-center gap-4">
          
          
          
          {arr.map((e, i) => {
            if (i == animState) {
              return (
                <motion.div
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  className="w-[7px] h-[7px] bg-[#d7d9dd] rounded-full"
                ></motion.div>
              );
            }
            return (
              <div className="w-[7px] h-[7px] bg-[#2b2c33] rounded-full"></div>
            );
          })}
        </div>
      </div>
    );
}

