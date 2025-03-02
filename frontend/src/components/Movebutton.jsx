import React from "react";
import { motion } from "framer-motion";

export const Movebutton = ({
  label,
  direction,
  color1,
  color2,
  action,
  extraStyleP,
  extraStyleDiv,
  disabled,
}) => {
  if (direction == "right" || !direction)
    return (
      <motion.button
        disabled={disabled}
        whileHover="hover"
        className={
          `w-[150px]  h-[2rem] flex flex-row justify-around items-center rounded-md cursor-pointer bg-[#A8FF53] hover:bg-[#BEFF7F]` +
          extraStyleDiv
        }
        onClick={action}
      >
        <p
          className={
            " text-black text-[1.1rem] font-medium translate-y-[-2px] " +
            extraStyleP
          }
        >
          {label}
        </p>

        
          <div>
            <motion.svg
              className="relative top-[9px] z-10"
              initial={{ opacity: 0 }}
              variants={{ hover: { opacity: 1 } }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="2"
              viewBox="0 0 20 2"
              fill="none"
            >
              <line y1="1.5" x2="11" y2="1.5" stroke="black" stroke-width="4" />
            </motion.svg>

            <motion.svg
              className="relative"
              initial={{ x: 5 }}
              animate={{ x: 0 }}
              variants={{ hover: { x: 5 } }}
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
            >
              <path
                d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM7 9H8V7H7V9Z"
                fill="black"
              />
            </motion.svg>
          </div>
        
      </motion.button>
    );
  else {
    return (
      <motion.div
        whileHover="hover"
        className={`w-[150px]  h-[2rem] rounded-md cursor-pointer bg-[#F43F5E] hover:bg-[#FF5E7A] flex flex-row items-center justify-around ` + extraStyleDiv}
        onClick={action}
      >
        <p className="text-black text-[1.1rem] font-medium translate-y-[-2px]">
          {label}
        </p>

        <>
          <div>
            <motion.svg
              className="relative top-[9px] z-10"
              initial={{ opacity: 0 }}
              variants={{ hover: { opacity: 1 } }}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="2"
              viewBox="0 0 20 2"
              fill="none"
            >
              <line y1="1.5" x2="14" y2="1.5" stroke="black" stroke-width="4" />
            </motion.svg>

            <motion.svg
              animate={{ x: 5 }}
              variants={{ hover: { x: 0 } }}
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="16"
              viewBox="0 0 9 16"
              fill="none"
            >
              <path
                d="M0.292893 7.29289C-0.0976312 7.68342 -0.097631 8.31658 0.292893 8.70711L6.65686 15.0711C7.04738 15.4616 7.68055 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31945 8.07107 0.92893C7.68054 0.538406 7.04738 0.538406 6.65685 0.928931L0.292893 7.29289ZM2 7L1 7L1 9L2 9L2 7Z"
                fill="black"
              />
            </motion.svg>
          </div>
        </>
      </motion.div>
    );
  }
};
