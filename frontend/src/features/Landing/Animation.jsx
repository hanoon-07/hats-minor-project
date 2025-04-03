import React, {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

const studentInfo = [
  {
    rollNo: 1,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 2,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 3,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 4,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 5,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 6,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 7,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 8,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 9,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 10,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 11,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 12,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 13,
    name: "Aans",
    status: "absent",
  },
  {
    rollNo: 14,
    name: "Aans",
    status: "absent",
  },
];

export const Animation = () => {
  const [state, setState] = useState(0);
  const [popUps, setPopUps] = useState([]);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{delay: 1}}
      className=" w-[50%]  relative overflow-hidden"
    >
      <ExamDiv setPopUps={setPopUps}></ExamDiv>
      <StartBar></StartBar>
      <InfoWindow popUps={popUps} setPopUps={setPopUps}></InfoWindow>
    </motion.div>
  );
};

const ExamDiv = ({setPopUps}) => {
  const [state, setState] = useState(0);
  const [studentAnimInfo, setStudentAnimInfo] = useState(studentInfo);

  const [childVisible, setChildVisible] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const animArrayX = [
    100, 200, 40, 30, 120, 101, 104, 120, 160, 180, 70, 120, 160, 20, 400, 100,
  ];

  useEffect(() => {
    const animArray = [
      "join 3",
      "join 4",
      "join 10",
      "join 12",
      "join 7",
      "join 5",
      "join 8",
      "submit 3",
      "submit 10",
      "absent 5",
      "submit 7",
      "submit 10",
      "absent 8",
      "join 1",
    ];

    let count = 0;
    let time = 0;
    const interval1 = setInterval(() => {
      time++;
      if (time <= 6) return;
      let temp = animArray[count];
      let status = temp.split(" ")[0];
      let rollNo = Number(temp.split(" ")[1]);
      setPopUps((prevItems) => [
        ...prevItems,
        {
          msg:
            status == "join"
              ? `roll no ${rollNo} joined!`
              : status == "submit"
              ? `roll no ${rollNo} submitted!`
              : `roll no ${rollNo} left the exam`,
          status: status,
        },
      ]);

      count += 1;

      // console.log(rollNo, status);
      setStudentAnimInfo((prevItems) =>
        prevItems.map((item) =>
          item.rollNo === rollNo ? {...item, status: status} : item
        )
      );

      if (count >= animArray.length) {
        clearInterval(interval1);
      }
    }, 1000);

    return () => {
      clearInterval(interval1);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(1);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{top: -10, opacity: 0}}
      animate={{top: 40, opacity: 1}}
      transition={{delay: 2.9}}
      className="p-[2px] min-w-[50%] bg-gradient-to-b grid place-content-center from-[#211d62] to-[#121317] relative left-[20%] top-[100px] w-[402px] h-[502px] rounded-md"
    >
      <motion.div className=" w-[400px] h-[500px] rounded-md bg-gradient-to-b from-[#1b1832] to-[#121317] flex flex-col">
        <div className="flex flex-row justify-end items-center gap-[6px] h-[35px] box-border px-[4px] rounded-t-md border-b-[1px] border-[#211d62]">
          <div className="w-[14px] h-[14px] bg-[#3b82f6] rounded-full"></div>
          <div className="w-[14px] h-[14px] bg-[#a8ff53] rounded-full"></div>
          <div className="w-[14px] h-[14px] bg-[#f43f5e] rounded-full"></div>
        </div>

        <div className="w-full flex flex-row flex-wrap gap-2 pt-3 px-3 box-border">
          {studentAnimInfo.map((item, index) => {
            return (
              <div
                key={index}
                className={`h-[30px] w-[30px] rounded-full outline-1 ${
                  item.status == "absent"
                    ? "outline-[#f43f5e]"
                    : item.status == "submit"
                    ? "bg-[#3b82f6]"
                    : "bg-[#a8ff53]"
                } grid place-content-center`}
              >
                <p
                  className={`${
                    item.status == "absent"
                      ? "text-[#f43f5e]"
                      : " text-[black] "
                  }`}
                >
                  {item.rollNo}
                </p>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-[20px] z-30">
          {state == 1 ? <TextAnim /> : null}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TextAnim = () => {
  return (
    <div className="">
      <motion.h1
        initial={{left: -20, opacity: 0}}
        animate={{left: 30, opacity: 1}}
        transition={{delay: 0.8}}
        className="text-2xl relative text-[#d7d9dd] "
      >
        Real time exam management
      </motion.h1>
      <motion.p
        initial={{left: -20, opacity: 0}}
        animate={{left: 30, opacity: 1}}
        transition={{delay: 1}}
        className="relative text-[#20370a]"
      >
        Learning happens in real-time, so should exams
      </motion.p>
    </div>
  );
};

const InfoWindow = ({popUps, setPopUps}) => {
  const [localInfo, setLocalInfo] = useState([]);

  useEffect(() => {
    if (popUps.length === 0) return;

    setLocalInfo((prevItems) => [...prevItems, popUps[popUps.length - 1]]);
  }, [popUps]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalInfo((prevItems) => {
        return prevItems.slice(1);
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{top: 80, opacity: 0}}
      animate={{top: 100, opacity: 1}}
      transition={{delay: 2.9}}
      className="p-[2px] bg-gradient-to-b grid place-content-center from-[#211d62]/30 to-[#121317]/30 absolute left-[40%] translate-y-[200px] -z-0  w-[302px] h-[302px] rounded-md"
    >
      <motion.div className="w-[300px] h-[300px] rounded-md bg-gradient-to-b from-[#1b1832]/30 to-[#121317]/30 flex flex-col">
        <div className="flex flex-row justify-end items-center gap-[6px] min-h-[35px] box-border px-[4px] rounded-t-md border-b-[1px] border-[#211d62]">
          <div className="w-[14px] h-[14px] bg-[#a8ff53] rounded-full"></div>
          <div className="w-[14px] h-[14px] bg-[#f43f5e] rounded-full"></div>
        </div>

        <motion.div className="w-full flex flex-col p-1 gap-1 justify-center">
          <AnimatePresence>
            {localInfo.map((item, index) => (
              <motion.div
                exit={{opacity: 0, y: -10}}
                key={index}
                initial={{opacity: 0.4, y: -10}}
                animate={{y: 0, opacity: 1}}
                className={`w-full box-border px-1 outline-1 ${
                  item.status === "join"
                    ? "outline-[#436323] text-[#5c892e]"
                    : "outline-[#812736] text-[#c3334b]"
                }`}
              >
                {item.msg}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const StartBar = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(1);
    }, 2900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div
        initial={{y: 0, x: 0}}
        animate={state == 1 ? {y: 80, x: 270} : {y: [0, -80], x: [0, 160]}}
        transition={{ease: "easeOut", delay: 2, duration: 0.7}}
        className="z-[40] absolute top-[400px] left-[300px]"
      >
        <CursorSVG />
      </motion.div>

      <AnimatePresence>
        {state == 0 && (
          <motion.div
            initial={{top: 100}}
            exit={{scale: 1.3, opacity: 0}}
            transition={{duration: 0.7}}
            className="absolute top-[80px] left-[140px] h-[500px] w-[442px] bg-gradient-to-b from-[#121317] via-[#47662c] to-[#121317] grid place-content-center"
          >
            <div className=" bg-gradient-to-b from-[#121317] via-[#2a3920] gap-2 to-[#121317] left-[170px] flex flex-col justify-center items-center h-[500px] w-[440px]">
              <div className=" w-[330px] p-1 h-[42px] grid place-content-center  bg-[#122713]/70 outline outline-1 outline-[#37501f] rounded-md">
                <motion.div className=" rounded-md  justify-between items-center px-2 w-[300px] h-[50px]  flex flex-row">
                  <p className="text-[#d7d9dd]">exam name demo</p>
                  <button className="flex flex-row gap-2 items-center justify-center  w-[70px] h-[28px] rounded-sm p-1 bg-[#a8ff53]">
                    start
                    <PlaySVG></PlaySVG>
                  </button>
                </motion.div>
              </div>

              <div className=" w-[330px] p-1 h-[42px] grid place-content-center  bg-[#122713]/70 outline-1 outline-[#37501f] rounded-md">
                <motion.div className=" rounded-md  justify-between items-center px-2 w-[300px] h-[50px]  flex flex-row">
                  <p className="text-[#d7d9dd]">exam name demo</p>
                  <button className="flex flex-row gap-2 items-center justify-center  w-[70px] h-[28px] rounded-sm p-1 bg-[#a8ff53]">
                    start
                    <PlaySVG></PlaySVG>
                  </button>
                </motion.div>
              </div>

              <div className=" w-[330px] p-1 h-[42px] grid place-content-center  bg-[#122713]/70 outline-1 outline-[#37501f] rounded-md">
                <motion.div className=" rounded-md  justify-between items-center px-2 w-[300px] h-[50px]  flex flex-row">
                  <p className="text-[#d7d9dd]">exam name demo</p>
                  <button
                    className={`${
                      state == 0 ? "bg-[#a8ff53]" : "bg-blue-800"
                    } flex flex-row gap-2 items-center justify-center  w-[70px] h-[28px] rounded-sm p-1 `}
                  >
                    start
                    <PlaySVG></PlaySVG>
                  </button>
                </motion.div>
              </div>

              <div className=" w-[330px] p-1 h-[42px] grid place-content-center  bg-[#122713]/70 outline-1 outline-[#37501f] rounded-md">
                <motion.div className=" rounded-md  justify-between items-center px-2 w-[300px] h-[50px]  flex flex-row">
                  <p className="text-[#d7d9dd]">exam name demo</p>
                  <button className="flex flex-row gap-2 items-center justify-center  w-[70px] h-[28px] rounded-sm p-1 bg-[#a8ff53]">
                    start
                    <PlaySVG></PlaySVG>
                  </button>
                </motion.div>
              </div>

              <div className=" w-[330px] p-1 h-[42px] grid place-content-center  bg-[#122713]/70 outline-1 outline-[#37501f] rounded-md">
                <motion.div className=" rounded-md  justify-between items-center px-2 w-[300px] h-[50px]  flex flex-row">
                  <p className="text-[#d7d9dd]">exam name demo</p>
                  <button className="flex flex-row gap-2 items-center justify-center  w-[70px] h-[28px] rounded-sm p-1 bg-[#a8ff53]">
                    start
                    <PlaySVG></PlaySVG>
                  </button>
                </motion.div>
              </div>

              <div className=" w-[330px] p-1 h-[42px] grid place-content-center  bg-[#122713]/70 outline-1 outline-[#37501f] rounded-md">
                <motion.div className=" rounded-md  justify-between items-center px-2 w-[300px] h-[50px]  flex flex-row">
                  <p className="text-[#d7d9dd]">exam name demo</p>
                  <button className="flex flex-row gap-2 items-center justify-center  w-[70px] h-[28px] rounded-sm p-1 bg-[#a8ff53]">
                    start
                    <PlaySVG></PlaySVG>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

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

const PlaySVG = () => {
  return (
    <>
      <svg
        className="translate-y-[2px]"
        width="8"
        height="11"
        viewBox="0 0 8 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.99977 5.60725C7.99539 5.54353 7.97718 5.48182 7.94662 5.42703C7.91606 5.37223 7.87399 5.32592 7.82378 5.29173L0.567984 0.682922H0.563984C0.506864 0.648264 0.442383 0.630127 0.376789 0.630127C0.311196 0.630127 0.246715 0.648264 0.189595 0.682922C0.131883 0.718936 0.0839904 0.770632 0.0507152 0.832806C0.0174401 0.894979 -4.90777e-05 0.965542 1.03441e-07 1.03727V10.2315C0.00119696 10.3019 0.0192762 10.3707 0.0524896 10.4314C0.085703 10.4921 0.132927 10.5426 0.189595 10.578C0.246424 10.6122 0.310463 10.6301 0.375589 10.6301C0.440716 10.6301 0.504755 10.6122 0.561584 10.578H0.564784L7.81258 5.97356C7.86961 5.93737 7.91687 5.88581 7.9497 5.82399C7.98253 5.76217 7.99979 5.69218 7.99977 5.621C8.00008 5.61154 8.00008 5.60211 7.99977 5.59266V5.60725Z"
          fill="black"
        />
      </svg>
    </>
  );
};

export default Animation;
