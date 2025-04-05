import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ExamDisplay } from "../components/ExamDisplay";
import { JoinClassButton } from "../components/JoinClassButton";
import { LoadingRing } from "../components/animation/LoadingRing";
import { useParams } from "react-router-dom";


function Classes() {
  const { studentId } = useParams();
  const [modalWindow, setModalWindow] = useState(false);
  const [selected, setSelected] = useState("classes");
  const [data, setData] = useState([]);
  const [classId, setClassId] = useState(0);
  const [classCode, setClassCode] = useState("");

  const [loading, setLoading] = useState(1)


  // const [studentData, setStudentData] = useState("");


  // useEffect(() => {
  //   const getStudentDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/studentInfo?studentId=${studentId}`
  //       );
  //       setStudentData(response.data);

  //     } catch (error) {
  //       console.error("Error fetching class details:", error);
  //     }
  //   };
  //   getStudentDetails();
  // }, [studentId]);

  const getAllClassDetails = async () => {
    try {

      const response = await axios.get(
        `http://localhost:3000/allClassInfo?studentId=${studentId}`
      );
      if (response.data.msg) {
        setData([]);
        setLoading(0)
      } else {
        setData(response.data || []);
        setLoading(0)
      }
    } catch (error) {
      console.error("Error fetching class details:", error);
    }

  };

  useEffect(() => {
    getAllClassDetails();
  }, [studentId]);

  const handleJoinClass = async () => {
    try {
      setModalWindow(false);
      setClassCode("");
      //console.log(studentId)
      //console.log(classCode)

      const response = await axios.post(
        "http://localhost:3000/joinClass",
        {
          studentId: studentId,
          classCode: classCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error joining class:", error);
    } finally {
      getAllClassDetails();
      //console.log(data);
    }
  };

  if (loading) {
    return <LoadingRing />;
  }


  return (
    <>
      <div className="h-full w-full p-5">
        <h1 className="h-[10%] text-[#c1c4c7] text-3xl font-bold">
          {selected == 'classes' ? "My Classes" : "Exams"}
        </h1>
        <div className="h-[90%] overflow-y-scroll scroller">


          <h1 className="text-[#c1c4c7] text-md font-md mt-1">
            {selected == 'classes' ? "click classes to view current exams/past results" : ""}
          </h1>


          {selected == 'classes' && <div className="flex flex-row gap-x-3 flex-wrap">

            {data &&
              data.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row flex-wrap gap-3 mt-[20px] max-h-[70vh]"
                  onClick={() => {
                    setSelected("exam");
                    setClassId(item.class_id);
                  }}
                >

                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    className="w-[250px] h-[150px] rounded-md border border-gray-800 p-4 flex flex-col gap-2 justify-around transition-shadow duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  >
                    <p className="font-semibold text-lg text-[#c1c4c7]">
                      {item.name}
                    </p>
                    <div>
                      <p className="text-[#c1c4c7]">
                        <span className="font-bold text-2xl text-[#474aa5]">
                          {item.capacity}
                        </span>{" "}
                        students
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            <div className="flex flex-row mt-6 gap-2 w-full">
              <JoinClassButton onClick={() => setModalWindow(true)} />
            </div>
          </div>}

          {selected == 'exam' && <ExamDisplay id={classId} />}


        </div>
      </div>



      {modalWindow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[350px] w-[450px] rounded-lg bg-[#272a2e] outline outline-1 shadow-xl p-4 pt-4">
            <div className="text-center text-white">
              <h1 className="text-2xl mb-6">Enter the class code</h1>

              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="Enter class code"
                className="w-full p-2 mb-6 bg-[#1a1b1f] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#474aa5]"
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setModalWindow(false)}
                  className="px-4 py-2 bg-[#1a1b1f] text-white rounded-md hover:bg-[#212327]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleJoinClass();
                    setTimeout(() => {
                      getAllClassDetails();
                    }, 1000);
                  }}
                  className="px-4 py-2 bg-[#474aa5] text-white rounded-md hover:bg-[#5b61c7]"
                >
                  Join Class
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default Classes