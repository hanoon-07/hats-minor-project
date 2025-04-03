import { useState } from "react";
import { SquareCheckBig, SquareTerminal } from "lucide-react";
import { motion } from "framer-motion";
import TestCase from "./TestCase";
import TestResult from "./TestResult";
import Button from '../Button';
import Output from "./Output";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { selectInputs, selectOutputs, selectResult } from "../../redux/examSelector";
import {LoadingRingSmall} from '../animation/LoadingRingSmall'
/*

input sample format

const cases = [
  {m: "2", n: "3", output: "6"},
  {enemyEngines: "[3,2,2]", currentEnergy: "4", output: "7"},
  {enemyEngines: "[3,4,2]", currentEnergy: "9", output: "6"},
];

const results = [
  {caseId: 1, result: "false"},
  {caseId: 2, result: "null"},
  {caseId: 3, result: "null"},
];

const expectedResults = [
  {caseId: 1, result: "true"},
  {caseId: 2, result: "null"},
  {caseId: 3, result: "null"},
];
 */


function Result_case() {
  const [optionToggle, setToggle] = useState("case");

  const isRunning = useSelector((state) => state['code-run'].isRunning);
  const text = 'running';

  const loadingAnimations = {
    hidden: { opacity: 1},
    visible: { opacity: [1, 0.4, 1], transition: { duration: 1,repeat: Infinity } },
  };

  const results = useSelector(selectResult);
  const cases = {
    input: useSelector(selectInputs),
    output: useSelector(selectOutputs)
  }
  
  if(isRunning) return <>
    <div className="relative bg-darkGray h-[100%] flex flex-col px-[5px] items-center rounded-sm gap-2">
      <div  className="z-10 absolute h-full w-full grid place-content-center">
        <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row font-semibold">
          {text.split('').map((letter, index) => (
            <motion.p className="text-[#A8FF53] font-light"
              key={nanoid()}
              initial={{ opacity: 0 }}
              animate={{opacity: 1}}
              transition={{ duration: 0.2, delay: index * 0.1, }}
              
            >
              {letter}
            </motion.p>
          ))}
        </div>
        <div className="translate-y-[35px]">
          <LoadingRingSmall />
        </div>
        </div>
      </div>

      <motion.div  variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-full h-[40px] min-h-[40px] flex gap-4 pl-[1rem] mt-[5px] items-center pb-[5px] rounded-md bg-secondaryGray relative ">
      </motion.div>



      <div className="flex flex-col w-full gap-2">
        <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[30%] bg-secondaryGray h-[30px] rounded-[6px]"></motion.div>
        <div className="flex flex-row gap-[10px]">
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="bg-secondaryGray h-[30px] w-[100px] rounded-md"></motion.div>
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="bg-secondaryGray h-[30px] w-[100px] rounded-md"></motion.div>
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="bg-secondaryGray h-[30px] w-[100px] rounded-md"></motion.div>
        </div>

        <div className="flex flex-col gap-2 mt-1">
            <motion.div  variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[20%] h-[20px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[100%] h-[30px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div  variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[20%] h-[20px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[100%] h-[30px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div  variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[20%] h-[20px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[100%] h-[30px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div  variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[20%] h-[20px] bg-secondaryGray rounded-md"></motion.div>
            <motion.div variants = {loadingAnimations} initial = "hidden" animate = "visible" className="w-[100%] h-[30px] bg-secondaryGray rounded-md"></motion.div>
        </div>
      </div>
    </div>
  </>


  if (!isRunning) return (
    <div className=" bg-darkGray h-[100%] flex flex-col rounded-sm ">
      <div className="flex gap-4 pl-[1rem] pt-[5px] items-center pb-[5px] rounded bg-secondaryGray relative ">
        {" "}
        <motion.div
          className="absolute bottom-1 w-[6rem]  h-[2px] bg-buttonGreen2"
          initial={{ left: 25 }}
          animate={{
            left: {
              case: 23,
              result: 168,
              outputScreen: 305
            }[optionToggle]
          }}
          transition={{ type: "linear", damping: 0 }}
        ></motion.div>

        <Button action={() => setToggle("case")} Icon={SquareCheckBig} buttonClass={' text-white '} iconStyle={{ size: 15, className: ' text-[#A8FF53] ' }} label={'TestCase'} />
        <div className="w-[1px] h-5/6 bg-textGray"></div>
        <Button buttonClass={' text-white'} action={() => setToggle('result')} label={'TestResult'} Icon={SquareTerminal} iconStyle={{ size: 15, className: ' text-[#A8FF53]' }} />
        <div className="w-[1px] h-5/6 bg-textGray"></div>
        <Button buttonClass={' text-white'} action={() => setToggle('outputScreen')} label={'Output'} Icon={SquareTerminal} iconStyle={{ size: 15, className: ' text-[#A8FF53] ' }} />
      </div>

      <div className="h-full m-2">
        {optionToggle === 'case' && <TestCase testCases={cases} />}
        {optionToggle === 'result' && <TestResult  />}
        {optionToggle === 'outputScreen' && <Output />}
      </div>
    </div>
  );
}

export default Result_case;
