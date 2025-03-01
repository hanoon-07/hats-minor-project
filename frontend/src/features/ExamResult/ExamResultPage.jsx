import ExamResultBox_1 from "./ExamResultBox_1";
import ExamResultBox_2 from "./ExamResultBox_2";
import ExamResultBox_3 from "./ExamResultBox_3";
import {ChevronLeft} from "lucide-react";
import Button from "../../components/Button";
function ExamResultPage({examResponse}) {
  examResponse = {
    name: "Sample Test",
    timelapsed: 30,
    questionData: [
      {
        code: "print(5+3)",
        input: "",
        output: "8",
        expectedOutput: "8",
        numberOfCompletedTestCases: 1,
      },
      {
        code: "print('Hello, World!')",
        input: "",
        output: "Hello, World!",
        expectedOutput: "Hello, World!",
        numberOfCompletedTestCases: 2,
      },
    ],
  };

  return (
    <section className="bg-[#1E1E1E] min-h-screen text-white p-5 px-8 pb-5 ">
      <div className="flex items-center gap-3">
        <Button
          iconStyle={{size: 14, className: " translate-y-0 "}}
          Icon={ChevronLeft}
          label={"START"}
          disabled={false}
          buttonClass={" text-black bg-[#A8FF53] hover:shadow-xl"}
          action={() => {}}
        />
        <p className="flex">
          <span className="text-[#A8FF53] ">TEST CLASS </span>- EXAM NAME
        </p>
      </div>
      <main className="max-w-[110rem] mx-auto">
        <div className="lg:grid flex flex-col    lg:grid-cols-[30%_65%] justify-between ">
          <ExamResultBox_1 />

          <ExamResultBox_2 code={"faefawefcawea"} />
        </div>
        <ExamResultBox_3 />
      </main>
    </section>
  );
}

export default ExamResultPage;
