/* eslint-disable react/prop-types */
import QuestionSelector from "./QuestionNumberSelector";

import {useEffect, useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import QuestionDataEntry from "./QuestionDataEntry";
import DropDown from "./DropDown";

function IOSection({
  num,
  setNum,
  examDetails,
  handleCreate,
  action,
  index,
  show,
  caseType,
  minValue,
}) {
  const [exampleAccordionOpen, setExampleAccordionOpen] = useState(false);
  useEffect(() => {
    setExampleAccordionOpen(true);
  }, [show]);
  return (
    <div className=" rounded p-3 mt-3 border border-slate-800">
      <div className="flex items-center justify-between cursor-pointer realtive">
        <QuestionSelector
          numValue={num}
          title={`Number of ${caseType}s`}
          setNum={setNum}
          handleNum={handleCreate}
          minValue={minValue}
        />
        {exampleAccordionOpen ? (
          <ChevronUp
            className=" w-5 h-5   text-white absolute right-8 md:right-5 "
            onClick={() => setExampleAccordionOpen(!exampleAccordionOpen)}
          />
        ) : (
          <ChevronDown
            className=" w-8 h-8 text-gray-300 absolute right-8 md:right-5"
            onClick={() => setExampleAccordionOpen(!exampleAccordionOpen)}
          />
        )}
      </div>
      <DropDown open={exampleAccordionOpen} show={show}>
        {examDetails.questions[index][`${caseType}Cases`].map((item, i) => (
          <QuestionDataEntry
            key={i}
            queIndex={index}
            ExampleIndex={i}
            examDetails={examDetails}
            handleQuestionExamples={action}
            caseType={caseType}
          />
        ))}
      </DropDown>
    </div>
  );
}

export default IOSection;
