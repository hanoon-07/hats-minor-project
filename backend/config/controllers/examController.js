import { getExamDetails, getHeaders, storeExam } from "../models/examModel.js";

// let languages = ["java", "python", "javascript", "c", "c++"];
// const cases = [
//     { input: ["3\n1 2 3", "2\n4 8", "1\n 7"], output: ["2", "6", "7"] },
//     { input: ["1 4 5 2", "3 2", "1 2 3 4 5"], output: ["1 2 4 5", "2 3", "1 2 3 4 5"] },
// ];



// const questionDetails = [
//     {
//       si: "question-1",
//       title: "Average",
//       problemStatement:
//         "First line of input is an integer(n), second line n no of integers(num), find the average of the n integers",
//       assumption: " ",
//       firstExample: "3\n1 4 6",
//       firstExampleAns: "3",
//       secondExample: "1\n4",
//       secondExampleAns: "4",
//       constraint1: "1 <= n <= 5",
//       constraint2: "0 <= num[i] <= 9",
//       language: "C",
//     },
//     {
//       si: "question-2",
//       title: "Quick Sort",
//       problemStatement:
//         "Implement the Quick Sort algorithm to sort an array in ascending order.",
//       assumption: "Array elements are integers",
//       firstExample: "5 2 8 1 9",
//       firstExampleAns: "1 2 5 8 9",
//       secondExample: "3 7 2 1 4",
//       secondExampleAns: "1 2 3 4 7",
//       constraint1: " -100 <= num <= 100",
//       constraint2: "Array length <= 1000",
//       language: "java",
//     },
// ];


export const createExam = async (req, res) => {
  try {
    const examDetails = req.body;
    //console.log("data recieved: "+examDetails.classId);
    const result = await storeExam(examDetails , examDetails.classId);
    //console.log(result);
    res.json(result);
  } catch(error) {
    console.log(error);
  }
} 

export const getExam = async (req, res) => {
    const examId = req.query.examId;  // need to fetch the data from backend using this examid
    const examDetails = await getExamDetails(examId);
    if(examDetails.msg) {
      res.json({msg: examDetails.msg});
      return;
    }

    var tempQuestionObj = [];
    for(let i = 0;i < examDetails.length;i++) {
      tempQuestionObj.push({
        si: `question-${i+1}`,
        title: examDetails[i].name,
        problemStatement: examDetails[i].description,
        assumption: "nothing",
        firstExample: "1 2 3 4 5 6",
        firstExampleAns: "123",
        secondExample: "2 3",
        secondExampleAns: "12",
        constraint1: examDetails[i].constraints.split("\r")[0],
        constraint2: examDetails[i].constraints.split("\r")[1],
        language: examDetails[i].support_langs[0]
      });
    }

    const cases = [];
    for(let i = 0;i < examDetails.length;i++) {
     
      var test_input = examDetails[i].test_inputs.replace(/\\n/g, '\n');
      var test_output = examDetails[i].test_outputs.replace(/\\n/g, '\n');
      
      cases.push({
        input: test_input.split("\\r"),
        output: test_output.split("\\r")
      });

    }

    //res.json({msg: 'test'});
    res.json({questionDetails: tempQuestionObj, languages: examDetails[0].support_langs.split(" "), cases: cases});  
    
} 

export const getExamHeaders = async(req, res) => {
    const examHeaders = await getHeaders();
    //console.log(examHeaders);
    res.json({data: examHeaders});
}