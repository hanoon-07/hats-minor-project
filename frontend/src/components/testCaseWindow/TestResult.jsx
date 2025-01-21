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

import { useState } from "react";

function TestResult({results, expectedResults}) {
  return (
    <div className=" ml-3 pr-8 mt-1  max-h-[250px] overflow-y-scroll  scroller">
      <main className=" flex flex-col gap-5 mb-6">
        {results? (results.stdErr.length >= 200?(
          results.stdOut.map((item) => {
            const expect_item_result = expectedResults.find(
              (thing) => thing.caseId === item.caseId
            ).result;

            const [clicked, setClicked] = useState(false);

            return (
              <section onClick={() => {setClicked(!clicked)}}
                key={item.caseId}
                className={`py-3 px-2 text-sm hover:opacity-70 bg-secondaryGray outline outline-1 outline-darkGray shadow-md rounded-[4px] flex flex-col gap-4 relative`}
              >
                <Tag expect_item_result={expect_item_result} item={item} />
                <span
                  className={`bg-buttonGray shadow-md font-semibold px-2 py-1 rounded-[4px] w-fit  text-white`}
                >
                  <p>Case {item.caseId}</p>
                </span>
                
                {clicked && <div className={`bg-primaryDark p-2 rounded-[4px] min-h-[4rem] text-sm ${expect_item_result == item.result ? 'text-textGreen': 'text-textRed'}`}>
                  <p className="font-md">{item.result}</p>
                </div>}
              </section>
            );
          })
        ): <p className="text-textRed ">
          Oops something went wrong! check output tab
        </p>) : (
          <RunTheCode />
        )}
      </main>
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
      <p className="font-semibold">{result ? "passed" : "failed"}</p>
    </div>
  );
}

export default TestResult;
