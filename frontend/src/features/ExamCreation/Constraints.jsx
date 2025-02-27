import Textarea from "./Textarea";
import QuestionSelector from "./QuestionNumberSelector";
import {ChevronDown, ChevronUp} from "lucide-react";

import {useState} from "react";
import DropDown from "./DropDown";
function Constraints({setNum, num, handleCreate, minValue}) {
  const [accordianOpen, setAccordianOpen] = useState(false);
  return (
    <div className="flex items-center justify-between cursor-pointer">
      <QuestionSelector
        numValue={num}
        title={`Number of Constraints`}
        setNum={setNum}
        handleNum={handleCreate}
        minValue={minValue}
      />
      {accordianOpen ? (
        <ChevronUp
          className=" md:w-8 md:h-8  w-2 h-2   text-gray-300 "
          onClick={() => setAccordianOpen(!accordianOpen)}
        />
      ) : (
        <ChevronDown
          className=" w-8 h-8 text-gray-300 "
          onClick={() => setAccordianOpen(!accordianOpen)}
        />
      )}
      <DropDown></DropDown>
    </div>
  );
}

export default Constraints;
