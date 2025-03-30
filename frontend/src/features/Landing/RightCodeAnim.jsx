import {motion} from "framer-motion";
import {X} from "lucide-react";
import {Play} from "lucide-react";

import {useState} from "react";
function RightCodeAnim() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{
        opacity: 1,
        rotateX: 10,

        rotateY: 20,

        transition: {
          duration: 1.5,
          delay: 0.5,
        },
      }}
      className=" min-w-[60%] mb-5  rounded-lg shadow-[0_0_80px_15px_#3D3D3D] bg-black/50 hidden min-[800px]:block"
    >
      (
      <motion.div className="p-3 relative bg-stone-900/40  h-[100%] flex flex-col rounded-xl   text-black">
        <section className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          </div>
          <p className="text-sm text-lime-500 tracking-wider mr-3 font-semibold orbitron-font-only">
            CODEFLOW
          </p>
        </section>
        <div className="w-full h-[1px] bg-gray-700 rounded-xl mt-2 mb-2"></div>
        <section className="flex items-center gap-[40px]">
          <div className=" py-3 flex gap-4 items-center pr-5 outline-1  rounded-sm text-gray-500 h-[25px] ">
            <p className="tracking-wider text-sm">Codeflow.tsx</p>
            <X className="w-5 h-5" />
          </div>
          {/*   <div className="text-gray-500 text-[0.9rem] font-mono">
            <span>lib</span>
            <span className="mx-1">&gt;</span>
            <span>trigger</span>
            <span className="mx-1">&gt;</span>
            <span>transcribe-video.ts</span>
          </div> */}
        </section>
        <section className="flex gap-2 mt-3">
          {/*  <Sidebar /> */}
          <CodeBlock />
        </section>
        <button className="absolute flex gap-2 items-center bg-lime-500 text-black font-semibold rounded-sm  px-5 py-1   right-[20px] bottom-3 cursor-not-allowed">
          Run
          <Play size={16} strokeWidth={3.5} className="text-gray-800" />
        </button>
      </motion.div>
      )
    </motion.div>
  );
}

export default RightCodeAnim;

const code = `const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;


async function fetchData() {
  try {
  const response = await axios.get("http://codeflow/1");
  return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}


`;

function CodeBlock() {
  let lines = code.split("\n");
  const keywords = [
    "export",
    "const",
    "let",
    "var",
    "function",
    "async",
    "await",
    "response",
    "return",
  ];

  const colorArray = [
    "text-pink-500",
    "text-orange-500",
    "text-blue-300",

    "text-yellow-500",
    "text-purple-400",
  ];
  function getColor(word) {
    if (keywords.includes(word)) {
      return "text-pink-500";
    } else {
      const randomNum = Math.floor(Math.random() * 5) + 1;
      return colorArray[randomNum];
    }
  }
  let numwords = 0;

  return (
    <section className="white-space-pre-wrap font-mono ">
      {lines.map((line, lineIndex) => {
        return (
          <div
            key={lineIndex}
            className="flex flex-wrap gap-1 text-blue-300 items-center"
          >
            <p className="mr-4 text-gray-500 font-semibold ">{lineIndex + 1}</p>

            {line.split(" ").map((word, index) => {
              console.log(word);
              numwords += 1;
              let color = getColor(word);
              return (
                <>
                  <motion.span
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2 + 0.09 * numwords}}
                    key={index}
                    className={`${color}  font-semibold  `}
                  >
                    {word}
                    {"\u00A0"}
                  </motion.span>
                  <motion.span
                    initial={{opacity: 0}}
                    animate={{opacity: [0, 1, 0.5, 0]}}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 2 + 0.09 * numwords,
                    }}
                    className="w-[2px] h-4 bg-blue-300"
                  ></motion.span>
                </>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
