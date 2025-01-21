
import {useState} from "react";
import Button from "../Button";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

/* const cases = [
  {enemyEngines: "1 2 3", currentEnergy: "4", output: "7"},
  {enemyEngines: "3 4 5", currentEnergy: "9", output: "6"},
];
 */
function TestCase({testCases}) {
  //cases format:array  of objects [{},{},{}]

  const [index, setIndex] = useState(0);

  const handleButtonClick = (i) => {
    setIndex(i);
  };

  const selected = useSelector((state) => state['exam-data'].selected);

  return (
    <div className="pl-[min(25px,2vw)]  pt-2 pb-4  overflow-y-scroll  scroller mb-4">
      
      <section className="flex flex-wrap gap-4">
        {testCases[0].input.map((item, i) => (
          <Button key={i} action={() => {handleButtonClick(i)}} label={`Case ${i+1}`} buttonClass={`bg-buttonGray text-white ${index == i?"outline outline-1 outline-textGreen":""}`}/>
        ))}
      </section>

      <section className="mt-5 flex flex-col  text-sm gap-4">
        {testCases.map((item, i) => {
          //console.log(selected);
          if(i == selected) {
            
            return <div key={item}>
              <div
                  className=" flex flex-col gap-2 text-slate-300   w-[90%]"
                
              >
                  <p className="text-textGray">{"input ="}</p>
                  <p className="bg-secondaryGray py-1 px-5 rounded-[4px] text-white font-bold">{item.input[index]}</p>
              </div>

              <div
                  className=" flex flex-col gap-2 text-slate-300   w-[90%]"
                  >
                  <p className="text-textGray">{"output ="}</p>
                  <p className="bg-secondaryGray py-1 px-5 rounded-[4px] text-white font-bold">{item.output[index]}</p>
              </div>        
          </div>
          }

        })}
      </section>

    </div>
  );
}

export default TestCase;
