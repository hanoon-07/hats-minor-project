import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoadingRingSmall } from "../animation/LoadingRingSmall";
import ExamCreation from '../ExamCreation/ExamCreation';
import { StartWindow } from "./StartWindow";
import { ResultWindow } from "./ResultWindow";

export const ExamView = ({ classId ,type = "upcoming", loaded = true, upcomingData = null, historyData=null, examSelected, setExamSelected, setSelected, setExamId, setNewState}) => {


  const [showCreateExam, setCreateExam] = useState(false);
  const [showStartExam, setShowStartExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  

  if(!loaded) {
    return (<div className="relative lg:w-[50%] outline outline-1 outline-[#1f2124] w-[100%] min-h-[200px] flex flex-col rounded-sm bg-[#1B1D1F]">
        <div className=" w-full h-[30px] rounded-[4px 4px 0px 0px] bg-[#15161A] box-border p-1">
          <p className="ml-1 text-sm font-normal text-[#A8FF53]">upcoming</p>
        </div>
        <div className="box-border p-1 py-2 w-full max-h-full grid place-content-center">
            <LoadingRingSmall />  
        </div>
      </div>);
  
  }

  if(type == 'history') 
    return (<>
      {showResult && <ResultWindow examId={selectedResult} setShow={setShowResult}/>}
      <div className="relative lg:w-[50%] outline outline-1 outline-[#1f2124] w-[100%] min-h-[200px] flex flex-col rounded-sm bg-[#1B1D1F]">
        
        <div className=" w-full h-[30px] rounded-[4px 4px 0px 0px] bg-[#15161A] box-border p-1">
          <p className="ml-1 text-sm font-normal text-[#A8FF53]">history</p>
        </div>
        <div className="box-border p-1 py-2 w-full max-h-full flex flex-col gap-2 ">
          

          {historyData?historyData.map((item) => {
            
            return (<div className="w-full h-[40px] rounded-sm flex bg-[#272A2E] outline outline-1 justify-between outline-black flex-row items-center box-border px-2">
              <div className="flex flex-row gap-6">
                <p className="text-white text-md font-normal">{item.Name}</p>
                <p className="text-md text-[#474AA5]">{item.date}</p>
              </div>
              
              
              <motion.button
                onClick={() => {setSelectedResult(item.examId); setShowResult(true)}}
                whileHover="hover"
                className=" px-2 py-0 hover:bg-[#669934] rounded-[2px] bg-[#A8FF53] flex flex-row items-center gap-2"
              >
                <p className="text-black font-normal translate-y-[-2px]">result</p>
                <motion.svg
                  variants={{ hover: { scale: 1.2 } }}
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 0V1H0.5C0.367392 1 0.240215 1.05268 0.146447 1.14645C0.0526785 1.24021 0 1.36739 0 1.5V12.5C0 12.6326 0.0526785 12.7598 0.146447 12.8536C0.240215 12.9473 0.367392 13 0.5 13H9.5C9.63261 13 9.75979 12.9473 9.85355 12.8536C9.94732 12.7598 10 12.6326 10 12.5V1.5C10 1.36739 9.94732 1.24021 9.85355 1.14645C9.75979 1.05268 9.63261 1 9.5 1H8V0H2ZM1 2H2V3H8V2H9V12H1V2ZM2 4V6H4V4H2ZM5 4.5V5.5H8V4.5H5ZM2 7V9H4V7H2ZM5 7.5V8.5H8V7.5H5ZM2 10V11H8V10H2Z"
                    fill="black"
                  />
                </motion.svg>
              </motion.button>
            </div>)
          }):null}

          
        </div>
      </div>
    </>);

  if (type == "upcoming")
    return (
      <>
      {showStartExam && <StartWindow setNewState={setNewState} setShowStartExam={setShowStartExam} selectedExam={selectedExam}/>}
      {showCreateExam && <ExamCreation classId={classId} setCreateExam={setCreateExam} setNewState={setNewState}/>}
      <div className="relative lg:w-[50%] outline outline-1 outline-[#1f2124] w-[100%] min-h-[200px] flex flex-col rounded-sm bg-[#1B1D1F]">
        
        <div className=" w-full h-[30px] rounded-[4px 4px 0px 0px] bg-[#15161A] box-border p-1">
          <p className="ml-1 text-sm font-normal text-[#A8FF53]">upcoming</p>
        </div>
        <div className="box-border p-1 py-2 w-full max-h-full flex flex-col gap-2 pb-20">
          {upcomingData?upcomingData.map((item) => {
            //console.log(item);
            return (<div className="w-full h-[40px] rounded-sm flex bg-[#272A2E] outline outline-1 justify-between outline-black flex-row items-center box-border px-2">
                <div>
                  <p className="text-white text-md font-normal">{item.Name}</p>
                </div>
    
                {item.status=='upcoming' && <motion.button
                  onClick={() => {setSelectedExam(item.examId); setShowStartExam(true);}}
                  whileHover="hover"
                  className=" px-2 py-0 hover:bg-[#669934] rounded-[2px] bg-[#A8FF53] flex flex-row items-center gap-2"
                >
                  <p className="text-black font-normal translate-y-[-2px]">{item.status =='upcoming'?"start":"nil"}</p>
                  <motion.svg
                    variants={{ hover: { rotate: 120 } }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.499804 0.668945L7.9998 4.99907L0.499804 9.3292L0.499804 0.668945Z"
                      fill="black"
                    />
                  </motion.svg>
                </motion.button>}

                {item.status=='active' && <motion.button
                  onClick={() => {setExamSelected(item.Name); setExamId(item.examId); setSelected('exam-panel');}}
                  whileHover="hover"
                  className=" px-2 py-0 hover:bg-[#479DEC] rounded-[2px] bg-[#3B82F6] flex flex-row items-center gap-2"
                >
                  <p className="text-black font-normal translate-y-[-2px]">view</p>
                  <motion.svg
                    variants={{ hover: { rotate: 120 } }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.499804 0.668945L7.9998 4.99907L0.499804 9.3292L0.499804 0.668945Z"
                      fill="black"
                    />
                  </motion.svg>
                </motion.button>}
              </div>
    );
          }):null}
          

          <div className="flex flex-row gap-2 px-0 box-border ml-1 absolute left-1 bottom-1">
            <motion.button
              whileHover="hover"
              className="flex flex-row gap-1 items-center bg-[#A8FF53] hover:bg-[#669934] px-2 rounded-[2px]"
            >
              <p className="translate-y-[-2px]" onClick={() => {setCreateExam(true);}}>create</p>
              <motion.svg
                variants={{ hover: { rotate: 360 } }}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 14C3.13992 14 0 10.8601 0 7C0 3.13992 3.13992 0 7 0C10.8601 0 14 3.13992 14 7C14 10.8601 10.8601 14 7 14ZM7 1.12C3.7576 1.12 1.12 3.7576 1.12 7C1.12 10.2424 3.7576 12.88 7 12.88C10.2424 12.88 12.88 10.2418 12.88 7C12.88 3.75816 10.2424 1.12 7 1.12Z"
                  fill="black"
                />
                <path
                  d="M7.00006 10.9201C6.85154 10.9201 6.7091 10.8611 6.60408 10.7561C6.49906 10.651 6.44006 10.5086 6.44006 10.3601V3.64008C6.44006 3.49156 6.49906 3.34912 6.60408 3.2441C6.7091 3.13908 6.85154 3.08008 7.00006 3.08008C7.14858 3.08008 7.29102 3.13908 7.39604 3.2441C7.50106 3.34912 7.56006 3.49156 7.56006 3.64008V10.3601C7.56006 10.5086 7.50106 10.651 7.39604 10.7561C7.29102 10.8611 7.14858 10.9201 7.00006 10.9201Z"
                  fill="black"
                />
                <path
                  d="M10.3601 7.55945H3.64008C3.49156 7.55945 3.34912 7.50045 3.2441 7.39543C3.13908 7.29041 3.08008 7.14797 3.08008 6.99945C3.08008 6.85093 3.13908 6.70849 3.2441 6.60347C3.34912 6.49845 3.49156 6.43945 3.64008 6.43945H10.3601C10.5086 6.43945 10.651 6.49845 10.7561 6.60347C10.8611 6.70849 10.9201 6.85093 10.9201 6.99945C10.9201 7.14797 10.8611 7.29041 10.7561 7.39543C10.651 7.50045 10.5086 7.55945 10.3601 7.55945Z"
                  fill="black"
                />
              </motion.svg>
            </motion.button>

           
          </div>
        </div>
      </div>
      </>
    );
};
