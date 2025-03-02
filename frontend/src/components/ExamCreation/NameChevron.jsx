/* eslint-disable react/prop-types */
import Input from "./Input";
import {ChevronDown, ChevronUp} from "lucide-react";
function NameChevron({
  examDetails,
  handleQuestionName,
  showQuestion,
  setShowQuestion,
  index,
}) {
  return (
    <div className="relative">
      <Input
        placeholder={"Question Name"}
        textValue={examDetails.questions[index]?.questionName}
        inputTitle={`Question ${index + 1} `}
        changeAction={handleQuestionName}
        height={10}
      />
      {showQuestion ? (
        <ChevronUp
          className=" md:w-5 md:h-5  w-5 h-5 text-white absolute md:right-2 md:top-[20%] top-[5%] right-1"
          onClick={() => setShowQuestion(!showQuestion)}
        />
      ) : (
        <ChevronDown
          className=" md:w-5 md:h-5  w-5 h-5 text-white absolute md:right-2 md:top-[20%] top-[5%] right-1"
          onClick={() => setShowQuestion(!showQuestion)}
        />
      )}
    </div>
  );
}

export default NameChevron;
