import React, { useEffect, useState } from 'react';
import Popanim from '../components/animation/Popanim';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Codeflowanim from '../components/animation/codeflowanim';

function AfterSubmissionpage() {
    const questions = useSelector((state) => state['exam-data'].questions);
    const [loading, setLoading] = useState(1); // Initial loading state for Codeflowanim
    const [showAdditionalTestingMessage, setShowAdditionalTestingMessage] = useState(false); // For "Additional test cases" message
    const [fullCase, setFullCase] = useState(false); // Whether all test cases passed
    const [evaluationComplete, setEvaluationComplete] = useState(false); // To control flow after initial loading
    const navigate = useNavigate();

    // First step: Calculate if all test cases passed
    useEffect(() => {
        if (!loading) {
            // Calculate test case results when initial loading is done
            let testCaseResult = questions.map((question) => {
                let count = 0;
                let tci = question.testCases.output; // These are expected outputs
                let tco = question.testResult?.stdOut || []; // These are actual outputs
        
                // Compare corresponding elements
                for (let i = 0; i < tci.length; i++) {
                    if (i < tco.length && tco[i] && tci[i] === tco[i].trim()) {
                        count++;
                    }
                }
        
                return count;
            });

            const allTestCasesPassed = testCaseResult.reduce((acc, curr) => acc + curr, 0) === 
                questions.reduce((acc, curr) => acc + curr.testCases.input.length, 0);
            
            setFullCase(allTestCasesPassed);
            // setShowAdditionalTestingMessage(true);
            
            // Wait a moment before proceeding to the next step
            setTimeout(() => {
                setEvaluationComplete(true);
            }, 2000);
        }
    }, [loading, questions]);

    // Second step: Show result or make API call based on fullCase
    useEffect(() => {
        if (evaluationComplete) {
            if (fullCase) {
               
                setTimeout(() => {
                    navigate('result', { state: { pop: 'All test cases passed!' } });
                }, 2000);
            } else {
                // Partial output evaluation - make API call
                const fetchData = async () => {
                    let testCaseResult = questions.map((question) => {
                        let count = 0;
                        let tci = question.testCases.output;
                        let tco = question.testResult?.stdOut || [];
                
                        for (let i = 0; i < tci.length; i++) {
                            if (i < tco.length && tco[i] && tci[i] === tco[i].trim()) {
                                count++;
                            }
                        }
                
                        return count;
                    });

                    let message = 'Given are questions and answers for coding problems and number of given testcases passed.\nEvaluate each question out of 100. Criteria for evaluation is if the answer given is how close it is to real solution and how many testcases it passed out of total.\n.\nThe questions are\n';
                    
                    questions.forEach((item, index) => {
                        message = message + `Q${index+1}:${item.questionDetails.problemStatement}\nthe answer given was:\n${item.codeValues[item.selected]}\nnumber of test cases passed ${testCaseResult[index]} out of ${item.testCases.input.length}\n`;
                    });
     
                    try {
                        const res = await axios.post(
                            "https://openrouter.ai/api/v1/chat/completions",
                            {
                                model: "openai/gpt-3.5-turbo-0613",
                                messages: [{ role: "user", content: message }],
                            },
                            {
                                headers: {
                                    Authorization: "Bearer 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",
                                    "HTTP-Referer": "", 
                                    "X-Title": "", 
                                    "Content-Type": "application/json",
                                }
                            }
                        );

                        const responseContent = res.data.choices[0]?.message?.content || "No response received";
                        navigate('result', { state: { pop: `${responseContent}` } });
                    } catch (error) {
                        console.error("Error fetching data:", error);
                        navigate('result', { state: { pop: 'api error!' } });
                    }
                };

                fetchData();
            }
        }
    }, [evaluationComplete, fullCase, navigate, questions]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {loading ? (
                
                <Codeflowanim setLoading={setLoading} />
            ) : (
                <div className="text-center">
            

                    {!evaluationComplete && (
                       
                        <Popanim message="Additional test cases are being tested" />
                    )}
                    
                    {evaluationComplete && (
                       
                        <Popanim 
                            message={fullCase 
                                ? "All test cases passed!" 
                                : "Partial output is being evaluated"
                            } 
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default AfterSubmissionpage;