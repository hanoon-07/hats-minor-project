import {AnimatePresence, motion} from "framer-motion";
import {X} from "lucide-react";
import {Play} from "lucide-react";
import {useEffect, useState} from "react";
import Animation from "./Animation";
import ExamResultAnim from "./ExamResultAnim";
function RightCodeAnim() {
  const [slide, setSlide] = useState(1);
  const [movCursor, setMoveCursor] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setSlide(2);
    }, 10000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMoveCursor(2);
    }, 6000);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {slide === 1 ? (
        <motion.div
          initial={{opacity: 0}}
          animate={{
            opacity: 1,
            rotateY: -10,
          }}
          exit={{scale: 1.03, opacity: 0, transition: {duration: 0.5}}}
          transition={{duration: 1.7, ease: "easeInOut"}}
          className="min-w-[50%] md:h-[80%] mr-5 mb-5 rounded-lg shadow-[0_0_80px_15px_#3D3D3D] bg-black/50 hidden min-[800px]:block"
        >
          <motion.div className="p-3 relative bg-stone-900/40 h-[100%] flex flex-col rounded-xl text-black">
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
              <div className="py-3 flex gap-4 items-center pr-5 outline-1 rounded-sm text-gray-500 h-[25px]">
                <p className="tracking-wider text-sm">Codeflow.tsx</p>
                <X className="w-5 h-5" />
              </div>
            </section>
            <section className="flex gap-2 mt-3 relative">
              <CodeBlock />
              <motion.div
                initial={{y: 410, x: 10, opacity: 1}}
                animate={
                  movCursor == 2
                    ? {y: 410, x: 650, opacity: 1, duration: 3}
                    : {
                        scale: 1.1,
                        y: 400,
                        opacity: 0,
                      }
                }
                transition={{ease: "easeOut", delay: 2, duration: 0.7}}
                className="z-[40] absolute "
              >
                <CursorSVG />
              </motion.div>
            </section>
            <button className="absolute flex gap-2 items-center bg-lime-500 text-black font-semibold rounded-sm px-5 py-1 right-[20px] bottom-2 cursor-not-allowed">
              Run
              <Play size={16} strokeWidth={3.5} className="text-gray-800" />
            </button>
          </motion.div>
        </motion.div>
      ) : slide === 2 ? (
        <ExamResultAnim key="codeEditor" setSlide={setSlide} />
      ) : (
        <Animation />
      )}
    </AnimatePresence>
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

const CursorSVG = () => {
  return (
    <>
      <svg
        width="11"
        height="14"
        viewBox="0 0 11 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 12.7404L7.29318 8.02212L9.59935 5.08667C9.684 4.97942 9.74565 4.84635 9.77842 4.70016C9.81118 4.55396 9.81397 4.39952 9.7865 4.25156C9.75904 4.10361 9.70225 3.96708 9.62155 3.855C9.54085 3.74293 9.43893 3.65905 9.32552 3.61136L0.921619 0.0456735C0.798297 -0.00660639 0.665978 -0.0141691 0.539472 0.023832C0.412965 0.0618331 0.297264 0.143898 0.205317 0.260843C0.113369 0.377787 0.0488052 0.524995 0.0188505 0.685991C-0.0111042 0.846987 -0.00526742 1.01542 0.0357075 1.17243L2.83701 11.8695C2.88384 12.0468 2.97313 12.2009 3.09234 12.3103C3.21155 12.4197 3.35467 12.4787 3.50162 12.4792C3.6851 12.4792 3.86439 12.3865 3.99675 12.218L6.30292 9.28259L10.0097 14L11 12.7404ZM3.80766 9.9369L1.80753 2.30097L7.80792 4.84598L3.80766 9.9369Z"
          fill="white"
        />
      </svg>
    </>
  );
};
