
import { getExamDetails, getHeaders, storeExam, getExamsInClassDetails, stopExamDB, storeResults, fetchLatestExams, fetchPast6Average  } from "../models/examModel.js";

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
    console.log(examDetails);
    var tempQuestionObj = [];
    for(let i = 0;i < examDetails.length;i++) {
      tempQuestionObj.push({
        si: `question-${i+1}`,
        id: examDetails[i].question_id,
        title: examDetails[i].name,
        problemStatement: examDetails[i].description,
        assumption: "nothing",
        firstExample: "1 2 3 4 5 6",
        firstExampleAns: "123",
        secondExample: "2 3",
        secondExampleAns: "12",
        constraint1: examDetails[i].constraints.split("\r")[0],
        constraint2: examDetails[i].constraints.split("\r")[1],
        language: examDetails[i].support_langs[0],
        
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
    res.json({questionDetails: tempQuestionObj, languages: examDetails[0].support_langs.split(" "), cases: cases, duration: examDetails[0].duration});  
    
} 

export const getExamHeaders = async(req, res) => {
    const examHeaders = await getHeaders();
    //console.log(examHeaders);
    res.json({data: examHeaders});
}

export const getExamsInClass = async(req, res) => {
  const classId = parseInt(req.query.classId, 10);
  const details = await getExamsInClassDetails(classId)
  res.json(details)
}


export const saveResult = async (req, res) => {
  try {
    const { results } = req.body;
    
    if (!results || !Array.isArray(results)) {
      return res.status(400).json({ error: 'Invalid request data. Expected an array of results.' });
    }
    
    // Call the model function to save each result
    const savedResults = await storeResults(results);
    
    res.status(200).json({ 
      message: 'Results saved successfully', 
      savedCount: savedResults.length
    });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({ error: 'Failed to save results' });
  }
};



export const getLatestExam = async(req, res) => {
  const sid = parseInt(req.query.sid, 10);
  const details = await fetchLatestExams(sid)
  res.json(details)
}


export const getPast6Average = async(req, res) => {
  const details = await fetchPast6Average()
  res.json(details)
}

export const stopExam = async(req, res) => {
  const examId = parseInt(req.query.examId, 10);
  try {
    await stopExamDB(examId);
  } catch(error) {
    console.log('something went wrong! controller stop exam!');
  }
  res.json({
    msg: 'sucess!'
  })
}