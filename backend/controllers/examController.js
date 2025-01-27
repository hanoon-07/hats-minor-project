

let languages = ["java", "python", "javascript", "c", "c++"];
const cases = [
    { input: ["1 2 3", "3 4 1", "2 8 3"], output: ["1 2 3", "3 4 1", "2 8 3"] },
    { input: ["1 2 3", "3 4 1", "2 8 3"], output: ["1 2 3", "3 4 1", "2 8 3"] },
];

const questionDetails = [
    {
      si: "question-1",
      title: "Bubble Sort",
      problemStatement:
        "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
      assumption: "you may take assumptions for granted",
      firstExample: "1 3 4 5 6 0",
      firstExampleAns: "0 1 3 4 5 6",
      secondExample: "1 3 4 5 6 0",
      secondExampleAns: "0 1 3 4 5 6",
      constraint1: " -100 <= num <= 100",
      constraint2: " -100 <= num <= 100",
      language: "C",
    },
    {
      si: "question-2",
      title: "Quick Sort",
      problemStatement:
        "Implement the Quick Sort algorithm to sort an array in ascending order.",
      assumption: "Array elements are integers",
      firstExample: "5 2 8 1 9",
      firstExampleAns: "1 2 5 8 9",
      secondExample: "3 7 2 1 4",
      secondExampleAns: "1 2 3 4 7",
      constraint1: " -100 <= num <= 100",
      constraint2: "Array length <= 1000",
      language: "java",
    },
];


export const getExam = (req, res) => {
    const examId = req.query.examId;  // need to fetch the data from backend using this examid
      
    setTimeout(() => {
        res.json({questionDetails: questionDetails, languages: languages, cases: cases});   
    }, 3000);
} 