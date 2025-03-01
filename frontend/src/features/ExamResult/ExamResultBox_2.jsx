/* eslint-disable react/prop-types */
import Editor from "@monaco-editor/react";
import Dropdown from "../../components/Dropdown";
function ExamResultBox_2({code}) {
  const languages = ["JavaScript", "Python", "TypeScript", "Java", "C++"];
  const handleLanguageSelect = (index) => {
    console.log(`Selected language: ${languages[index]} at index ${index}`);
  };
  return (
    <section className="flex  flex-col gap-3  lg:self-end  ">
      <div className="self-end mb-2">
        <Dropdown
          initial="Question - 1"
          items={languages}
          selected={languages[0]}
          disabled={false}
          action={handleLanguageSelect}
        />
      </div>
      <CodeDisplay code={"faef"} />
    </section>
  );
}

export default ExamResultBox_2;

function CodeDisplay({code, setCode}) {
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
        onChange={(value) => setCode && setCode(value)}
      />
    </div>
  );
}
