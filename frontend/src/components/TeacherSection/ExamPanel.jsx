import axios, { getAdapter } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { selectClassId } from "../../redux/classSelector";
import { useSelector } from "react-redux";
import { LoadingRing } from "../animation/LoadingRing";
import { motion, useReducedMotion } from "framer-motion";
import { StudentsView } from "./StudentsView";
import {io} from 'socket.io-client';
import { ToggleButton } from "./ToggleButton";
import { StopButton } from "./StopButton";
import { WaitingStudentsInfo } from "./WaitingStudentsInfo";
import { convertToXLSXandDownload } from "../../features/ExamResultDownload/ConvertXLSX.js";
import { convertToPDFandDownload } from "../../features/ExamResultDownload/ConvertPDF.js";


export const ExamPanel = ({ examId = 22, setSelected }) => {
  const classId = useSelector(selectClassId);
  const [examName, setExamName] = useState("--------");
  const [duration, setDuration] = useState("0000");
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [showStudentInfo, setShowStudentInfo] = useState(false);
  const [msg, setMsg] = useState('---');
  const [waitStatus, setWaitStatus] = useState(true);
  const [render, setRender] = useState(false);


  const childRotate1 = {
    initial: {
      rotate: 0
    },
    hover: {
      rotate: 180
    }
  };

  useEffect(() => {
    if(render == true) {

    }
  }, [render])

  

  useEffect(() => {

    //console.log("examid: "+examId);
    //select exam name, duration ,
    //connect to the web socket.currentRef provided by the backend, inform this as the teacher
    //console.log(classId);
    // convertToXLSXandDownload();
    // convertToPDFandDownload();
    async function getResultData() {
      try {
        const response = await axios.get('http://localhost:3000/getResult', {
          params: {
            examId: examId
          }
        })
        console.log(response.data);
      } catch(error) {

      }
    }
    getResultData();

    async function getFullData() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/getExamData/", {
          params: { examId: examId },
        });
        setExamName(response.data.examData.name);
        setDuration(response.data.examData.duration);
        const response1 = await axios.get(
          "http://localhost:3000/getClassStudents",
          {
            params: { classId: classId },
          }
        );
        //console.log(response1.data);
        var tempArr = [];
        response1.data.map((item) => {
          tempArr.push({
            RollNo: item.roll_no,
            status: item.status?item.status:'not-joined',
            Name: item.name,
            UniversityNum: item.admission_no,
            joinedAt: item.joined_at,
          });
        });
        if(studentData.length == 0) {
          setStudentData(tempArr);
          //console.log(tempArr);
        }
        //console.log(tempArr);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // [
    //     {
    //       "student_id": "22",
    //       "class_id": "45",
    //       "joined_at": "2025-03-07T18:30:00.000Z",
    //       "roll_no": 43,
    //       "university": "KTU",
    //       "admission_no": "KNR22CS043",
    //       "user_id": 22,
    //       "name": "hanoon",
    //       "email": "han@gmail.com",
    //       "password": "12345",
    //       "role": "student"
    //     }
    // ]

    getFullData();
  }, []);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000", {
      withCredentials: true,
      transports: ["websocket.currentRef", "polling"]
    });
  
    socket.current.on("connect", () => {
      //("connection done!");
      socket.current.emit("identify", {
        userType: "teacher",
        examId: examId,
      });
    });

    socket.current.on('student-pause', (data) => {
      setWaitingStudents(data.waitStatus);
      console.log(data.waitStatus);
      if(data.waitStatus.length > 0) {
        setPausemsg(`${data.waitStatus.length} need review!`);
      } else {
        setPausemsg('---');
      }
    });
    
    socket.current.on("exam-status", (data) => {
      //console.log("Received message:", data);
      
      setWaitStatus(data.examData.waitStatus);

      
      setTimeout(() => {
        setStudentData((prevStudentData) => {
          return prevStudentData.map((student) => {
            const foundStudent = data.examData.studentsInfo.find((item) => item.rollNo == student.RollNo);
            if(foundStudent && (student.status == 'not-joined' || student.status == 'submit') && foundStudent.status == 'active') {
              setMsg(`${student.Name} joined.`);
            } else if(foundStudent && student.status == 'active' && foundStudent.status == 'not-joined') {
              setMsg(`${student.Name} disconnected.`);
            } else if(foundStudent && student.status == 'active' && foundStudent.status == 'submit') {
              setMsg(`${student.Name} finished exam.`);
            }
            //console.log(`found student ${foundStudent.status}`);
            return foundStudent? { ...student, status: foundStudent.status } : student;
          });   
        });   
      }, 1000);
      
    });
  
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if(socket.currentRef != null) {
  //     setLoading(true);
  //     socket.currentRef.emit(socket.currentRef.emit("identify", {
  //       examId: examId,
  //       event: 'invert-wait-status',
  //       waitStatus: waitStatus
  //     }));
  //     setLoading(false);
  //   }
  // }, [waitStatus]);

  const [waitingStudents, setWaitingStudents] = useState([]);
  const [lastPauseMsg, setPausemsg] = useState('---');
  const [showWaitingWindow, setWaitingWindow] = useState(false);

  function getWaitingStudents() {
    var tempArr = [];
    studentData.map((item) => {
      const student = waitingStudents.find((stud) => stud.rollNo == item.RollNo);
      if(student) {
        tempArr.push({
          name: item.Name,
          rollNo: item.RollNo,
          type: student.type
        });
      }
      
    });
    return tempArr;
  }

  return (
    <div className="h-full w-full bg-[#15171A]">
      {loading && <LoadingRing />}
      {showWaitingWindow && <WaitingStudentsInfo examId={examId} setWaitingStudents={setWaitingStudents} waitingStudentInfo={getWaitingStudents()} socket={socket.current} setShowWindow={setWaitingWindow}/>}
      {showStudentInfo && <StudentsView setStudentInfo={setShowStudentInfo} studentData={studentData}/>}
      <div className="head-section flex flex-col gap-1 pt-10 pl-10">
        <h1 className="text-[#C1C4C7] font-bold text-3xl">{examName}</h1>
        <div className="flex flex-row gap-2 items-center">
          <p className="text-[#C1C4C7] font-normal text-lg">duration</p>
          <p className="text-[#474AA5] font-medium">{duration} minutes</p>
        </div>
        <div className="border-t-2 border-dashed border-gray-500 mt-4 mr-10"></div>
      </div>

      <div className="flex flex-col gap-2 px-10 pt-5">
        

        <div className="flex flex-row gap-3">
          <div className="h-[30px] w-[30px] rounded-full bg-[#A8FF53] grid place-content-center"></div>
          <p className="text-[#C1C4C7]">on exam</p>
        </div>

        <div className="flex flex-row gap-3">
          <div className="h-[30px] w-[30px] rounded-full bg-[#5F97F3] grid place-content-center"></div>
          <p className="text-[#C1C4C7]">completed</p>
        </div>

        <div className="flex flex-row gap-3">
          <div className="h-[30px] w-[30px] rounded-full bg-[#F43F5E] grid place-content-center"></div>
          <p className="text-[#C1C4C7]">not joined</p>
        </div>
      </div>

      <div className="mx-10">
        

        <div className="flex flex-row w-full justify-between gap-2">
          
          <div className="flex flex-row gap-2 items-center h-[40px]">
            <div onClick={() => {setWaitingWindow(true);}} className="w-[70px] mt-4 h-[30px] justify-center items-center gap-2 rounded-sm bg-yellow-400 hover:bg-yellow-600 flex flex-row">
              <p>{waitingStudents.length}</p>
              <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H4V4L3 11H1L0 4V0ZM4 14C4.00602 14.2663 3.95877 14.5312 3.86103 14.779C3.76328 15.0269 3.61701 15.2527 3.4308 15.4432C3.24458 15.6337 3.02218 15.7851 2.77666 15.8885C2.53113 15.9919 2.26742 16.0451 2.00101 16.0452C1.7346 16.0453 1.47087 15.9921 1.22529 15.8889C0.979708 15.7856 0.757233 15.6343 0.570925 15.4439C0.384617 15.2535 0.238231 15.0277 0.140361 14.78C0.0424915 14.5322 -0.00488977 14.2673 0.000999928 14.001C0.0125555 13.4784 0.228225 12.9812 0.601839 12.6156C0.975454 12.2501 1.47732 12.0453 2.00001 12.0452C2.5227 12.0451 3.02467 12.2496 3.39847 12.6149C3.77227 12.9803 3.98818 13.4774 4 14Z" fill="black"/>
              </svg>
            </div>   

            <p className="text-yellow-300 translate-y-1">{lastPauseMsg}</p>
          </div> 


          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-2 items-center">
              <div className="h-[24px] w-[24px] rounded-full bg-[#A8FF53] grid place-content-center">
                <p className="text-black font-normal">0</p>
              </div>
              <p className="text-[#C1C4C7] ">on exam</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="h-[24px] w-[24px] rounded-full bg-[#5F97F3] grid place-content-center">
                <p className="text-black font-normal">0</p>
              </div>
              <p className="text-[#C1C4C7] ">completed</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="h-[24px] w-[24px] rounded-full bg-[#F43F5E] grid place-content-center">
                <p className="text-black font-normal">0</p>
              </div>
              <p className="text-[#C1C4C7] ">not joined</p>
            </div>
          </div>
        </div>

        <div className="box-border relative  my-4 flex flex-col gap-0 w-full  bg-[#1B1D1F] rounded-sm outline outline-1 outline-[#1f2124]">
          <div className="flex flex-row gap-2 flex-wrap max-h-[150px] h-[150px] overflow-y-scroll p-2 content-start">
            {studentData.map((item) => {
             
              return (
                <>
                  
                  {item.status == "not-joined" && (
                    <div className="h-[30px] w-[30px] rounded-full  bg-[#F43F5E] grid place-content-center">
                      <p className="text-black font-semibold">{item.RollNo}</p>
                    </div>
                  )}
                  {item.status == "active" && (
                    <div className="h-[30px] w-[30px] rounded-full bg-[#A8FF53] grid place-content-center">
                      <p className="text-black font-semibold">{item.RollNo}</p>
                    </div>
                  )}

                  {item.status == "submit" && (
                    <div className="h-[30px] w-[30px] rounded-full bg-[#5F97F3] grid place-content-center">
                      <p className="text-black font-semibold">{item.RollNo}</p>
                    </div>
                  )}
                  {/* <div className='h-[30px] w-[30px] rounded-full bg-[#5F97F3] grid place-content-center'>
                                        <p className='text-black font-semibold'>4</p>
                                    </div>
                                    <div className='h-[30px] w-[30px] rounded-full bg-[#A8FF53] grid place-content-center'>
                                        <p className='text-black font-semibold'>14</p>
                                    </div> */}
                </>
              );
            })}
          </div>

          <div className="pl-2 w-full box-border text-sm bg-[#15171A] max-h-[30px] overflow-y-scroll flex flex-col">
            <p className="py-1 font-light text-[#A8FF53]">{msg}</p>
          </div>

          <motion.button
          whileHover="hover"
          className="hover:bg-[#5E8834] items-center h-[30px] flex flex-row gap-2 px-2 absolute bottom-8 font-medium right-2 bg-[#A8FF53] text-black rounded-sm"
          onClick={() => {
            setShowStudentInfo(true);
          }}
        >
          <p>view full</p>
          <motion.svg
            variants={childRotate1}
            className="translate-y-[1px]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2 0H0.8C0.587827 0 0.384344 0.0842854 0.234315 0.234315C0.0842854 0.384344 0 0.587827 0 0.8V11.2C0 11.4122 0.0842854 11.6157 0.234315 11.7657C0.384344 11.9157 0.587827 12 0.8 12H11.2C11.4122 12 11.6157 11.9157 11.7657 11.7657C11.9157 11.6157 12 11.4122 12 11.2V0.8C12 0.587827 11.9157 0.384344 11.7657 0.234315C11.6157 0.0842854 11.4122 0 11.2 0ZM9.2 8.8H2.8C2.69391 8.8 2.59217 8.75786 2.51716 8.68284C2.44214 8.60783 2.4 8.50609 2.4 8.4C2.4 8.29391 2.44214 8.19217 2.51716 8.11716C2.59217 8.04214 2.69391 8 2.8 8H9.2C9.30609 8 9.40783 8.04214 9.48284 8.11716C9.55786 8.19217 9.6 8.29391 9.6 8.4C9.6 8.50609 9.55786 8.60783 9.48284 8.68284C9.40783 8.75786 9.30609 8.8 9.2 8.8ZM9.2 6.4H2.8C2.69391 6.4 2.59217 6.35786 2.51716 6.28284C2.44214 6.20783 2.4 6.10609 2.4 6C2.4 5.89391 2.44214 5.79217 2.51716 5.71716C2.59217 5.64214 2.69391 5.6 2.8 5.6H9.2C9.30609 5.6 9.40783 5.64214 9.48284 5.71716C9.55786 5.79217 9.6 5.89391 9.6 6C9.6 6.10609 9.55786 6.20783 9.48284 6.28284C9.40783 6.35786 9.30609 6.4 9.2 6.4ZM9.2 4H2.8C2.69391 4 2.59217 3.95786 2.51716 3.88284C2.44214 3.80783 2.4 3.70609 2.4 3.6C2.4 3.49391 2.44214 3.39217 2.51716 3.31716C2.59217 3.24214 2.69391 3.2 2.8 3.2H9.2C9.30609 3.2 9.40783 3.24214 9.48284 3.31716C9.55786 3.39217 9.6 3.49391 9.6 3.6C9.6 3.70609 9.55786 3.80783 9.48284 3.88284C9.40783 3.95786 9.30609 4 9.2 4Z"
              fill="black"
            />
          </motion.svg>
        </motion.button>

        </div>

        
      </div>
      <div className="border-t-2 border-dashed border-gray-500 mt-8 mr-10 ml-10"></div>

      <div className="flex flex-row justify-between w-full px-10 mt-4 gap-2">
        <ToggleButton status={waitStatus} setStatus={setWaitStatus} examId={examId} socket={socket.current} label={'allow new students'}/>
        {/* <button className="bg-[#F43F5E] px-2 py-[2px] rounded-sm">
          stop exam
        </button> */}
        <StopButton examId={examId} setSelected={setSelected} setRender={setRender} socket={socket.current}/>
      </div>

      <div className="w-full flex flex-col gap-2 mt-12 px-10">
        <p className="text-[#5F97F3] font-normal text-sm">
          after you click stop waiting new students can’t join exam
        </p>
        <p className="text-[#F43F5E] font-normal text-sm">
          stop exam will stop the exam for every active student participating in
          the current exam
        </p>
      </div>
    </div>
  );
};
