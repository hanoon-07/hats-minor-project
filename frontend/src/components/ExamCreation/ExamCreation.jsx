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

const initialState = {
  examName: "",
  duration: "",
  subject: "",
  languages: ["java"],
  questions: [],
};

function About({classId, setCreateExam}) {
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
  }, [examDetails]);

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
    }
  }

 


  return (<>
    
    {<div className="overflow-y-scroll bg-black/50 backdrop-blur-[4px] absolute z-40 top-0 left-0 h-screen w-screen  px-[10px] box-border grid place-content-center">
    {loading && <LoadingRingSmall />}
    <div className="outline outline-1 outline-[#3D3B3B] min-w-[80vw] rounded-sm max-h-[90vh] scroller overflow-y-scroll  p-[10px] bg-[#15161A] ">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <section className="bg-[#15161A] flex flex-col gap-4 md:gap-8 w-[70%] rounded-lg">
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
            <LanguageSelect
              examDetails={examDetails}
              handleLanguageCheck={handleLanguageCheck}
            />
            <TimeInput handleDuration={handleDuration} />
          </div>

          <QuestionSelector
            numValue={numQuestions}
            setNum={setNumQuestions}
            handleNum={handleCreateQuestions}
          />

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
          <div className="flex justify-start gap-2">
            {createExamState == 'duplicate'? <p className="text-red-400 translate-y-1 mr-2"></p>:null}
            
            <button  disabled={isSubmitting} className="flex py-1 flex-row items-center gap-2 bg-[#F43F5E] rounded-sm px-[18px]">
              cancel
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7261 5.94056L11.0594 0.273889C10.9724 0.188935 10.8698 0.121591 10.7572 0.0755555C10.6401 0.0279715 10.5153 0.0023593 10.3889 0H2.83333C2.08188 0 1.36122 0.298511 0.829863 0.829864C0.298511 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.298511 15.6388 0.829863 16.1701C1.36122 16.7015 2.08188 17 2.83333 17H14.1667C14.9181 17 15.6388 16.7015 16.1701 16.1701C16.7015 15.6388 17 14.9181 17 14.1667V6.61111C17.0007 6.48682 16.9769 6.3636 16.9299 6.24853C16.8829 6.13346 16.8136 6.0288 16.7261 5.94056ZM5.66666 1.88889H9.44444V3.77778H5.66666V1.88889ZM11.3333 15.1111H5.66666V12.2778C5.66666 12.0273 5.76616 11.7871 5.94328 11.61C6.1204 11.4328 6.36062 11.3333 6.6111 11.3333H10.3889C10.6394 11.3333 10.8796 11.4328 11.0567 11.61C11.2338 11.7871 11.3333 12.0273 11.3333 12.2778V15.1111ZM15.1111 14.1667C15.1111 14.4171 15.0116 14.6574 14.8345 14.8345C14.6574 15.0116 14.4171 15.1111 14.1667 15.1111H13.2222V12.2778C13.2222 11.5263 12.9237 10.8057 12.3923 10.2743C11.861 9.74295 11.1403 9.44444 10.3889 9.44444H6.6111C5.85966 9.44444 5.13899 9.74295 4.60764 10.2743C4.07628 10.8057 3.77777 11.5263 3.77777 12.2778V15.1111H2.83333C2.58285 15.1111 2.34263 15.0116 2.16551 14.8345C1.98839 14.6574 1.88889 14.4171 1.88889 14.1667V2.83333C1.88889 2.58285 1.98839 2.34263 2.16551 2.16551C2.34263 1.98839 2.58285 1.88889 2.83333 1.88889H3.77777V4.72222C3.77777 4.9727 3.87728 5.21293 4.0544 5.39004C4.23151 5.56716 4.47174 5.66667 4.72222 5.66667H10.3889C10.6394 5.66667 10.8796 5.56716 11.0567 5.39004C11.2338 5.21293 11.3333 4.9727 11.3333 4.72222V3.22056L15.1111 6.99833V14.1667Z" fill="black"/>
              </svg>
            </button>

            <button  disabled={isSubmitting} onClick={() => {createExam();}} className="flex py-1 flex-row items-center gap-2 bg-[#A8FF53] rounded-sm px-[18px]">
              submit
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.7261 5.94056L11.0594 0.273889C10.9724 0.188935 10.8698 0.121591 10.7572 0.0755555C10.6401 0.0279715 10.5153 0.0023593 10.3889 0H2.83333C2.08188 0 1.36122 0.298511 0.829863 0.829864C0.298511 1.36122 0 2.08189 0 2.83333V14.1667C0 14.9181 0.298511 15.6388 0.829863 16.1701C1.36122 16.7015 2.08188 17 2.83333 17H14.1667C14.9181 17 15.6388 16.7015 16.1701 16.1701C16.7015 15.6388 17 14.9181 17 14.1667V6.61111C17.0007 6.48682 16.9769 6.3636 16.9299 6.24853C16.8829 6.13346 16.8136 6.0288 16.7261 5.94056ZM5.66666 1.88889H9.44444V3.77778H5.66666V1.88889ZM11.3333 15.1111H5.66666V12.2778C5.66666 12.0273 5.76616 11.7871 5.94328 11.61C6.1204 11.4328 6.36062 11.3333 6.6111 11.3333H10.3889C10.6394 11.3333 10.8796 11.4328 11.0567 11.61C11.2338 11.7871 11.3333 12.0273 11.3333 12.2778V15.1111ZM15.1111 14.1667C15.1111 14.4171 15.0116 14.6574 14.8345 14.8345C14.6574 15.0116 14.4171 15.1111 14.1667 15.1111H13.2222V12.2778C13.2222 11.5263 12.9237 10.8057 12.3923 10.2743C11.861 9.74295 11.1403 9.44444 10.3889 9.44444H6.6111C5.85966 9.44444 5.13899 9.74295 4.60764 10.2743C4.07628 10.8057 3.77777 11.5263 3.77777 12.2778V15.1111H2.83333C2.58285 15.1111 2.34263 15.0116 2.16551 14.8345C1.98839 14.6574 1.88889 14.4171 1.88889 14.1667V2.83333C1.88889 2.58285 1.98839 2.34263 2.16551 2.16551C2.34263 1.98839 2.58285 1.88889 2.83333 1.88889H3.77777V4.72222C3.77777 4.9727 3.87728 5.21293 4.0544 5.39004C4.23151 5.56716 4.47174 5.66667 4.72222 5.66667H10.3889C10.6394 5.66667 10.8796 5.56716 11.0567 5.39004C11.2338 5.21293 11.3333 4.9727 11.3333 4.72222V3.22056L15.1111 6.99833V14.1667Z" fill="black"/>
              </svg>
            </button>
          </div>
        </section>

        <section>
          <ErrorBox errors={error} />
        </section>
      </form>
      
    </div>
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

