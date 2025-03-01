import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

function AfterExamPage({ }) {
  const location = useLocation();
  const { pop } = location.state || {};

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
        "editor.background": "#12141D"
      }
    });


  }, []);







  let testCaseResult = questions.map((question) => {
    let count = 0;
    let tci = question.testCases.output; // These are expected outputs
    let tco = question.testResult?.stdOut || []; // These are actual outputs

    console.log(tci);
    console.log(tco);

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



  return (
    <>

      <div className="dashboard">
        <div className="header">
          <div className="orbitron-font text-2xl">CODEFLOW</div>
          <div className="actions">

            {/* <div className="timer">
              <span className="timer-icon">⏱️</span>
              Time elapsed: 2hr 13min
            </div> */}

          </div>
        </div>

        <div className="exam-overview">
          <div className="overview-header">
            <div className="course-title-wrapper">
              <div className="course-code">CST-332</div>
              <div className="course-title text-white">Operating Systems</div>
            </div>
          </div>

          <div className="stats-cards text-white">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <div className="stat-value">{100 * totalInputPassed / totalInput}%</div>
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
                <div className="stat-value">{pop}</div>
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
                      <span>{100 * testCaseResult[index] / question.testCases.input.length}%</span>
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
              <span>{pop}</span>
              <span style={{ fontSize: "14px", color: "var(--grey-text)" }}>Partial Output</span>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default AfterExamPage
