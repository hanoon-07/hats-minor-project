import {color, motion, AnimatePresence} from "framer-motion";
import {Link} from "react-router-dom";
import {ChevronRight} from "lucide-react";
import {useState} from "react";
import RightCodeAnim from "./RightCodeAnim";
import {Github} from "lucide-react";
import {useNavigate} from "react-router-dom";
const dotVariants = {
  hidden: {scale: 1},
  visible: {
    scale: 1.1,
    filter: "blur(2px)",
    transition: {
      duration: 8,
      ease: "easeInOut",
      staggerChildren: 0.01,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

function Landing() {
  return (
    <div className="w-screen min-h-screen overflow-hidden relative px-4 py-2">
      <motion.div
        variants={dotVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-10  overflow-hidden absolute z-0"
      >
        {Array.from({length: 1100}).map((_, index) => {
          return (
            <motion.div
              key={index}
              className="w-[2px] h-[2px] rounded-md bg-gray-500 "
            />
          );
        })}
      </motion.div>
      <div className="flex flex-col gap-10  place-items-center ">
        <Header />
        <MainContainer />
      </div>
    </div>
  );
}

export default Landing;

const Header = () => {
  const navigate = useNavigate();
  const buttonVariants = {
    initial: {opacity: 0, x: 20},
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#90E446",
    },
  };

  return (
    <motion.header
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="relative z-10 flex justify-between items-center p-4 w-screen pr-8 bg-black/30"
    >
      <div className="flex items-center gap-8">
        <motion.h2
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5}}
          className="text-2xl font-semibold text-[#A8FF53] orbitron-font-only"
        >
          CODEFLOW
        </motion.h2>

        {/*  <nav className="flex items-center gap-4">
          <motion.div
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link
              to="/docs"
              className="text-gray-300 hover:text-[#A8FF53] transition-colors"
            >
              Docs
            </Link>
          </motion.div>

          <motion.div
            variants={navItemVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <Link
              to="/how-it-works"
              className="text-gray-300 hover:text-[#A8FF53] transition-colors"
            >
              How it works
            </Link>
          </motion.div>
        </nav> */}
      </div>

      <motion.button
        variants={buttonVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        type="button"
        onClick={() => navigate("/login")}
        className="pl-3 pr-1 py-[5px] flex gap-1 text-sm md:text-base items-center  text-gray-700 font-semibold rounded-sm bg-lime-400 hover:bg-[#90E446] transition-colors"
      >
        Get Started <ChevronRight />
      </motion.button>
    </motion.header>
  );
};

const MainContainer = () => {
  return (
    <main className="max-w-[130rem]  lg:min-w-[1600px]   max-[1400px]:flex-col    max-[1400px]:gap-8 min-h-[80%]  relative z-10 mt-5 justify-center flex items-center  md:px-10  ">
      <LeftSide />

      <RightCodeAnim />
    </main>
  );
};

// Variants for text animations///////////////////////////////

const textVariants = {
  hidden: {opacity: 0, y: 10},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeIn",
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

function LeftSide() {
  const [change, setChange] = useState(true);

  return (
    <motion.div className=" md:p-[10px] min-w-[40%] mb-5 ">
      <AnimatePresence mode="wait">
        {change ? (
          <motion.div
            variants={textVariants}
            key="main-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" bg-black/20 text-white flex flex-col items-start justify-center p-8 "
          >
            <motion.p
              className="text-sm text-gray-400 mb-4 flex items-center gap-2"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <JavaSvg />
              Now with Java support
            </motion.p>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-300 tracking-wide "
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{delay: 0.2}}
            >
              Coding Exams
              <br />& AI Analysis
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{delay: 0.4}}
            >
              Standardized Lab Exams, Accurate output Validation
            </motion.p>

            <motion.div
              className="flex items-center gap-6"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{delay: 0.6}}
            >
              <button
                onClick={() => setChange(!change)}
                className="bg-lime-400 text-sm  md:text-base px-2 text-black font-semibold py-1 md:py-3 md:px-6 rounded-lg flex items-center gap-2 hover:bg-lime-500 transition"
              >
                Meet the Team
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <a
                href="https://github.com/hanoon-07/hats-minor-project.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 flex items-center gap-2 hover:text-gray-300 transition cursor-pointer"
              >
                <Github size={20} />
                Github
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <TeamMembers change={change} setChange={setChange} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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

function TeamMembers({change, setChange}) {
  return (
    <motion.div
      key={"team-members"}
      variants={textVariants2}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-black/20 text-white flex flex-col items-start justify-center p-8"
    >
      <motion.p
        className="text-sm text-gray-400 mb-4 flex items-center gap-2"
        variants={textVariants2}
        initial="hidden"
        animate="visible"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Meet the Team
      </motion.p>

      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-6 text-gray-300 tracking-wide"
        variants={textVariants2}
        initial="hidden"
        animate="visible"
        transition={{delay: 0.2}}
      >
        Our Team
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        variants={textVariants2}
        initial="hidden"
        animate="visible"
        transition={{delay: 0.4}}
      >
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-200">Tom Sebastian</h3>
          <p className="text-sm text-gray-400"> Developer</p>
          <p className="text-gray-300 text-sm mt-1">
            Tom spearheaded the compiler module, ensuring seamless integration.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-200">Hanoon Zameel</h3>
          <p className="text-sm text-gray-400">UI/UX Designer</p>
          <p className="text-gray-300 text-sm mt-1">
            Hanoon crafted the intuitive user interface for coding exams.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-200">Amarnath</h3>
          <p className="text-sm text-gray-400">Backend Engineer</p>
          <p className="text-gray-300 text-sm mt-1">
            Amarnath optimized the backend for standardized lab exams.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-200">
            Swalih Edappal
          </h3>
          <p className="text-sm text-gray-400">DBMS Manager</p>
          <p className="text-gray-300 text-sm mt-1">
            Swalih Managed the postgress databaser
          </p>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center gap-6"
        variants={textVariants2}
        transition={{delay: 0.6}}
      >
        <button
          onClick={() => setChange(!change)}
          className="bg-lime-400 text-black font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-lime-500 transition"
        >
          Back
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <p className="text-gray-400 flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
          4 Team Members
        </p>
      </motion.div>
    </motion.div>
  );
}
