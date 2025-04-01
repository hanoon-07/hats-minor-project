import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Movebutton } from '../components/Movebutton';
import axios from 'axios';



function AfterExamPage({ }) {
  const location = useLocation();
  const { pop, reasoning } = location.state || {};

  let noq = useSelector((state) => state["exam-data"].questions.length)
  let questions = useSelector((state) => state["exam-data"].questions)

  const [value, setValue] = useState(questions[0].codeValues[questions[0].selected])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#12141D",
        "editorCursor.foreground": "#FFFFFF",  // Cursor color (white)
        "editorLineNumber.foreground": "#FFFFFF", // Line numbers (white)
      }
    });
  });


  let testCaseResult = questions.map((question) => {
    let count = 0;
    let tci = question.testCases.output; // These are expected outputs
    let tco = question.testResult?.stdOut || []; // These are actual outputs
    for (let i = 0; i < tci.length; i++) {
      if (i < tco.length && tci[i] === tco[i].trim()) {
        count++;
      }
    }

    return count;
  });


  const totalInputPassed = testCaseResult.reduce((acc, curr) => acc + curr, 0)
  const totalInput = questions.reduce((acc, curr) => acc + curr.testCases.input.length, 0)
  const navigate = useNavigate();





  const { studentId, examId } = useParams();

  const saveToDatabase = () => {
   
  
    const results = questions.map((question, index) => {
  
      let passedCount = 0;
      let expectedOutputs = question.testCases.output;
      let actualOutputs = question.testResult?.stdOut || [];

      for (let i = 0; i < expectedOutputs.length; i++) {
        if (i < actualOutputs.length && expectedOutputs[i] === actualOutputs[i].trim()) {
          passedCount++;
        }
      }

      return {
        student_id: parseInt(studentId),
        exam_id: parseInt(examId),
        question_id: question.questionDetails.id,
        partial_output: JSON.stringify(actualOutputs), 
        testcases_passed: passedCount,
        total_testcases: question.testCases.output.length
      };
    });

    console.log(results)

    axios.post(
      `http://localhost:3000/saveresult`,{results}
    ).then(response => {
      console.log('Results saved successfully:', response.data);
    })
    .catch(error => {
      console.error('Error saving results:', error);
      // Show error message to user
    });

   
      
  };



  return (
    <>

      <div className="dashboard bg-black">
        <div className="header flex justify-between">
          <div className="orbitron-font text-2xl">CODEFLOW</div>
          <div className="actions">

            {/* <div className="timer">
              <span className="timer-icon">⏱️</span>
              Time elapsed: 2hr 13min
            </div> */}

          </div>

          <Movebutton label={'submit'} extraStyleDiv={' max-w-[130px] '} action={() => { 
            saveToDatabase(); }}></Movebutton>
        </div>

        <div className="exam-overview outline outline-1 outline-[#A8FF53]">
          <div className="overview-header">
            <div className="course-title-wrapper">
              <div className="course-code">CST-332</div>
              <div className="text-3xl text-white font-semibold">Operating Systems</div>
            </div>
          </div>

          <div className="stats-cards text-white">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{Math.round(100 * totalInputPassed / totalInput)}%</div>
                <div className="stat-label">OVERALL SCORE</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✓</div>
              <div className="stat-info">
                <div className="stat-value">{totalInputPassed}/{totalInput}</div>
                <div className="stat-label">TEST CASES PASSED</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                {/* <div className="stat-value">{pop}</div> */}
                <div className="stat-label">PARTIAL OUTPUT</div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content">
          <div className="questions-panel">
            <div className="panel-header">
              <span>Questions</span>
              <span className="panel-badge">{noq} Questions</span>
            </div>

            <div className="question-list">

              {questions.map((question, index) => (
                <div key={index}
                  className={`question-item text-white ${selectedIndex === index ? "active" : ""}`}
                  onClick={() => { setValue(question.codeValues[question.selected]); setSelectedIndex(index) }}>
                  <div className="question-header">
                    <div className="question-title">
                      <span className="question-number">{index + 1}</span>
                      {question.questionDetails.title}
                    </div>
                    <div className="test-status">
                      {testCaseResult[index]}/{question.testCases.input.length}
                    </div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-info">
                      <span>Progress</span>
                      <span>{Math.round(100 * testCaseResult[index] / question.testCases.input.length)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill"
                        style={{ width: `${(100 * testCaseResult[index]) / question.testCases.input.length}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

          <div className='rounded-2xl overflow-hidden code-panel'>
            <div class="tab-header">
              <div className="tab active">Source Code</div>
              {/* <div className="tab">Test Results</div>
              <div className="tab">Output</div> */}
            </div>
            <Editor
              className='p-3 rounded-xl'
              height="400px"
              defaultLanguage="javascript"
              value={value}
              theme="custom-dark"
              options={{

                readOnly: true,
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false
              }}
            />
          </div>

          <div>
          </div>
        </div>

        <div className="results-summary">
          <div className="summary-header">
            <div className="summary-title">
              <span>🔍</span>
              Exam Assessment
            </div>
            <div className="summary-score">
              {/* <span>{pop}</span> */}
              <span style={{ fontSize: "14px", color: "var(--grey-text)" }}>Partial Output</span>
            </div>
          </div>
          <div className="text-white max-h-[200px] overflow-scroll overflow-x-hidden scroller">
            <h1>AI reasoning</h1>
            <p>{pop}</p>
            <p>{reasoning}</p>
          </div>
        </div>

      </div>

    </>
  )
}

export default AfterExamPage
