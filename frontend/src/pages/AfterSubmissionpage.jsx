import React, { useEffect, useRef, useState } from 'react';
import Popanim from '../components/animation/Popanim';
import { useSelector } from 'react-redux';
import axios from 'axios';


function AfterSubmissionpage() {

    const [step0, setStep0] = useState("true");
    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);



    useEffect(() => {
        const texts = ['CODEFLOW'];
        let textIndex = 0;
        let charIndex = 0;
        const typingSpeed = 80;
        const textElement = document.getElementById('text');

        textElement.textContent = '';

        function type() {
            if (charIndex < texts[textIndex].length) {
                textElement.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            }
            else {
                setTimeout(() => textElement.textContent = '', 170);
                setStep0(false)
                setStep1(true)

            }
        }

        setTimeout(() => {
            type();
        }, 500);

    }, []);

    const questions = useSelector((state) => state['exam-data'].questions)

    useEffect(() => {
        //api call for partial output
        let message = ''
        
        questions.map((item,index)=>{
          message = message + `Q${index+1}:${item.questionDetails.problemStatement} the answer given was ${item.codeValues[item.selected]}`
  
        })

        const info = 'above are questions and student answered code, evaluate the code according to the question of it and give some mark out of 100% if very close to actual solution 90% above or else if very far from actual solution around 30%'

        message = message + info

   


        const fetchData = async () => {
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
      
              console.log(res.data.choices[0]?.message?.content || "No response received");
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
      
          fetchData();


    }, [step1])



    return (
        <div className="flex justify-center items-center h-screen bg-black">
            {step0 && <div
                id="text"
                className="orbitron-font text-white text-4xl font-bold"
                style={{
                    minHeight: '60px',
                    paddingRight: '8px',
                    display: 'inline-block'
                }}
            ></div>}

            {step1 && <Popanim/>
            }

        </div>
    );
}

export default AfterSubmissionpage;