import {motion} from "framer-motion";
import {useState, useEffect} from "react";
function ExamResultAnim({setSlide}) {
  const [movCursor, setMoveCursor] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setMoveCursor(2);
    }, 1000);
    setTimeout(() => {
      setSlide(3);
    }, 5000);
  }, []);

  return (
    <motion.div
      key="examresult"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{scale: 1.03, opacity: 0, transition: {duration: 0.5}}}
      transition={{duration: 0.5}}
      className="h-[400px] w-[50%] relative bg-black rounded-xl p-6 flex flex-col text-white overflow-hidden shadow-lg border border-gray-800"
    >
      <motion.div
        initial={{y: 350, x: 400}}
        animate={movCursor == 2 ? {y: 10, x: 600, opacity: 1, duration: 3} : {}}
        transition={{ease: "easeOut", delay: 2}}
        className="z-[40] absolute "
      >
        <CursorSVG />
      </motion.div>

      <div className="flex justify-between items-center mb-6">
        <motion.div
          initial={{x: -20, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{delay: 0.2}}
          className="text-xl font-bold orbitron-font"
        >
          CODEFLOW
        </motion.div>
        <motion.button
          animate={movCursor == 2 ? {scale: 1.1} : {}}
          transition={{ease: "easeOut", delay: 3}}
          className="bg-[#a3fc36] text-black font-semibold py-2 px-4 rounded-lg flex items-center"
        >
          submit
          <span className="ml-2">→</span>
        </motion.button>
      </div>

      <motion.div
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{delay: 0.4}}
        className="bg-[#111827] rounded-xl p-6 flex-1 flex flex-col"
      >
        <div className="flex flex-wrap gap-4">
          <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.6}}
            className="flex-1 bg-[#1f2937] rounded-xl p-4 min-w-[100px] border-l-4 border-[#a3fc36]"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-[#1f2937] rounded-md mr-2 flex items-center justify-center">
                <span className="text-[#a3fc36] text-xl">📊</span>
              </div>
              <div className="text-xl font-bold">40%</div>
            </div>
            <div className="text-gray-400 text-sm">OVERALL SCORE</div>
          </motion.div>

          <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.8}}
            className="flex-1 bg-[#1f2937] rounded-xl p-4 min-w-[100px] border-l-4 border-[#4d88ff]"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-[#1f2937] rounded-md mr-2 flex items-center justify-center">
                <span className="text-[#4d88ff] text-xl">✓</span>
              </div>
              <div className="text-xl">4/10</div>
            </div>
            <div className="text-gray-400 text-sm">TEST CASES PASSED</div>
          </motion.div>

          <motion.div
            initial={{y: 20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 1}}
            className="flex-1 bg-[#1f2937] rounded-xl p-4 min-w-[200px] border-l-4 border-[#f59e0b]"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-[#1f2937] rounded-md mr-2 flex items-center justify-center">
                <span className="text-[#f59e0b] text-xl">✓</span>
              </div>
              <div className="text-xl">Passed</div>
            </div>
            <div className="text-sm text-gray-400 ">PARTIAL OUTPUT</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ExamResultAnim;

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
