import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react'
import axios from 'axios'
import { LoadingRing } from './animation/LoadingRing';

function Results({ examId, onClose, studentId, examName }) {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [resultData, setResultData] = useState(null)


  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Fetch results first

        const resultsResponse = await axios.get(
          `http://localhost:3000/getResultForStudent?sid=${studentId}&eid=${examId}`
        );
        const results = resultsResponse.data;
        console.log('the result for student',results)


        // Then fetch exam details
        const examResponse = await axios.get(
          `http://localhost:3000/exam?examId=${examId}`
        );
        const data = examResponse.data.questionDetails;
        console.log('the exam info is',examResponse.data)

        // Format the data
        const formattedData = data.map((question) => {
          const result = results.find((res) => res.question_id === question.id);

          return {
            question_id: question.id,
            title: question.title,
            problemStatement: question.description,
            result: result
              ? {
                partial_output: result.partial_output,
                testcases_passed: result.testcases_passed,
                total_testcases: result.total_testcases,
                score: result.score,
                submission_date: result.submission_date,
                code: result.code_values
              }
              : null, // In case no result is found
          };
        });

        // Set the result data
        setResultData(formattedData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [studentId, examId]);

    useEffect(()=>console.log('the formatted data is', resultData),[resultData])



  

  if (isLoading || !resultData) {
    return <LoadingRing/>;
  }

  const selectedQuestion = resultData[selectedQuestionIndex];
  
  const totalPassed = resultData.reduce((acc, question) => acc + (question.result?.testcases_passed || 0), 0);
  const totalTestCases = resultData.reduce((acc, question) => acc + (question.result?.total_testcases || 0), 0);
  const overallScore = totalTestCases > 0 ? Math.round((totalPassed / totalTestCases) * 100) : 0;

  return (
    <div className="bg-[#0b0b0e] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mt-2">{resultData.title}</h1>
          <div className="flex gap-4 mt-2">
            <div className="text-gray-400">{resultData.courseCode}</div>
            <div className="text-white">
              <h1 className='text-3xl font-semibold'>
                {examName}
              </h1>
              {/* Exam Date: {new Date(resultData[0]?.result?.submission_date).toISOString().split("T")[0]} */}
            </div>

          </div>
        </div>
        <div className="bg-[#1a1b1f] border border-gray-800 p-4 rounded">
          <div className="text-3xl font-bold text-center">{overallScore}%</div>
          <div className="text-sm text-gray-400 text-center">OVERALL SCORE</div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#1a1b1f] border border-gray-800 p-4 rounded">
          <div className="flex items-center">
            <div className="text-2xl mr-4">✓</div>
            <div>
              <div className="text-2xl font-bold">
                {totalPassed} / {totalTestCases}
              </div>
              <div className="text-sm text-gray-400">TEST CASES PASSED</div>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1b1f] border border-gray-800 p-4 rounded">
          <div className="flex items-center">
            <div className="text-2xl mr-4">📝</div>
            <div>
              <div className="text-2xl font-bold">{resultData.length}</div>
              <div className="text-sm text-gray-400">NO OF QUESTIONS</div>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1b1f] border border-gray-800 p-4 rounded">
          <div className="flex items-center">
            <div className="text-2xl mr-4">⏱️</div>
            <div>
              <div className="text-2xl font-bold">
                {new Date(resultData[0]?.result?.submission_date).toISOString().split("T")[0]}
              </div>
              <div className="text-sm text-gray-400">SUBMISSION DATE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Questions Panel */}
        <div className="bg-[#1a1b1f] border border-gray-800 rounded overflow-hidden">
          <div className="p-3 border-b border-gray-800 font-medium flex justify-between">
            <span>Questions</span>
            <span className="border border-gray-800 px-2 rounded text-sm">
              {resultData.length}
            </span>
          </div>
          <div className="overflow-y-auto ">
            {resultData.map((question, index) => (
              <div
                key={question.id}
                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${selectedQuestionIndex === index ? 'bg-[#17171c] border-l-4 border-l-[#A8FF53]' : ''
                  }`}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="inline-block bg-black border border-gray-800 text-white rounded w-6 h-6 text-center text-sm mr-2">
                      {index + 1}
                    </span>
                    {question.title}
                  </div>
                  {/* <div className="text-sm">
                    <span className={question.result.testcases_passed === question.result.total_testcases ? 'text-[#A8FF53]' : 'text-white'}>
                      {question.result.testcases_passed}/{question.result.total_testcases}
                    </span>
                  </div> */}
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-[#A8FF53]"
                      style={{ width: `${(question.result.testcases_passed / question.result.total_testcases) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="progress-info mt-1 flex justify-between text-xs text-gray-400">
                  <span>Progress</span>
                  <span>{Math.round((question.result.testcases_passed / question.result.total_testcases) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Display */}
        <div className="col-span-3 bg-black border border-gray-800 rounded overflow-hidden">
          <div className="bg-[#1a1b1f] p-3 border-b border-gray-800 font-medium flex justify-between items-center">
            <div >
              <div className="tab active">Source Code</div>
            </div>
            <div className="text-sm">
              <span className={selectedQuestion.result.testcases_passed === selectedQuestion.result.total_testcases ? 'text-[#A8FF53]' : 'text-white'}>
                {selectedQuestion.result.testcases_passed}/{selectedQuestion.result.total_testcases} Test Cases Passed
              </span>
            </div>
          </div>

          <div className="bg-[#0b0b0e] p-4 border-b border-gray-800">
            <h3 className="text-lg font-medium mb-2">{selectedQuestion.title}</h3>
            <p className="text-gray-400">{selectedQuestion.problemStatement}</p>
          </div>

          <div className="h-96 bg-[#0b0b0e]">
            <Editor
              className="p-3 rounded h-full"
              value={selectedQuestion.result.code}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                lineNumbers: "on",
                disableAutoFocus: true,
                automaticLayout: true,
              }}
              wrapperProps={{
                className: 'h-full w-full', // Add height and width classes
                style: {
                  pointerEvents: 'none',
                  height: '100%',
                  width: '100%'
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Assessment Section */}
      <div className="mt-6 bg-[#1a1b1f] border border-gray-800 rounded overflow-hidden">
        <div className="p-3 border-b border-gray-800 font-medium flex justify-between items-center">
          <div className="summary-title">
            <span>🔍</span> Exam Assessment
          </div>
        </div>
        <div className="p-4 text-white overflow-auto">
          <h3 className="text-lg font-medium mb-2">Performance Analysis</h3>
          <p className="text-gray-400">
            {selectedQuestion.result.partial_output}
          </p>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        onClick={onClose}
      >
        Back
      </button>
    </div>
  );
}

export default Results  