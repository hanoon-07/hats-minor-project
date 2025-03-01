/* eslint-disable react/prop-types */
import ExamResultBox_1 from "./ExamResultBox_1";
import ExamResultBox_2 from "./ExamResultBox_2";
import {useState} from "react";
import ExamResultBox_3 from "./ExamResultBox_3";
import {ChevronLeft} from "lucide-react";
import Button from "../../components/Button";
function ExamResultPage({examResponse}) {
  const [queIndex, setQueIndex] = useState(0);
  examResponse = {
    studentName: "Hanoon Z",
    className: "CSE 2022",
    examName: "Python Test",
    timelapsed: 30, //in minutes
    mark: 10,
    partial: 23,
    questionData: [
      {
        code: "print(5+3) the alrfae\n faewe ",
        inputs: ["5\n6\n7", "5\n6\n7", "5\n6\n7", "5\n6\n7"],
        outputs: ["1\n4\n5\n", "1\n4\n5\n", "1\n4\n5\n"],
        expectedOutputs: [5, 6, 6],

        correctTestCases: 5,
        totalTestCases: 5,
      },
      {
        code: "print(5+3feafe)",
        inputs: ["1\n4\n5\n", "1\n4\n5\n", "1\n4\n5\n"],
        outputs: ["1\n4\n5\n", "1\n4\n5\n", "1\n4\n5\n"],
        expectedOutputs: [5, 1, 5],

        correctTestCases: 2,
        totalTestCases: 6,
      },
    ],
  };
  function handleNavigationBack() {}
  function handleSetQuestion(index) {
    setQueIndex(index);
  }
  return (
    <section className="bg-[#1E1E1E] min-h-screen text-white p-5 px-8 pb-5 ">
      <div className="flex items-center gap-5">
        <Button
          iconStyle={{size: 14, className: " translate-y-0 "}}
          Icon={ChevronLeft}
          label={"Return"}
          disabled={false}
          buttonClass={" text-black bg-[#A8FF53] hover:shadow-xl"}
          action={() => handleNavigationBack()}
        />
        <p className="flex">
          <span className="text-[#A8FF53] ">{examResponse.className} </span>-{" "}
          {examResponse.examName}
        </p>
      </div>
      <main className="max-w-[110rem] mx-auto">
        <div className="lg:grid flex flex-col  gap-5  lg:grid-cols-[30%_65%] justify-between ">
          <ExamResultBox_1 examResponse={examResponse} />

          <ExamResultBox_2
            questionData={examResponse.questionData}
            queIndex={queIndex}
            handleSetQuestion={handleSetQuestion}
          />
        </div>
        <ExamResultBox_3
          queIndex={queIndex}
          questionData={examResponse.questionData}
        />
      </main>
    </section>
  );
}

export default ExamResultPage;
