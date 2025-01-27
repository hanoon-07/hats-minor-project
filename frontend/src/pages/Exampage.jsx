import React from "react";
import Examwindow from "../components/Examwindow";
import { useState, useEffect } from "react";
import { Clock, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import Button from "../components/Button";
import { initialize } from "../features/examwindow/examSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function Exampage({examId}) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  

  // const questionDetails = [
  //   {
  //     si: "question-1",
  //     title: "Bubble Sort",
  //     problemStatement:
  //       "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
  //     assumption: "you may take assumptions for granted",
  //     firstExample: "1 3 4 5 6 0",
  //     firstExampleAns: "0 1 3 4 5 6",
  //     secondExample: "1 3 4 5 6 0",
  //     secondExampleAns: "0 1 3 4 5 6",
  //     constraint1: " -100 <= num <= 100",
  //     constraint2: " -100 <= num <= 100",
  //     language: "C",
  //   },
  //   {
  //     si: "question-2",
  //     title: "Quick Sort",
  //     problemStatement:
  //       "Implement the Quick Sort algorithm to sort an array in ascending order.",
  //     assumption: "Array elements are integers",
  //     firstExample: "5 2 8 1 9",
  //     firstExampleAns: "1 2 5 8 9",
  //     secondExample: "3 7 2 1 4",
  //     secondExampleAns: "1 2 3 4 7",
  //     constraint1: " -100 <= num <= 100",
  //     constraint2: "Array length <= 1000",
  //     language: "java",
  //   },
  // ];

  // let languages = ["java", "python", "javascript", "c", "c++"];

  // const cases = [
  //   { input: ["1 2 3", "3 4 1", "2 8 3"], output: ["1 2 3", "3 4 1", "2 8 3"] },
  //   { input: ["1 2 3", "3 4 1", "2 8 3"], output: ["1 2 3", "3 4 1", "2 8 3"] },
  // ];

  useEffect(  () => {

    var data = null;
    async function getExamDetails() {
      const response = await axios.get("http://localhost:3000/exam?examId=1234");
      //console.log(response.data);
      data = response.data;

      const tempArr = [];
      data.questionDetails.map((item, index) => {
        // var questionTemp = item;
        var tempLang = data.languages;
        var codeArrTemp = [];
        data.languages.map((temp) => {
          codeArrTemp.push("//your code area");
        });
        var selected = 0;
        var testCases = data.cases[index];

        tempArr.push({
          questionDetails: item,
          languages: tempLang,
          codeValues: codeArrTemp,
          selected: selected,
          testCases: testCases,
          testResult: null,
        });
      });

      //reserved for intializing the redux state
      dispatch(
        initialize({ questionDetails: tempArr, selected: 0, proposedTime: 3 })
      );
      //console.log(data);
      setLoaded(true);  
    }

    getExamDetails();
    //successfull data fetching from backend
    //error is not handled, will do later
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const noOfQues = useSelector((state) => state["exam-data"].questions.length);
  const duration = useSelector((state) => state["exam-data"].proposedTime);

  const [timeStart, setTimeStart] = useState(false);

  if(!loaded) {
    return <div className="h-screen w-screen bg-slate-800 grid place-content-center">
      <h3>loading</h3>
    </div>
  }

  return (
    <>
      <div
        className={`font-inter h-screen px-4 bg-black pb-[10px] ${
          isOpen ? "blur-lg" : ""
        }`}
      >
        <Examwindow timeStart={timeStart}/>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="h-[350px] w-[450px] rounded-lg bg-darkGray shadow-xl p-4 pt-4">
            <div className="text-center text-white">
              <h1 className="text-2xl mb-2">Ready to begin your exam</h1>
              <p className="text-sm text-textGray">
                Please review the exam details below
              </p>
            </div>

            <div className="space-y-4 flex flex-col items-center w-full max-w-md mx-auto p-4">
              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 w-full p-3 rounded-lg hover:bg-gray-800/70 transition-colors">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-medium">{duration} hours</span>
              </div>

              <div className="flex items-center gap-3 text-gray-300 bg-gray-800/50 w-full p-3 rounded-lg hover:bg-gray-800/70 transition-colors">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="font-medium">
                  {noOfQues} numbers of question
                </span>
              </div>

              <div className="flex items-start gap-3 bg-amber-900/20 w-full p-2 rounded-lg border border-amber-500/20">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-300">
                  Once started, the exam cannot be paused. Ensure you have a
                  stable internet connection and sufficient time.
                </p>
              </div>

              <Button
                iconStyle={{ size: 14, className: " translate-y-0 " }}
                Icon={ArrowRight}
                label={"START"}
                disabled={false}
                buttonClass={
                  "text-textGray text-white bg-green-700 hover:shadow-xl"
                }
                action={() => {
                  setIsOpen(false), setTimeStart(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Exampage;
