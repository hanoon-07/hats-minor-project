import React, { useState } from 'react';
import Button from './Button';
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../features/examwindow/examSlice';

const QuestionBar = ({ questionDetails }) => {

    const [currentQuestion, setCurrentQuestion] = useState(questionDetails[0])
 
    function getQuestionItems() {
        var tempArr = [];
        questionDetails.map((item) => {
            tempArr.push(item.si);
        });
        return tempArr;
    }

    const dispatch = useDispatch();


    return (
        <div className="bg-darkGray text-white w-[100%] h-[100%]   border-darkGray rounded-[4px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-secondaryGray h-11 p-[4px] rounded-t-[4px]">
                <Button label='question' buttonClass={' text-white bg-blue-900 hover:text-blue-500'}/>
                <Dropdown 
                    selected={currentQuestion.si} 
                    items={getQuestionItems()}
                    disabled={false} 
                    action={
                        (index) => {setCurrentQuestion(questionDetails[index]); dispatch(setSelected(index))}
                    } 
                />
            </div>
            <div className='h-[90%] overflow-y-scroll scroller mb-2' >
                <div className='m-6'>
                    {/* Title */}
                    <h1 className="text-3xl  mb-4">{currentQuestion.title}</h1>

                    {/* Problem Description */}
                    <div className="space-y-4 mb-6">
                        <p className="text-textGray text-base">
                            {currentQuestion.problemStatement}
                        </p>
                        <p className="text-textGray">
                            {currentQuestion.assumption}
                        </p>
                    </div>

                    {/* Examples */}
                    <div className="space-y-6 ">
                        <div className='bg-buttonGray rounded-[6px] p-2 pl-4 shadow-md'>
                            <h2 className="text-md font-normal mb-3">Example -1</h2>
                            <div className="p-4 rounded">
                                <div className="mb-2 flex flex-row gap-4">
                                    <span className="text-textGray">Input: </span>
                                    <span> {currentQuestion.firstExample}</span>
                                </div>
                                <div>
                                    <span className="text-textGray">output: </span>
                                    <span> {currentQuestion.firstExampleAns}</span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-buttonGray rounded-[6px] p-2 pl-4 shadow-md'>
                            <h2 className="text-md font-normal mb-3">Example -2</h2>
                            <div className="p-4 rounded">
                                <div className="mb-2 flex flex-row gap-4 ">
                                    <span className="text-textGray">Input: </span>
                                    <span> {currentQuestion.secondExample}</span>
                                </div>
                                <div>
                                    <span className="text-textGray">output: </span>
                                    <span> {currentQuestion.secondExampleAns}</span>
                                </div>
                            </div>
                        </div>

                        {/* Constraints */}


                        <div>
                            <h2 className="text-lg font-semibold mb-3">Constraints</h2>
                            <ul className="list-disc list-inside text-gray-300 pl-4">
                                <li>{currentQuestion.constraint1}</li>
                                <li>{currentQuestion.constraint2}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionBar;