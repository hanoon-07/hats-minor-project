/* eslint-disable react/prop-types */
import Editor from "@monaco-editor/react";
import Dropdown from "../../components/Dropdown";
function ExamResultBox_2({questionData, queIndex, handleSetQuestion}) {
  // const languages = ["JavaScript", "Python", "TypeScript", "Java", "C++"];

  const queArray = questionData.map((data, index) => {
    return `Question - ${index + 1}`;
  });

  return (
    <section className="flex  flex-col gap-3  lg:self-end  ">
      <div className="self-end mb-2">
        <Dropdown
          initial="Question - 1"
          items={queArray}
          selected={queArray[0]}
          disabled={false}
          action={handleSetQuestion}
        />
      </div>
      <CodeDisplay code={questionData[queIndex].code} />
    </section>
  );
}

export default ExamResultBox_2;

function CodeDisplay({code}) {
  return (
    <div className="h-[415px] w-[100%] outline outline-[1px] outline-[#F43F5E] rounded-lg p-4 ">
      <Editor
        value={code}
        height="100%"
        theme="vs-dark"
        options={{
          fontSize: 17,
          suggestOnTriggerCharacters: false,
          quickSuggestions: false,
          parameterHints: {enabled: false},
          lineNumbersMinChars: 1,
        }}
      />
    </div>
  );
}
