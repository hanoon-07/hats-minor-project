import React, { useEffect, useState } from 'react';
import Popanim from '../components/animation/Popanim';
import { useSelector } from 'react-redux';
import axios from 'axios';
import JSON5 from 'json5';
import POPwindow from '../components/POPwindow';

function AfterSubmissionpage() {
    const [step, setStep] = useState(0); // 0: initial text animation, 1: API call/loading, 2: final page
    const questions = useSelector((state) => state['exam-data'].questions);
    const [aiInfo, setAiInfo] = useState(null);



    // Step 0: Initial text animation
    useEffect(() => {
        if (step === 0) {
            const texts = ['CODEFLOW'];
            let textIndex = 0;
            let charIndex = 0;
            const typingSpeed = 80;
            const textElement = document.getElementById('text');

            if (textElement) {
                textElement.textContent = '';

                function type() {
                    if (charIndex < texts[textIndex].length) {
                        textElement.textContent += texts[textIndex].charAt(charIndex);
                        charIndex++;
                        setTimeout(type, typingSpeed);
                    } else {
                        setTimeout(() => {
                            textElement.textContent = '';
                            setStep(1); // Move to next step after animation
                        }, 170);
                    }
                }

                setTimeout(() => {
                    type();
                }, 500);
            }
        }
    }, [step]);

    // Step 1: API call
    useEffect(() => {
        if (step === 1) {
            const fetchData = async () => {
                let message = '';
                
                
                questions.map((item, index) => {
                    message = message + `Q${index+1}:${item.questionDetails.problemStatement} the answer given was ${item.codeValues[item.selected]}`;

                    const info = "above is question and student answered code, evaluate the code according to the question of it and give some mark out of 100, if very close to actual solution give 90 above OR else if very incorrect solution give around 30. Importantly the the answer should be just the mark nothing else IN THE FORM OF {30,85}";

                    message = message + info;
                    
                    
                });

                

                
                try {
                    const res = await axios.post(
                        "https://openrouter.ai/api/v1/chat/completions",
                        {
                            model: "openai/gpt-3.5-turbo-0613",
                            messages: [{ role: "user", content: message }]
                        },
                        {
                            headers: {
                                Authorization: "Bearer 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",
                                "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
                                "X-Title": "<YOUR_SITE_NAME>", // Optional
                                "Content-Type": "application/json",
                            }
                        }
                    );

                    const responseContent = res.data.choices[0]?.message?.content || "No response received";
                    console.log(responseContent)
                    setAiInfo(responseContent.slice(1, -1).split(',').map(item => Number(item.trim())))
                    setStep(2)
                    
                } catch (error) {
                    console.error("Error fetching data:", error);
                    // Even on error, we might want to proceed to the next step
                    setStep(2);
                }
            };

            fetchData();
        }
    }, [step, questions]);

    // Render different components based on the current step
    const renderContent = () => {
        switch (step) {
            case 0:
                return (
                    <div
                        id="text"
                        className="orbitron-font text-white text-4xl font-bold"
                        style={{
                            minHeight: '60px',
                            paddingRight: '8px',
                            display: 'inline-block'
                        }}
                    ></div>
                );
            case 1:
                return <Popanim />;
            case 2:
                return (
                    <POPwindow score1={aiInfo[0]} score2={aiInfo[1]} />
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            {renderContent()}
        </div>
    );
}

export default AfterSubmissionpage;