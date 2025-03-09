import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Movebutton } from '../components/Movebutton';

function AfterExamPage() {
  const location = useLocation();
  const { pop } = location.state || {};

  let noq = useSelector((state) => state["exam-data"].questions.length)
  let questions = useSelector((state) => state["exam-data"].questions)

  const [value, setValue] = useState(questions[0].codeValues[questions[0].selected])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    monaco.editor.defineTheme("customDarkGray", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#1e1e1e", // Dark gray background
        "editor.foreground": "#ffffff", // White text
        "editor.lineHighlightBackground": "#2a2a2a", // Slightly lighter gray for line highlight
        "editorCursor.foreground": "#ffcc00", // Yellow cursor
        "editor.selectionBackground": "#3a3d41", // Darker selection background
        "editor.inactiveSelectionBackground": "#3a3d4170" // Faded selection for inactive sections
      }
    });
  });


  let testCaseResult = questions.map((question) => {
    let count = 0;
    let tci = question.testCases.output; // These are expected outputs
    let tco = question.testResult?.stdOut || []; // These are actual outputs

  
    // Compare corresponding elements
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

          <Movebutton label={'submit'} extraStyleDiv={' max-w-[130px] '} action={() => {navigate('/');}}></Movebutton>
        </div>

        <div className="exam-overview outline ">
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
            {/* <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <div className="stat-value">{pop}</div>
                <div className="stat-label">PARTIAL OUTPUT</div>
              </div>
            </div> */}
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
              theme="customDarkGray"
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
              Exam Assessment by AI
            </div>
            {/* <div className="summary-score">
              <span>{pop}</span>
              <span style={{ fontSize: "14px", color: "var(--grey-text)" }}>Partial Output</span>
            </div> */}
          </div>
          <div className="text-white max-h-[200px] overflow-scroll overflow-x-hidden scroller">
            <p>{pop}</p>
          </div>
        </div>

      </div>

    </>
  )
}

export default AfterExamPage
