
import React, {useEffect, useState} from "react";
import {TeacherNavBar} from "../components/TeacherSection/TeacherNavBar";
import {motion} from "framer-motion";
import {Movebutton} from "../components/Movebutton";
import {ClassroomCreate} from "../components/TeacherSection/ClassroomCreate";
import {LoadingRing} from "../components/animation/LoadingRing";
import axios from "axios";
import {ClassView} from "../components/TeacherSection/ClassView";
import {useParams} from "react-router-dom";
import {ExamPanel} from "../components/TeacherSection/ExamPanel";
import {useDispatch} from "react-redux";
import Profile from "../components/TeacherSection/Profile";


export const Teacher = () => {

  const {teacherId, teacherName} = useParams();
  const [selected, setSelected] = useState("classes");
  const [open, setOpen] = useState(false);
  const [createClassroom, setCreateClassRoom] = useState(false);
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showingClass, setShowingClass] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [examId, setExamId] = useState(null);

  const [currentClasses, setCurrentClasses] = useState([]);
  const [examSelected, setExamSelected] = useState("test exam");


  const dispatch = useDispatch();

  async function postClassData() {
    if (!classData) {
      // Validate before sending
      console.error("Error: Class data is empty or invalid.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://hats-minor-project-production.up.railway.app/createClass",
        classData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newClassId = response.data.newClassId;
      // console.log("Response:", response.data);
      // console.log(response.data);
      setCurrentClasses([
        ...currentClasses,
        {
          className: response.data.className,
          studentCount: response.data.studentCount,
          activeExam: response.data.activeExam,
          subject: response.data.subjectm,
          classId: newClassId,
        },
      ]);
    } catch (error) {
      console.error("Error posting class data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function getClases() {
    setLoading(true);
    try {
      const response = await axios.get("https://hats-minor-project-production.up.railway.app/getClasses", {
        params: {
          teacherId: teacherId,
        },
      });
      //console.log("Response:", response.data);
      setCurrentClasses(response.data.classData);
    } catch (error) {
      console.error("Error posting class data:", error);
    } finally {
      setLoading(false);
    }
  }

  function selectClass(item) {
    //console.log(item);
    setCurrentClass({
      className: item.className,
      subject: item.subject,
      classId: item.classId,
    });
    setShowingClass(true);
  }

  function clearClass() {
    setCurrentClass(false);
    setShowingClass(false);
  }

  useEffect(() => {
    getClases();
  }, []);

  useEffect(() => {
    if (classData) {
      postClassData();
      setClassData(null);
    }
  }, [classData]);

  // if(examPanelView) {
  //   return <div className="h-screen w-screen flex flex-row bg-[#15171a]">
  //     {<TeacherNavBar
  //           currentClass={currentClass}
  //           showingClass={showingClass}
  //           clearClass={clearClass}
  //           selected={selected}
  //           setSelected={setSelected}
  //           setOpen={setOpen}
  //         />}
  //       <ExamPanel />
  //   </div>
  // }

  return (
    <>
      {loading && <LoadingRing />}

      {createClassroom && (
        <ClassroomCreate
          setOpenClassCreator={setCreateClassRoom}
          setData={setClassData}
          teacherId={teacherId}
        />
      )}
      <div className="h-screen w-screen flex flex-row bg-[#15171a]">
        {
          <TeacherNavBar
            currentClass={currentClass}
            showingClass={showingClass}
            setShowingClass={setShowingClass}
            setExamSelected={setExamSelected}
            examSelected={examSelected}
            clearClass={clearClass}
            selected={selected}
            setSelected={setSelected}
            setOpen={setOpen}
          />
        }
        {selected == "exam-panel" && <ExamPanel examId={examId}  setSelected={setSelected}/>}
        {selected == "classes" && showingClass && (
          <ClassView
            clearClass={clearClass}
            classId={currentClass.classId}
            classroomName={currentClass.className}
            subjectName={currentClass.subject}
            setExamSelected={setExamSelected}
            setSelected={setSelected}
            setExamId={setExamId}
          />
        )}
        {selected == "classes" && !showingClass && (
          <div className="h-screen w-full p-10">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-[#c1c4c7] text-3xl font-bold">
                  My Classes
                </h1>
              </div>

              <div className="scroller flex flex-row flex-wrap gap-3 mt-[20px] overflow-y-scroll max-h-[70vh]">
                {currentClasses.map((item, index) => {
                  return (
                    <motion.div
                      onClick={() => {
                        selectClass(item);
                      }}
                      initial={{opacity: 0.4}}
                      animate={{opacity: 1}}
                      transition={{duration: (index + 1) * 0.04}}
                      className="w-[250px] h-[150px] rounded-md bg-[#272a2e] hover:bg-[#212327] p-4 flex flex-col gap-2 justify-around"
                    >
                      <p className="font-semibold text-lg text-[#c1c4c7] pl-2">
                        {item.className}
                      </p>

                      <p className="font-semibold text-lg text-gray-500 pl-2">
                        {item.subject}
                      </p>

                      <div className="flex flex-row gap-4 items-center">
                        <div className="w-[40px] h-[40px] grid place-content-center rounded-full bg-[#132B52] relative translate-x-2">
                          <div className="w-[40px] h-[40px] grid place-content-center rounded-md bg-[#3B82F6] absolute left-[-5px] top-[0px]">
                            <p className="font-semibold text-white text-lg">
                              {item.studentCount}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-md text-[#c1c4c7]">
                          students
                        </p>
                      </div>

                     
                    </motion.div>
                  );
                })}
              </div>

              <div className="border-t-2 border-dashed border-gray-500 mt-4"></div>
              <div className="flex flex-row mt-3 gap-2">
                <Movebutton
                  label={"create class"}
                  action={() => {
                    setCreateClassRoom(true);
                  }}
                  extraStyleDiv={" rounded-sm"}
                />
                
              </div>
            </div>
          </div>
        )}
        {selected == "profile" && <Profile teacherId={teacherId} />}
      </div>
    </>
  );
};
