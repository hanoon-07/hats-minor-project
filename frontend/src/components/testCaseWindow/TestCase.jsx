
import {useState} from "react";
import Button from "../Button";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectInputs, selectOutputs } from "../../redux/examSelector";

/* const cases = [
  {enemyEngines: "1 2 3", currentEnergy: "4", output: "7"},
  {enemyEngines: "3 4 5", currentEnergy: "9", output: "6"},
];
 */
function TestCase() {
  //cases format:array  of objects [{},{},{}]

  const [index, setIndex] = useState(0);

  const handleButtonClick = (i) => {
    setIndex(i);
  };

  const selected = useSelector((state) => state['exam-data'].selected);
  const testCases = useSelector(selectInputs);
  const outputs = useSelector(selectOutputs);

  return (
    <div className="px-1  pt-1 pb-1  overflow-y-scroll min-h-[40%] max-h-[90%]  scroller mb-4 h-full">
      
      <section className="flex flex-wrap gap-4 items-center">
        {testCases.map((item, i) => (
          <Button key={i} action={() => {handleButtonClick(i)}} label={`Case ${i+1}`} buttonClass={` text-textGray ${index == i?" border border-[#33E775]":""}`}/>
        ))}
      </section>

      <section className="mt-5 flex flex-col  text-sm gap-4">
        {testCases.map((item, i) => {
          //console.log(selected);
          if(i == selected) {
            
            return <div key={item}>
              <div
                  className=" flex flex-col p-4 gap-2 rounded-md bg-black"  
              >
                  <p className="text-textGray">{"input"}</p>
                  <p className="py-1 rounded-[4px] text-[#33E775] font-normal whitespace-pre-line">{testCases[index]}</p>
              </div>

              <div
                  className=" flex mt-3 flex-col p-4 gap-2 rounded-md bg-black "
                  >
                  <p className="text-textGray">{"output"}</p>
                  <p className="py-1 rounded-[4px] text-[#33E775] font-normal whitespace-pre-line">{outputs[index]}</p>
              </div>        
          </div>
          }

        })}
      </section>

    </div>
  );
}

export default TestCase;
