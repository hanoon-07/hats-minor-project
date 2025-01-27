

let languages = ["java", "python", "javascript", "c", "c++"];
const cases = [
    { input: ["3\n1 2 3", "2\n4 8", "1\n 7"], output: ["2", "6", "7"] },
    { input: ["1", "3", "2"], output: ["1", "3", "2"] },
];

const questionDetails = [
    {
      si: "question-1",
      title: "Average",
      problemStatement:
        "First line of input is an integer(n), second line n no of integers(num), find the average of the n integers",
      assumption: " ",
      firstExample: "3\n1 4 6",
      firstExampleAns: "3",
      secondExample: "1\n4",
      secondExampleAns: "4",
      constraint1: "1 <= n <= 5",
      constraint2: "0 <= num[i] <= 9",
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