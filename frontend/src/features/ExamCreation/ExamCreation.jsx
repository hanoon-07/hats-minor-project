import Input from "./Input";
import {useEffect, useState} from "react";
import {useFormValidation} from "./ValidationHook";
import QuestionSelector from "./QuestionNumberSelector";
import ErrorBox from "./ErrorBox";
import QuestionSection from "./QuestionBar";
import TimeInput from "./TImeInput";
const initialState = {
  examName: "",
  duration: "",
  subject: "",
  languages: ["java"],

  questions: [],
};

import LanguageSelect from "./LanguageSelect";
function About() {
  const [examDetails, setExamDetails] = useState(initialState);
  const [numQuestions, setNumQuestions] = useState(1);
  const [showQuestions, setShowQuestions] = useState(false);
  const [error, setError] = useState({});
  const {validateForm, isSubmitting, setIsSubmitting} =
    useFormValidation(initialState);
  function handleExamNameInput(e) {
    setExamDetails((prev) => ({...prev, examName: e.target.value}));
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
    setExamDetails((prev) => ({...prev, subject: e.target.value}));
  }
  useEffect(() => {
    console.log(examDetails);
  }, [examDetails]);
  function handleCreateQuestions() {
    console.log("wow");
    if (numQuestions > 0) {
      const newQuestions = Array.from({length: numQuestions}, () => ({
        questionName: "",
        description: "",

        exampleCases: [],
        testCases: [],
        constraintCases: [],
      }));
      setExamDetails((prev) => ({...prev, questions: [...newQuestions]}));
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
    setExamDetails((prev) => ({...prev, duration: {hours, minutes, seconds}}));
  }
  return (
    <div className="px-3 md:px-4 pt-4 w-screen   min-h-screen bg-black ">
      <form onSubmit={handleSubmit}>
        <section className="bg-black flex flex-col gap-4 md:gap-8  rounded-lg">
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
            ? Array.from({length: examDetails.questions.length}, (_, i) => (
                <QuestionSection
                  key={i}
                  index={i}
                  examDetails={examDetails}
                  setExamDetails={setExamDetails}
                />
              ))
            : null}
          <div className="flex justify-end">
            <button
              className="bg-darkGray hover:bg-gray-600  rounded-lg w-[120px] transition delay-100 text-textGray h-10"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </section>
      </form>
      <ErrorBox errors={error} />
    </div>
  );
}

export default About;
