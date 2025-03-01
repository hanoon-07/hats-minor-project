import React, { useEffect, useState } from 'react';
import Popanim from '../components/animation/Popanim';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Codeflowanim from '../components/animation/codeflowanim';

function AfterSubmissionpage() {
    
    
    const questions = useSelector((state) => state['exam-data'].questions);
    const [aiInfo, setAiInfo] = useState(null);
    const [loading, setLoading] = useState(1);
    const [fullCase, setFullCase] = useState(0)
    const navigate = useNavigate();


    useEffect(()=>{
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


        console.log(testCaseResult.reduce((acc, curr) => acc + curr, 0))
        console.log(questions.reduce((acc,curr)=>acc+curr.testCases.input.length,0))

        setFullCase(testCaseResult.reduce((acc, curr) => acc + curr, 0)==questions.reduce((acc,curr)=>acc+curr.testCases.input.length,0))



        

    },[])
    



    

  
    useEffect(() => {

        if (loading === 0 && !fullCase) {
            console.log('api call gone')
            const fetchData = async () => {
                let message = 'Given are two questions whose answers are given. Evaluate it a single score out of 100 for the given questions. the response should be a single score out of 100\n';
                
                questions.map((item, index) => {
                    message = message + `Q${index+1}:${item.questionDetails.problemStatement} the answer given was:${item.codeValues[item.selected]}\n`;
                    console.log(item.questionDetails.problemStatement)
                    console.log(item.codeValues[item.selected])
                });

            
                
                try {
                    const res = await axios.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        {
                            model: "deepseek/deepseek-r1:free",
                            messages: [{ role: "user", content: message }],
                            logprobs:null
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