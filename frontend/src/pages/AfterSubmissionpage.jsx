import React, { useEffect, useState } from 'react';
import Popanim from '../components/animation/Popanim';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Codeflowanim from '../components/animation/codeflowanim';

function AfterSubmissionpage() {
    
    
    const questions = useSelector((state) => state['exam-data'].questions);
    const [loading, setLoading] = useState(1);
    const [fullCase, setFullCase] = useState(0)
    const navigate = useNavigate();


    useEffect(()=>{
        
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

        setFullCase(testCaseResult.reduce((acc, curr) => acc + curr, 0)==questions.reduce((acc,curr)=>acc+curr.testCases.input.length,0))
        
    },[])
    

    useEffect(() => {

        if (loading === 0) {
            console.log('api call gone')
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
    
            const fetchData = async () => {
                let message = 'Given are questions and answers for coding problems and number of given testcases passed.\nEvaluate each question out of 100. Criteria for evaluation is if the answer given is how close it is to real solution and how many testcases it passed out of total.\nFinally the response should be just only a single score which is average of all scores obtained.\nThe questions are\n';
                
                questions.map((item, index) => {
                    message = message + `Q${index+1}:${item.questionDetails.problemStatement}\nthe answer given was:\n${item.codeValues[item.selected]}\nnumber of test cases passed ${testCaseResult[index]} out of ${item.testCases.input.length}\n`;
                });

                console.log(message)
 
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
             
                    navigate('/result',{state:{pop:`${responseContent}`}})

                } catch (error) {
                    console.error("Error fetching data:", error);
                    navigate('/result',{state:{pop:'api error!'}})
                }
            };
            fetchData();
        }

        else if(fullCase){
            //backend addtional testing
            setTimeout(()=>{navigate('/result',{state:{pop:'not applicable'}})},3000)
        }
    }, [loading,fullCase]);

    return (
        <div>
            {loading && <Codeflowanim setLoading={setLoading} />}
            {!loading && <Popanim message={fullCase?'Additional test cases are being tested':'Your partial output is being evaluated'}/>}
        </div>
    );
}

export default AfterSubmissionpage;