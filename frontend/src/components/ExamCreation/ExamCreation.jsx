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

const initialState = {
  examName: "",
  duration: "",
  subject: "",
  languages: ["java"],
  questions: [],
};

function About() {
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
    console.log(examDetails);
  }, [examDetails]);
  function handleCreateQuestions() {
    console.log("wow");
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
    console.log(errorObject);
  }


  function handleDuration(hours, minutes, seconds) {
    setExamDetails((prev) => ({
      ...prev,
      duration: { hours, minutes, seconds },
    }));
  }


  const [createExamState, setCreateExamState] = useState('creating'); //possible state 'sucess' , 'duplicate' exam
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function createExam() {

    //backend api call to check whether the exam already exists or not,
    //if not create exam, if already exist edit it,
    //after succesfully editing or creating exam return to the main menu,
    

    try {
      const response = await axios.post("http://localhost:3000/createExam", examDetails, {
        headers: { "Content-Type": "application/json" },
      });
  
      setLoading(false);
      //console.log(response.data); //recieving the exam id if success , if duplicate exam exist it returns the msg: duplicate exam
      if(response.data.msg == 'duplicate exam!') {
        setCreateExamState('duplicate');
        sessionStorage.setItem('errorMsg', 'exam already exists!');
        navigate('/');
      } else {
        navigate('/');
      }
    } catch(error) {console.log(error);}
  }

  const {classRoom} = useParams();

  if(loading) {
    return <>
      <Popanim message={'creating exam...'}/>
    </>
  }

  return (<>
    
    {<div className="h-screen w-screen md:px-[100px] px-[20px] py-[40px] box-border">
    <div className="mb-[20px] flex flex-row justify-between w-full">
      <h2 className="text-white text-2xl font-semibold"><span className="text-[#BEFF7F]">{classRoom}</span> - create exam</h2>
      <Movebutton action={() => {sessionStorage.setItem('errorMsg', 'exam creation cancelled!'); navigate('/');}} direction={'left'} label={'cancel'} extraStyleDiv={' max-w-[130px]'}></Movebutton>
    </div>
    <div className="outline outline-1 outline-[#5F5D5D] rounded-md min-h-[80%] p-[20px] bg-black ">
      <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col">
        <section className="bg-black flex flex-col gap-4 md:gap-8 w-[70%] rounded-lg">
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
          <div className="flex justify-start">
            {createExamState == 'duplicate'? <p className="text-red-400 translate-y-1 mr-2"></p>:null}
            <Movebutton action={() => {setLoading(true); createExam();}} direction={'right'} label={'submit'} disabled={isSubmitting} extraStyleDiv={' max-w-[120px]'}/>
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

