import Input from "./Input";
import { useEffect, useState } from "react";
import { useFormValidation } from "./ValidationHook";
import QuestionSelector from "./QuestionNumberSelector";
import ErrorBox from "./ErrorBox";
import QuestionSection from "./QuestionSection";
import TimeInput from "./TImeInput";
import LanguageSelect from "./LanguageSelect";
import { Movebutton } from "../Movebutton";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Popanim from "../animation/Popanim";
import { LoadingRingSmall } from "../animation/LoadingRingSmall";
import { motion } from "framer-motion";

const initialState = {
  examName: "",
  duration: "",
  subject: "",
  languages: ["java"],
  questions: [],
};

function About({classId, setCreateExam, setNewState}) {
  const [examDetails, setExamDetails] = useState(initialState);
  const [numQuestions, setNumQuestions] = useState(1);
  const [showQuestions, setShowQuestions] = useState(false);
  const [error, setError] = useState({});
  const { validateForm, isSubmitting, setIsSubmitting } = useFormValidation(initialState);
  function handleExamNameInput(e) {
    setExamDetails((prev) => ({ ...prev, examName: e.target.value }));
  }
  const handleLanguageCheck = (e) => {
    if (examDetails.languages.includes(e.target.name)) {
      if (examDetails.languages.length > 1) {
        setExamDetails((prev) => ({
          ...prev,
          languages: examDetails.languages.filter(
            (item) => item != e.target.name
          ),
        }));
      }
    } else {
      setExamDetails((prev) => ({
        ...prev,
        languages: [...examDetails.languages, e.target.name],
      }));
    }
  };
  function handleSubjectNameInput(e) {
    setExamDetails((prev) => ({ ...prev, subject: e.target.value }));
  }

  useEffect(() => {
    setExamDetails((prev) => ({
      ...prev,
      classId: classId
    }));
  }, [classId]);

  function handleCreateQuestions() {
    
    if (numQuestions > 0) {
      const newQuestions = Array.from({ length: numQuestions }, () => ({
        questionName: "",
        description: "",

        exampleCases: [],
        testCases: [],
        constraintCases: [],
      }));
      setExamDetails((prev) => ({ ...prev, questions: [...newQuestions] }));
      setShowQuestions(true);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errorObject = validateForm(examDetails);
    setIsSubmitting(true);
    if (Object.keys(errorObject).length === 0) {
      setError({});
    } else {
      setError(errorObject);
    }
    setIsSubmitting(false);
    
  }


  function handleDuration(hours, minutes, seconds) {
    setExamDetails((prev) => ({
      ...prev,
      duration: { hours, minutes, seconds },
    }));
  }


  const [createExamState, setCreateExamState] = useState('creating'); //possible state 'sucess' , 'duplicate' exam
  const [loading, setLoading] = useState(false);

 

  async function createExam() {
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:3000/createExam", examDetails, {
        headers: { "Content-Type": "application/json" },
      });
      
      //console.log(response.data); //recieving the exam id if success , if duplicate exam exist it returns the msg: duplicate exam
      if(response.data.msg == 'duplicate exam!') {
        setCreateExamState('duplicate');
      } else {
        setCreateExam(false);
      }
    } catch(error) {console.log(error);}
    finally {
      setLoading(false);
      setNewState((prev) => !prev);
    }
  }

  const submitVariants = {
    hover: {rotate: 180}
  }


  return (<>
    
    {<div className="overflow-y-scroll bg-black/50 backdrop-blur-[4px] absolute z-40 top-0 left-0 h-screen w-screen  px-[10px] box-border grid place-content-center">
    {loading && <LoadingRingSmall />}
    <motion.div initial={{opacity: 0.5}} animate={{opacity: 1}} className="outline outline-1 outline-[#3D3B3B] min-w-[80vw] rounded-sm max-h-[90vh] scroller overflow-y-scroll  p-[10px] bg-[#15161A] ">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <section className="bg-[#15161A] flex flex-col gap-4 md:gap-8 w-[100%] rounded-lg">
          <div className=" flex flex-col gap-3">
            <Input
              placeholder="Exam name"
              textValue={examDetails.examName}
              inputTitle={"Exam Name"}
              changeAction={handleExamNameInput}
              height={10}
            />
            <Input
              placeholder="Subject"
              textValue={examDetails.subject}
              inputTitle={"Subject"}
              changeAction={handleSubjectNameInput}
              height={10}
            />
            <div className="border-t-2 border-dashed  translate-y-[7px] border-gray-500 "></div>
            <LanguageSelect
              examDetails={examDetails}
              handleLanguageCheck={handleLanguageCheck}
            />
            <TimeInput handleDuration={handleDuration} />
            <div className="border-t-2 border-dashed border-gray-500 translate-y-[10px]"></div>
          </div>

          <QuestionSelector
            numValue={numQuestions}
            setNum={setNumQuestions}
            handleNum={handleCreateQuestions}
          />
          <div className="border-t-2 border-dashed  translate-y-[-4px] border-gray-500 "></div>

          {showQuestions
            ? Array.from({ length: examDetails.questions.length }, (_, i) => (
                <QuestionSection
                  key={i}
                  index={i}
                  examDetails={examDetails}
                  setExamDetails={setExamDetails}
                />
              ))
            : null}
          <div className="border-t-2 border-dashed  translate-y-[7px] border-gray-500 "></div>
          <div className="flex justify-start flex-row gap-2">
            
            {createExamState == 'duplicate'? <p className="text-red-400 translate-y-1 mr-2"></p>:null}
            
            <motion.button  disabled={isSubmitting} whileHover="hover" onClick={() => {createExam();}} className="flex py-1 flex-row items-center gap-2 bg-[#A8FF53] rounded-sm px-[18px]">
              submit
              <motion.svg transition={{duration: 0.001, ease: 'linear'}} variants={submitVariants} width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7261 5.94056L11.0594 0.273889C10.9724 0.188935 10.8698 0.121591 10.7572 0.0755555C10.6401 0.0279715 10.5153 0.0023593 10.3889 0H2.83333C2.08188 0 1.36122 0.298511 0.829863 0.829864C0.298511 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.298511 15.6388 0.829863 16.1701C1.36122 16.7015 2.08188 17 2.83333 17H14.1667C14.9181 17 15.6388 16.7015 16.1701 16.1701C16.7015 15.6388 17 14.9181 17 14.1667V6.61111C17.0007 6.48682 16.9769 6.3636 16.9299 6.24853C16.8829 6.13346 16.8136 6.0288 16.7261 5.94056ZM5.66666 1.88889H9.44444V3.77778H5.66666V1.88889ZM11.3333 15.1111H5.66666V12.2778C5.66666 12.0273 5.76616 11.7871 5.94328 11.61C6.1204 11.4328 6.36062 11.3333 6.6111 11.3333H10.3889C10.6394 11.3333 10.8796 11.4328 11.0567 11.61C11.2338 11.7871 11.3333 12.0273 11.3333 12.2778V15.1111ZM15.1111 14.1667C15.1111 14.4171 15.0116 14.6574 14.8345 14.8345C14.6574 15.0116 14.4171 15.1111 14.1667 15.1111H13.2222V12.2778C13.2222 11.5263 12.9237 10.8057 12.3923 10.2743C11.861 9.74295 11.1403 9.44444 10.3889 9.44444H6.6111C5.85966 9.44444 5.13899 9.74295 4.60764 10.2743C4.07628 10.8057 3.77777 11.5263 3.77777 12.2778V15.1111H2.83333C2.58285 15.1111 2.34263 15.0116 2.16551 14.8345C1.98839 14.6574 1.88889 14.4171 1.88889 14.1667V2.83333C1.88889 2.58285 1.98839 2.34263 2.16551 2.16551C2.34263 1.98839 2.58285 1.88889 2.83333 1.88889H3.77777V4.72222C3.77777 4.9727 3.87728 5.21293 4.0544 5.39004C4.23151 5.56716 4.47174 5.66667 4.72222 5.66667H10.3889C10.6394 5.66667 10.8796 5.56716 11.0567 5.39004C11.2338 5.21293 11.3333 4.9727 11.3333 4.72222V3.22056L15.1111 6.99833V14.1667Z" fill="black"/>
              </motion.svg>
            </motion.button>

            <motion.button whileHover="hover" onClick={() => {setCreateExam(false);}}  disabled={isSubmitting} className="flex py-1 flex-row items-center gap-2 bg-[#F43F5E] rounded-sm px-[18px]">
              cancel
              <motion.svg initial={{rotate: 0}} variants={submitVariants} transition={{duration: 0.3}} width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6087 21.4653C10.307 21.4677 9.01762 21.2128 7.81471 20.7154C6.61179 20.2179 5.51905 19.4876 4.59926 18.5665C0.733677 14.7009 0.733677 8.41157 4.59926 4.54598C5.51768 3.62241 6.61016 2.89016 7.81347 2.39163C9.01678 1.8931 10.307 1.63818 11.6095 1.64164C14.2577 1.64164 16.7472 2.67267 18.619 4.54598C20.4915 6.4185 21.5233 8.90805 21.5233 11.5562C21.5233 14.2044 20.4923 16.6939 18.619 18.5665C17.699 19.4876 16.6061 20.2179 15.4031 20.7153C14.2 21.2128 12.9105 21.4676 11.6087 21.4653ZM11.6095 3.22784C10.5154 3.22474 9.43148 3.43877 8.42064 3.85753C7.4098 4.2763 6.49211 4.89148 5.72071 5.66743C4.14799 7.24015 3.28192 9.33157 3.28192 11.5562C3.28192 13.7809 4.14799 15.8715 5.72071 17.445C8.96768 20.692 14.2513 20.6928 17.4975 17.445C19.0702 15.8723 19.9371 13.7809 19.9371 11.5562C19.9371 9.33157 19.071 7.24095 17.4975 5.66743C16.7261 4.89171 15.8085 4.27668 14.7978 3.85793C13.7872 3.43918 12.7035 3.22502 11.6095 3.22784Z" fill="black"/>
                <path d="M8.24426 15.714C8.08725 15.7144 7.93368 15.668 7.80304 15.581C7.6724 15.4939 7.57058 15.3699 7.5105 15.2249C7.45042 15.0798 7.43479 14.9202 7.4656 14.7662C7.49641 14.6123 7.57226 14.4709 7.68353 14.3602L14.413 7.6307C14.4866 7.55706 14.5741 7.49865 14.6703 7.4588C14.7665 7.41895 14.8696 7.39844 14.9737 7.39844C15.0779 7.39844 15.181 7.41895 15.2772 7.4588C15.3734 7.49865 15.4608 7.55706 15.5345 7.6307C15.6081 7.70433 15.6665 7.79175 15.7064 7.88796C15.7462 7.98417 15.7667 8.08729 15.7667 8.19142C15.7667 8.29556 15.7462 8.39867 15.7064 8.49488C15.6665 8.59109 15.6081 8.67851 15.5345 8.75215L8.80498 15.4816C8.73153 15.5555 8.64415 15.6141 8.5479 15.654C8.45165 15.6939 8.34845 15.7143 8.24426 15.714Z" fill="black"/>
                <path d="M14.9738 15.714C14.8696 15.7141 14.7664 15.6936 14.6702 15.6538C14.574 15.6139 14.4866 15.5554 14.413 15.4816L7.68355 8.75215C7.60992 8.67851 7.55151 8.59109 7.51166 8.49488C7.47181 8.39867 7.45129 8.29556 7.45129 8.19142C7.45129 8.08729 7.47181 7.98417 7.51166 7.88796C7.55151 7.79175 7.60992 7.70433 7.68355 7.6307C7.75719 7.55706 7.84461 7.49865 7.94082 7.4588C8.03702 7.41895 8.14014 7.39844 8.24428 7.39844C8.34841 7.39844 8.45153 7.41895 8.54774 7.4588C8.64395 7.49865 8.73137 7.55706 8.805 7.6307L15.5345 14.3602C15.6458 14.4709 15.7216 14.6123 15.7524 14.7662C15.7832 14.9202 15.7676 15.0798 15.7075 15.2249C15.6474 15.3699 15.5456 15.4939 15.415 15.581C15.2843 15.668 15.1308 15.7144 14.9738 15.714Z" fill="black"/>
              </motion.svg>
            </motion.button>

          </div>
        </section>

        <section>
          <ErrorBox errors={error} />
        </section>
      </form>
      
    </motion.div>
  </div>}
  </>
  );
}

export default About;

/*

  output format

  object
  name: examDetails
  
  examDetails = {
    examName: name of exam,
    subject: cst123 os,
    duration: {
      hours: 2,
      minutes: 10,
      seconds: don't care
    },
    languages: [java, c, etc..],
    questions: [
      {
        questionName: name,
        description: desc,
        constraintCases: [{input: 'constraint'}, {}],
        testCases: [
          {input: '1\netc.', output: '2'}, {}, etc...
        ]
      }
    
    ] - array of objects for each question
  }

*/

