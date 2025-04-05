import CodeflowLogo from "../../assets/codeflow_logo.svg";
import {motion, AnimatePresence} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {BackTexture} from "./BackTexture";
import {useState} from "react";
import RightCodeAnim from "./RightCodeAnim";
import {Github} from "lucide-react";
import {Navigate} from "react-router-dom";
import { AnimSlider } from "./AnimSlider";

function Landing() {
  
  return (
    <>
      <BackTexture />
      <div className="w-screen  h-screen overflow-hidden relative px-4">
        <Header />
        <MainContainer />
      </div>
    </>
  );
}

export default Landing;

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen pl-[50px] box-border pr-[50px]  h-[60px] left-0   absolute top-0 z-20 bg-[#121317]/30 outline  outline-1 outline-[#1c1e21] flex flex-row gap-4 justify-between items-center ">
      <div className="flex flex-row gap-[22px]">
        <img className="" src={CodeflowLogo} alt="codeflow logo" />
        <a href="https://github.com/hanoon-07/hats-minor-project">
          <button
            className="flex flex-row gap-2 px-8 py-[6px] text-[#C1C4C7] hover:outline-[#A8FF53] hover:outline hover:outline-1  font-light rounded-[2px] border-none cursor-pointer transition-transform active:scale-95
            bg-[repeating-linear-gradient(45deg,#35383C,#191b1e_1px,#191b1e,#191b1e_6px)]"
          >
            <GitHubSVG />
            Git Hub
          </button>
        </a>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={() => {navigate('/login')}}
          className="px-8 py-[6px] text-[#A8FF53] hover:outline-[#A8FF53] hover:outline hover:outline-1  font-normal rounded-[2px] border-none cursor-pointer transition-transform active:scale-95
          bg-[repeating-linear-gradient(45deg,#35383C,#191b1e_1px,#191b1e,#191b1e_6px)]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

const MainContainer = () => {

  const [state, setState] = useState(1);
  const [animState, setAnimState] = useState(0);

  return (
    <main className={`flex flex-row relative w-full justify-between mt-[170px]`}>
      
      <LeftDiv state={state} setState={setState} setAnimState={setAnimState}/>
      <AnimSlider animState={animState} setAnimState={setAnimState}/>
      {/* <RightCodeAnim /> */}
    </main>
  );
};

const LeftDiv = ({state = 2, setState, setAnimState}) => {

  const navigate = useNavigate();

  if(state ==1) return <>
    <AnimatePresence>
      <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} transition={{ease: 'linear'}} className="flex flex-col gap-4 pl-[132px] selection:bg-[#a9ff5311] selection:text-[#A8FF53]">
        <div onClick={() => {setAnimState(0);}} className="py-[4px] w-[350px] h-[50px]  text-[white] hover:text-[#A8FF53]   font-light text-lg grid place-content-center  border-none cursor-pointer transition-transform active:scale-95
              bg-[repeating-linear-gradient(45deg,#35383C,#15171A_1px,#15171A,#15171A_6px)]">
            4 languages suported {"->"}
        </div>

        <div className="text-[48px] max-w-[60%] font-bold text-[#C1C4C7]">
          <h1>Automated Coding Exams, Simplified</h1>
        </div>

        <div className="text-[18px] font-light text-[#6c6f7a] max-w-[40vw]">
          <span className="text-[#a9ff53ac] text-[16px]">CODEFLOW</span> is a smart platform for secure and automated coding exams. It enables real-time management, seamless interactions, and malpractice detection for a fair assessment experience.
        </div>
      
        <div className="flex flex-row gap-4">
          <button
              onClick={() => {navigate('/login')}}
              className="px-6 py-[6px] w-[180px]  font-normal rounded-[2px] border-none cursor-pointer transition-transform active:scale-95
              bg-[#A8FF53]"
            >
              Get Started
          </button>

          <button
            onClick={() => {setState(2);}}
            className="px-6 py-[6px] w-[180px] text-[#3064b8]  bg-[repeating-linear-gradient(45deg,#35383C,#15171A_1px,#15171A,#15171A_6px)] hover:outline-[#A8FF53] hover:outline hover:outline-1   font-normal rounded-[2px] border-none cursor-pointer transition-transform active:scale-95
            "
          >
            Contact us
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  </>

  else if(state == 2) {
    
    const contactData = [{name: 'Hanoon', gitUrl: 'https://github.com/hanoon-07', img: <img></img>, info: 'Tom spearheaded the compiler module, ensuring seamless integration.'}, 
      {name: 'Amarnath', gitUrl: 'https://github.com/Amar-rep', img: <img></img>, info: 'Tom spearheaded the compiler module, ensuring seamless integration.'},
      {name: 'Tom', gitUrl: 'https://github.com/tsn67', img: <img></img>, info: 'Tom spearheaded the compiler module, ensuring seamless integration.'},
      {name: 'Swalih', gitUrl: 'https://github.com/swalihAsarafu', img: <img></img>, info: 'Tom spearheaded the compiler module, ensuring seamless integration.'}
    ]
    
    return <>
      <motion.div initial={{opacity: 0, y: -10}} animate={{opacity: 1, y: 0}} transition={{ease: 'linear'}} className="flex flex-col gap-6 pl-[132px] selection:bg-[#a9ff5311] selection:text-[#A8FF53]">
          <h1 className="text-4xl font-bold text-[rgb(193,196,199)]">Contact us</h1>
          {contactData.map((obj, index) => {
            return <motion.a href={obj.gitUrl}>
                <motion.div whileHover={{scale: 1.1, x: 20}} transition={{duration: 0.1}} className="text-[#C1C4C7] hover:text-[#A8FF53]  w-[550px] bg-[repeating-linear-gradient(45deg,#35383C,#15171A_1px,#15171A,#15171A_6px)] h-[60px] flex flex-row gap-3 items-center box-border p-4">
                  <div className="flex flex-row gap-0 items-end text-[#3064b8]">
                    <span className="text-2xl font-bold">{obj.name[0]}</span> <span className="text-lg">{obj.name.slice(1, obj.name.length)}</span>
                  </div>
                  <p className="text-sm">{obj.info}</p>
              </motion.div>
            </motion.a>
          })}

          <button
            onClick={() => setState(1)}
            className="px-6 py-[2px] w-[100px]  font-normal rounded-[2px] border-none cursor-pointer transition-transform active:scale-95
            bg-[#A8FF53]"
          >
            Back
        </button>
      </motion.div>
    </>
  }
}



const textVariants = {
  hidden: {opacity: 0, y: 10},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.6,
    },
  },
};

const JavaSvg = () => {
  return (
    <div>
      <svg
        height="50px"
        style={{enableBackground: "new 0 0 512 512"}}
        version="1.1"
        viewBox="0 0 512 512"
        width="50px"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g id="_x31_81-java">
          <g>
            <path
              d="M333.283,307.117c8.807-6.02,21.023-11.23,21.023-11.23s-34.768,6.29-69.357,9.165    c-42.315,3.503-87.775,4.221-110.595,1.167c-53.996-7.187,29.647-27.044,29.647-27.044s-32.433-2.154-72.413,17.07    C84.422,319.066,248.383,329.487,333.283,307.117z"
              style={{fill: "#5382A1"}}
            />
            <path
              d="M256.56,278.277c-17.07-38.362-74.659-72.054,0-130.99C349.727,73.797,301.93,26,301.93,26    c19.316,75.917-67.92,98.917-99.456,146.084C181.001,204.337,212.986,238.927,256.56,278.277z"
              style={{fill: "#F8981D"}}
            />
            <path
              d="M359.518,119.975c0.09,0-157.403,39.351-82.205,125.958c22.191,25.516-5.84,48.516-5.84,48.516    s56.332-29.108,30.457-65.495C277.762,194.993,259.254,178.103,359.518,119.975z"
              style={{fill: "#F8981D"}}
            />
            <path
              d="M354.039,362.999c-0.449,1.078-1.797,2.247-1.797,2.336    c115.266-30.277,72.861-106.824,17.787-87.416c-4.852,1.707-7.365,5.66-7.365,5.66s3.053-1.259,9.883-2.696    C400.396,275.044,440.377,318.168,354.039,362.999L354.039,362.999z"
              style={{fill: "#5382A1"}}
            />
            <path
              d="M396.443,418.971c0,0,13.027,10.692-14.285,19.047c-52.018,15.722-216.339,20.483-261.979,0.63    c-16.441-7.099,14.374-17.072,24.078-19.137c10.061-2.157,15.901-1.799,15.901-1.799c-18.238-12.847-117.963,25.247-50.671,36.119    C292.945,483.657,444.061,440.443,396.443,418.971L396.443,418.971z"
              style={{fill: "#5382A1"}}
            />
            <path
              d="M195.557,381.776c-70.706,19.766,43.035,60.555,133.055,22.011    c-14.732-5.748-25.334-12.397-25.334-12.397c-40.16,7.637-58.756,8.175-95.233,4.043    C177.948,392.019,195.557,381.776,195.557,381.776L195.557,381.776z"
              style={{fill: "#5382A1"}}
            />
            <path
              d="M357.092,469.103c-70.705,13.296-157.941,11.771-209.602,3.233c0-0.088,10.602,8.716,65.046,12.22    c82.834,5.302,210.051-2.966,213.016-42.136C425.553,442.42,419.803,457.245,357.092,469.103L357.092,469.103z"
              style={{fill: "#5382A1"}}
            />
            <path
              d="M317.922,343.144c-53.188,10.243-84.003,9.973-122.904,5.93    c-30.098-3.145-10.422-17.698-10.422-17.698c-77.982,25.874,43.304,55.164,152.281,23.269    C325.289,350.601,317.922,343.144,317.922,343.144z"
              style={{fill: "#5382A1"}}
            />
          </g>
        </g>
        <g id="Layer_1" />
      </svg>
    </div>
  );
};

// Variants for staggered animations
const textVariants2 = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0},
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.6,
    },
  },
};

// function TeamMembers({change, setChange}) {
//   return (
//     <motion.div
//       key={"team-members"}
//       variants={textVariants2}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className="bg-black/20 text-white flex flex-col items-start justify-center p-8"
//     >
//       <motion.p
//         className="text-sm text-gray-400 mb-4 flex items-center gap-2"
//         variants={textVariants2}
//         initial="hidden"
//         animate="visible"
//       >
//         <svg
//           className="w-5 h-5"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//           />
//         </svg>
//         Meet the Team
//       </motion.p>

//       {/* Main Heading */}
//       <motion.h1
//         className="text-5xl md:text-6xl font-bold mb-6 text-gray-300 tracking-wide"
//         variants={textVariants2}
//         initial="hidden"
//         animate="visible"
//         transition={{delay: 0.2}}
//       >
//         Our Team
//       </motion.h1>

//       {/* Team Members List */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
//         variants={textVariants2}
//         initial="hidden"
//         animate="visible"
//         transition={{delay: 0.4}}
//       >
//         {/* Member 1 */}
//         <div className="flex flex-col">
//           <h3 className="text-xl font-semibold text-gray-200">Tom Sebastian</h3>
//           <p className="text-sm text-gray-400"> Developer</p>
//           <p className="text-gray-300 text-sm mt-1">
//             Tom spearheaded the compiler module, ensuring seamless integration.
//           </p>
//         </div>

//         {/* Member 2 */}
//         <div className="flex flex-col">
//           <h3 className="text-xl font-semibold text-gray-200">Hanoon Zameel</h3>
//           <p className="text-sm text-gray-400">UI/UX Designer</p>
//           <p className="text-gray-300 text-sm mt-1">
//             Hanoon crafted the intuitive user interface for coding exams.
//           </p>
//         </div>

//         {/* Member 3 */}
//         <div className="flex flex-col">
//           <h3 className="text-xl font-semibold text-gray-200">Amarnath</h3>
//           <p className="text-sm text-gray-400">Backend Engineer</p>
//           <p className="text-gray-300 text-sm mt-1">
//             Amarnath optimized the backend for standardized lab exams.
//           </p>
//         </div>

//         {/* Member 4 */}
//         <div className="flex flex-col">
//           <h3 className="text-xl font-semibold text-gray-200">
//             Swalih Edappal
//           </h3>
//           <p className="text-sm text-gray-400">DBMS Manager</p>
//           <p className="text-gray-300 text-sm mt-1">
//             Swalih Managed the postgress databaser
//           </p>
//         </div>
//       </motion.div>

//       {/* CTA Button and Stat */}
//       <motion.div
//         className="flex items-center gap-6"
//         variants={textVariants2}
//         transition={{delay: 0.6}}
//       >
//         <button
//           onClick={() => setChange(!change)}
//           className="bg-lime-400 text-black font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-lime-500 transition"
//         >
//           Back
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </button>
//         <p className="text-gray-400 flex items-center gap-2">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
//             />
//           </svg>
//           4 Team Members
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// }

const GitHubSVG = () => {
  return <>
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 0C8.38799 0.000111051 5.8613 0.953137 3.87196 2.68855C1.88263 4.42397 0.560477 6.82853 0.142076 9.47199C-0.276326 12.1154 0.236328 14.8253 1.58831 17.1167C2.94029 19.408 5.04337 21.1314 7.52125 21.9784C8.07124 22.0771 8.27749 21.7388 8.27749 21.4427C8.27749 21.1748 8.26373 20.2867 8.26373 19.3421C5.49999 19.8637 4.785 18.6514 4.565 18.017C4.32088 17.4 3.93391 16.8532 3.43751 16.4239C3.05251 16.2124 2.50251 15.6908 3.42375 15.6767C3.77551 15.7159 4.11289 15.8414 4.40729 16.0426C4.7017 16.2438 4.94446 16.5149 5.11499 16.8327C5.26544 17.1098 5.46774 17.3538 5.7103 17.5506C5.95286 17.7474 6.23091 17.8932 6.52852 17.9796C6.82613 18.0661 7.13745 18.0914 7.44464 18.0543C7.75184 18.0171 8.04886 17.9182 8.3187 17.7632C8.36632 17.1898 8.61554 16.6537 9.01997 16.2548C6.57248 15.9728 4.015 15 4.015 10.6861C3.99954 9.56525 4.40295 8.48077 5.14249 7.65512C4.80621 6.68093 4.84555 5.61183 5.25249 4.6664C5.25249 4.6664 6.1737 4.37033 8.27747 5.82241C10.0774 5.31486 11.9775 5.31486 13.7774 5.82241C15.8811 4.35624 16.8024 4.6664 16.8024 4.6664C17.2094 5.61182 17.2488 6.68094 16.9124 7.65512C17.6542 8.47936 18.0579 9.56479 18.0399 10.6861C18.0399 15.0141 15.4686 15.9728 13.0212 16.2548C13.2837 16.5276 13.4859 16.8551 13.614 17.2151C13.7421 17.5751 13.7932 17.9592 13.7637 18.3412C13.7637 19.8497 13.7499 21.0621 13.7499 21.4427C13.7499 21.7388 13.9562 22.0912 14.5062 21.9785C16.9797 21.1245 19.0767 19.3971 20.4229 17.1046C21.7692 14.8121 22.2769 12.1036 21.8556 9.46269C21.4343 6.82179 20.1114 4.42035 18.1229 2.68705C16.1345 0.953743 13.6099 0.00139275 11 0Z" fill="#C1C4C7"/>
  </svg>
</>
}