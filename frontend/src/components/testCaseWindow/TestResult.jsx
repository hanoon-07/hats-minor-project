/* eslint-disable react/prop-types */
/* const result = [
  {caseId: 1, result: "true"},
  {caseId: 2, result: "null"},
  {caseId: 3, result: "null"},
];

//{caseId: 1, result: "true"},
//{caseId: 2, result: "compiler error 😼😼😼"},
//{caseId: 3, result: "Correct result 🫂🫂🫂"},
const expectedResult = [
  {caseId: 1, result: "true"},
  {caseId: 2, result: "null"},
  {caseId: 3, result: "null"},
]; */

import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectInputs, selectOutputs, selectResult } from "../../redux/examSelector";

function TestResult() {
  
  const results = useSelector(selectResult);
  const outputs = useSelector(selectOutputs);
  const inputs = useSelector(selectInputs);

  const errorOccured = useCallback(() => {
    if(!results) return -1;
      for(let i = 0;i < results.stdErr.length;i++) {
        if(results.stdErr[i] != null) return i;
      }

      let flag = 0;
      for(let i = 0;i < results.stdOut.length;i++) {
        if(results.stdOut[i] != null) {flag++;break;}
      }
      if(flag == 0) return 0;
      return -1;
  }, [results]);

  function getItem(item, index) {
    if(item == null) return null;
    return <div className=" bg-black items-center justify-evenly rounded-md p-3 w-full flex flex-row">
      <div>
        <p className={`${item.trim() == outputs[index]?"text-textGreen": "text-red-500"} font-normal`}>case {index+1}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-white">expected</p>
        <p className="text-textGray">{outputs[index]}</p>
      </div>
      <div className="flex flex-col">
        <p className={`${item.trim() == outputs[index]? "text-textGreen": "text-red-500"} w-[100px] font-normal`}>output</p>
        <p className={`${item.trim() == outputs[index]? "text-textGreen": "text-red-500"} w-[100px] font-normal`}>{results.stdOut[index]}</p>
      </div>
      
    </div>
  }

  if(results == null) {
    return <RunTheCode />
  }


  if(errorOccured() != -1) {
    return <div className="bg-black p-1 rounded-md h-full grid place-content-center">
      <p className="text-center px-3 text-red-500">Something went wrong! check output tab</p>
    </div>
  }



  return (
    <div className="pb-10 flex flex-col gap-2 max-h-full overflow-y-scroll min-h-[90%]  p-3 rounded-md">
      {results.stdOut.map(getItem)}
    </div>
  );
}

function RunTheCode() {
  return (
    <div className=" text-center relative">
      <p className="text-gray-300">Run the Code to Obtain Results</p>
      <span className="w-[40%] h-[1px] left-[30%] bg-red-600 absolute "> </span>
    </div>
  );
}
function Tag({expect_item_result, item}) {
  const result = expect_item_result == item.result;

  return (
    <div
      className={`absolute top-3 right-6 text-sm bg-secondaryGray px-2 py-1 rounded-[4px] ${
        !result ? "text-textRed" : "text-textGreen"
      } `}
    >
      <p className="font-normal">{result ? "passed" : "failed"}</p>
    </div>
  );
}

export default TestResult;
