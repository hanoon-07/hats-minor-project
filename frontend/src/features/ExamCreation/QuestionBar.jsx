/* eslint-disable react/prop-types */
import {useState} from "react";

import Textarea from "./Textarea";
import DropDown from "./DropDown";
import NameChevron from "./NameChevron";
import IOSection from "./IOsection";
import Constraints from "./Constraints";

function QuestionBar({index, examDetails, setExamDetails}) {
  const [numExamples, setNumExamples] = useState(1);
  const [numTestCases, setNumTestCases] = useState(5);
  const [numConstraints, setNumConstraints] = useState(2);

  const [showConstraints, setShowConstraints] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const [showTestCases, setShowTestCases] = useState(false);

  const [showQuestion, setShowQuestion] = useState(false);

  function handleQuestionName(e) {
    setExamDetails((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index].questionName = e.target.value;
      return {...prev, questions: newQuestions};
    });
  }

  function handleQuestionDescription(e) {
    setExamDetails((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index].description = e.target.value;
      return {...prev, questions: newQuestions};
    });
  }

  function handleAllInputs(exampleIndex, e, type, caseType) {
    setExamDetails((prev) => {
      const newQuestions = [...prev.questions];
      newQuestions[index][`${caseType}Cases`][exampleIndex][type] =
        e.target.value;
      return {...prev, questions: newQuestions};
    });
  }

  function handleCreateExamples() {
    const newExamples = Array.from({length: numExamples}, () => ({
      input: "",
      output: "",
    }));

    const newQuestions = [...examDetails.questions];
    newQuestions[index].exampleCases = newExamples.map(() => ({
      input: "",
      output: "",
    }));

    setExamDetails((prev) => ({...prev, questions: [...newQuestions]}));
    setShowExamples(true);
  }

  function handleCreateTestCases() {
    const newExamples = Array.from({length: numTestCases}, () => ({
      input: "",
      output: "",
    }));
    const newQuestions = [...examDetails.questions];

    newQuestions[index].testCases = newExamples;
    console.log(newQuestions);
    setExamDetails((prev) => ({...prev, questions: [...newQuestions]}));
    setShowTestCases(true);
  }
  function handleCreateConstraints() {
    const newConstraints = Array.from({length: numConstraints}, () => ({
      input: "",
    }));
    const newQuestions = [...examDetails.questions];
    newQuestions[index].constraintCases = newConstraints;
    setExamDetails((prev) => ({...prev, questions: [...newQuestions]}));
    setShowConstraints(true);
  }

  return (
    <section className=" p-3 relative border border-slate-600 flex flex-col gap-4 rounded-lg">
      <NameChevron
        examDetails={examDetails}
        setShowQuestion={setShowQuestion}
        handleQuestionName={handleQuestionName}
        showQuestion={showQuestion}
        index={index}
      />
      {/* Question description */}
      <DropDown show={showQuestion}>
        <Textarea
          placeholder={"Question Description"}
          textValue={examDetails.questions[index]?.description}
          inputTitle={"Description"}
          changeAction={handleQuestionDescription}
        />
        {/* Example section */}
        <IOSection
          num={numExamples}
          setNum={setNumExamples}
          examDetails={examDetails}
          handleCreate={handleCreateExamples}
          action={handleAllInputs}
          show={showExamples}
          index={index}
          caseType={"example"}
          minValue={1}
        />
        {/* Test Cases Section  🎈🎈*/}
        <IOSection
          num={numTestCases}
          setNum={setNumTestCases}
          examDetails={examDetails}
          handleCreate={handleCreateTestCases}
          action={handleAllInputs}
          show={showTestCases}
          index={index}
          caseType={"test"}
          minValue={5}
        />
        {/* Constraint of the question  below 🎈🎈🎈 */}
        <IOSection
          num={numConstraints}
          setNum={setNumConstraints}
          examDetails={examDetails}
          handleCreate={handleCreateConstraints}
          action={handleAllInputs}
          show={showConstraints}
          index={index}
          caseType={"constraint"}
          minValue={2}
        />
      </DropDown>
    </section>
  );
}

export default QuestionBar;
