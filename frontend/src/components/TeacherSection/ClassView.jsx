import React, { useEffect, useState } from "react";
import { LoadingRingSmall } from "../animation/LoadingRingSmall";
import axios from "axios";
import { LoadingRing } from "../animation/LoadingRing";
import { StudentsView } from "./StudentsView";
import { ExamView } from "./ExamView";
import { motion } from "framer-motion";
import { changeClass } from "../../features/Class Data/classDataSlice";
import { useDispatch } from "react-redux";

export const ClassView = ({ classId, classroomName, subjectName,socket, setExamSelected, setSelected, setExamId }) => {
  const [studentData, setStudentData] = useState([]);
  const [classCode, setClassCode] = useState("---");
  const [copyMsg, setCopyMsg] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState(false);
  const [loadingExams, setLoadingExams] = useState(false);
  const [examData, setExamData] = useState([]); //format {examName: , examId: , status: }
  
  const dispatch = useDispatch();

  const childRotate1 = {
    initial: {
      rotate: 0
    },
    hover: {
      rotate: 180
    }
  };

  async function getClassCode() {
    try {
      const response = await axios.get("http://localhost:3000/getClassCode", {
        params: {
          classId: classId,
        },
      });
      //console.log("Response:", response.data);
      setClassCode(response.data.unique_code);
    } catch (error) {
    } finally {
    }
  }

  async function getData() {
    setLoading(true);
    await getClassCode();
    await getNewStudents();
    await getExamData();
    setLoading(false);
  }

  useEffect(() => {
    // const newStudents = [];
    // for (let i = 0; i < 70; i++) {
    //   newStudents.push({
    //     Name: "Tom",
    //     UniversityNum: "KNR22CS045",
    //     joinedAt: "12-04-23",
    //     RollNo: 65,
    //   });
    // }
    // setStudentData(newStudents);

    // get students joined in this class
    // another function
    //console.log(classId);
    dispatch(changeClass(classId));
    getData();
  }, []);

  async function getCodeCopy() {
    await navigator.clipboard.writeText(classCode);
    setCopyMsg("code copied!");
    setTimeout(() => {
      setCopyMsg("");
    }, 3000);
  }

  const [newState, setNewState] = useState(false);

  useEffect(() => {
    getExamData();
  }, [newState]);

  async function getExamData() {
    setLoadingExams(true);
    try {
      const response = await axios.get("http://localhost:3000/getExams", {
        params: {
          classId: classId,
        },
      });

      var tempArr1 = [];
      var tempArr2 = [];
      console.log(response.data);
      response.data.examData.map((item, index) => {
        //console.log(item);
        if (item.type == "active" || item.type == "upcoming") {
          tempArr1.push({
            Name: item.examName,
            examId: item.examId,
            status: item.type,
            date: new Intl.DateTimeFormat('en-CA').format(new Date(item.date))
          });
        } else {
          
          console.log(item);
          tempArr2.push({
            Name: item.examName,
            examId: item.examId,
            status: item.type,
            date: new Intl.DateTimeFormat('en-CA').format(new Date(item.date))
          });
        }
      });
      //console.log(tempArr1);
      setExamData({ upcoming: tempArr1, history: tempArr2 });
    } catch (error) {
      //handle later
    } finally {
      setLoadingExams(false);
    }
  }

  async function getNewStudents() {
    setLoadingStudents(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/getClassStudents",
        {
          params: {
            classId: classId,
          },
        }
      );
      //console.log("Response:", response.data);
      var tempArr = [];
      response.data.map((item, index) => {
        tempArr.push({
          Name: item.name,
          UniversityNum: item.admission_no,
          joinedAt: item.joined_at,
          RollNo: item.roll_no,
        });
      });
      setStudentData(tempArr);
      //setClassCode(response.data);
    } catch (error) {
    } finally {
      setLoadingStudents(false);
    }
  }

  return (
    <>
      {loading && <LoadingRing />}
      {studentInfo && (
        <StudentsView
          studentData={studentData}
          setStudentInfo={setStudentInfo}
        />
      )}
      <div className="h-full w-full flex flex-col gap-4 p-10 pt-6 max-h-screen overflow-y-scroll">
        <div className="flex flex-col gap-0 mb-0">
          <h1 className="text-4xl text-[#C1C4C7] font-bold">{classroomName}</h1>
          <p className="text-[#474AA5] text-lg font-semibold">{subjectName}</p>
          <div className="mt-2 border-t-2 border-dashed border-gray-500 p-2"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-[40%] h-[40px] rounded-sm bg-[#272A2E]  flex flex-row gap-2 items-center pl-2">
            <p className="text-sm min-w-fit text-[#C1C4C7] font-medium">
              class code
            </p>
            <h2 className="text-lg text-[#A8FF53]">{classCode}</h2>
            <div className="w-full h-full flex flex-col box-border px-1 py-1 rounded-sm">
              <motion.div
                whileHover="hover"
                onClick={() => {
                  getCodeCopy();
                }}
                className="self-end h-full w-[30px] rounded-sm bg-[#A8FF53] hover:bg-[#5E8834] grid place-content-center"
              >
                <motion.svg
                  variants={{
                    hover: { rotate: 180 }, // Rotate when the parent div is hovered
                  }}
                  initial={{ rotate: 0 }} // Ensure it starts at 0 rotation
                  transition={{ duration: 0.3 }} // Smooth animation
                  animate={{ rotate: 90 }}
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6 3.73333H10.2667V1.4C10.2667 1.0287 10.1192 0.672601 9.85662 0.41005C9.59407 0.1475 9.23797 0 8.86667 0H1.4C1.0287 0 0.672601 0.1475 0.41005 0.41005C0.1475 0.672601 0 1.0287 0 1.4V8.86667C0 9.23797 0.1475 9.59407 0.41005 9.85662C0.672601 10.1192 1.0287 10.2667 1.4 10.2667H3.73333V12.6C3.73333 12.9713 3.88083 13.3274 4.14338 13.5899C4.40593 13.8525 4.76203 14 5.13333 14H12.6C12.9713 14 13.3274 13.8525 13.5899 13.5899C13.8525 13.3274 14 12.9713 14 12.6V5.13333C14 4.76203 13.8525 4.40593 13.5899 4.14338C13.3274 3.88083 12.9713 3.73333 12.6 3.73333ZM0.933333 8.86667V1.4C0.933333 1.27623 0.9825 1.15753 1.07002 1.07002C1.15753 0.9825 1.27623 0.933333 1.4 0.933333H8.86667C8.99043 0.933333 9.10913 0.9825 9.19665 1.07002C9.28417 1.15753 9.33333 1.27623 9.33333 1.4V8.86667C9.33333 8.99043 9.28417 9.10913 9.19665 9.19665C9.10913 9.28417 8.99043 9.33333 8.86667 9.33333H1.4C1.27623 9.33333 1.15753 9.28417 1.07002 9.19665C0.9825 9.10913 0.933333 8.99043 0.933333 8.86667ZM13.0667 12.6C13.0667 12.7238 13.0175 12.8425 12.93 12.93C12.8425 13.0175 12.7238 13.0667 12.6 13.0667H5.13333C5.00957 13.0667 4.89087 13.0175 4.80335 12.93C4.71583 12.8425 4.66667 12.7238 4.66667 12.6V10.2667H8.86667C9.23797 10.2667 9.59407 10.1192 9.85662 9.85662C10.1192 9.59407 10.2667 9.23797 10.2667 8.86667V4.66667H12.6C12.7238 4.66667 12.8425 4.71583 12.93 4.80335C13.0175 4.89087 13.0667 5.00957 13.0667 5.13333V12.6Z"
                    fill="black"
                  />
                </motion.svg>
              </motion.div>
            </div>
          </div>
          <div>
            <p className="text-[#A8FF53] pl-2">{copyMsg}</p>
          </div>
        </div>

        <div className="flex flex-col w-[90%] max-h-[400px] rounded-sm outline outline-1 outline-[#212327]">
          <div className="heading h-[40px] bg-[#15161A] flex flex-row justify-between items-center box-border p-2">
            <div className="flex flex-row gap-1 items-center">
              <p className="text-[#C1C4C7]">students</p>
              <div
                className="rounded-sm box-border p-2 hover:bg-black"
                onClick={() => {
                  getNewStudents();
                }}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2235 11.4835H11.373C11.1476 11.4835 10.9314 11.5731 10.772 11.7325C10.6126 11.8919 10.523 12.1081 10.523 12.3335C10.523 12.5589 10.6126 12.7751 10.772 12.9345C10.9314 13.0939 11.1476 13.1835 11.373 13.1835H13.413C12.4754 14.1633 11.2662 14.8404 9.94089 15.1278C8.61553 15.4152 7.23453 15.2997 5.97531 14.7962C4.71609 14.2927 3.63619 13.4241 2.87435 12.3022C2.11252 11.1803 1.70355 9.85615 1.7 8.5C1.7 8.27457 1.61045 8.05837 1.45104 7.89896C1.29163 7.73955 1.07543 7.65 0.85 7.65C0.624566 7.65 0.408365 7.73955 0.248959 7.89896C0.0895533 8.05837 0 8.27457 0 8.5C0.00449366 10.1599 0.494888 11.7821 1.41066 13.1665C2.32644 14.5509 3.62752 15.6369 5.15333 16.2904C6.67915 16.944 8.36292 17.1365 9.99687 16.8441C11.6308 16.5518 13.1434 15.7875 14.348 14.6455V16.15C14.348 16.3754 14.4376 16.5916 14.597 16.751C14.7564 16.9104 14.9726 17 15.198 17C15.4234 17 15.6396 16.9104 15.799 16.751C15.9584 16.5916 16.048 16.3754 16.048 16.15V12.325C16.0459 12.1054 15.9589 11.8951 15.8052 11.7382C15.6515 11.5814 15.443 11.4901 15.2235 11.4835ZM8.5 0C6.32093 0.00621536 4.22747 0.849077 2.652 2.3545V0.85C2.652 0.624566 2.56245 0.408365 2.40304 0.248959C2.24364 0.0895533 2.02743 0 1.802 0C1.57657 0 1.36037 0.0895533 1.20096 0.248959C1.04155 0.408365 0.952 0.624566 0.952 0.85V4.675C0.952 4.90043 1.04155 5.11663 1.20096 5.27604C1.36037 5.43545 1.57657 5.525 1.802 5.525H5.627C5.85243 5.525 6.06863 5.43545 6.22804 5.27604C6.38745 5.11663 6.477 4.90043 6.477 4.675C6.477 4.44957 6.38745 4.23337 6.22804 4.07396C6.06863 3.91455 5.85243 3.825 5.627 3.825H3.587C4.5241 2.84569 5.73248 2.16877 7.05704 1.88114C8.3816 1.59351 9.7619 1.70828 11.0208 2.21073C12.2796 2.71318 13.3596 3.58038 14.1221 4.70101C14.8846 5.82165 15.2948 7.14458 15.3 8.5C15.3 8.72543 15.3896 8.94163 15.549 9.10104C15.7084 9.26045 15.9246 9.35 16.15 9.35C16.3754 9.35 16.5916 9.26045 16.751 9.10104C16.9104 8.94163 17 8.72543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z"
                    fill="#A8FF53"
                  />
                </svg>
              </div>
            </div>

            <div>
              <p className="text-[#A8FF53]">
                total <span className="font-medium">{studentData.length}</span>
              </p>
            </div>
          </div>

          <div className="relative box-border p-4 gap-2 w-full max-h-[300px] min-h-[130px] bg-[#1B1D1F] scroller overflow-y-scroll flex flex-row flex-wrap">
            {loadingStudents && <LoadingRingSmall />}
            {!loadingStudents &&
              studentData.map((item, index) => {
                return (
                  <div className="h-[40px] w-[40px] rounded-full relative bg-[#132B52]">
                    <div className="absolute left-[-4px] h-[40px] w-[40px] rounded-[50%] bg-gradient-to-r to-[#474AA5] from-[#3B82F6] grid place-content-center">
                    <h1 className="text-white font-bold">{item.RollNo}</h1>
                    </div>
                  </div>
                );
              })}
            <div>
            <motion.button
  whileHover="hover"
  className="hover:bg-[#5E8834] items-center h-[30px] flex flex-row gap-2 px-2 absolute bottom-2 font-medium right-2 bg-[#A8FF53] text-black rounded-sm"
  onClick={() => {
    setStudentInfo(true);
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
        </div>

        <div className="flex flex-col gap-1 mt-6">
          <div className="border-t-2 border-dashed border-gray-500 p-2"></div>
          <h1 className="text-3xl text-[#C1C4C7] font-bold mb-4">Exams</h1>
          <div className="flex lg:flex-row flex-col lg:gap-4 gap-2 w-full">
            <ExamView  socket={socket} setNewState={setNewState} loaded={!loadingExams} setExamId={setExamId} setExamSelected={setExamSelected} setSelected={setSelected} upcomingData={examData.upcoming} classId={classId}/>
            <ExamView
              
              loaded={!loadingExams}
              historyData={examData.history}
              type="history"
            />
          </div>
        </div>
      </div>
    </>
  );
};
