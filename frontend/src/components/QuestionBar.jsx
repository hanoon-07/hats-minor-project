import React, { useState } from 'react';
import Button from './Button';
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux';
import { setSelected } from '../features/examwindow/examSlice';
import { selectInputs, selectOutputs } from '../redux/examSelector';

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
    const inputs = useSelector(selectInputs);
    const outputs = useSelector(selectOutputs);

    return (
        <div className="bg-darkGray text-white w-[100%] h-[100%] rounded-[4px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-secondaryGray h-11 p-[4px] rounded-t-[4px]">
                <Button label='question' buttonClass={' text-black bg-[#A8FF53] border-[1px] border-[#A8FF53] '}/>
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
                    <h1 className="text-3xl font-semibold mb-4 text-white">{currentQuestion.title}</h1>

                    {/* Problem Description */}
                    <div className="space-y-4 mb-6">
                        <p className="text-textGray text-base">
                            {currentQuestion.problemStatement}
                        </p>
                        
                    </div>

                    {/* Examples */}
                    <div className="space-y-6 ">
                        <div className='bg-[#2B2E3C] rounded-[6px] p-2 pl-4 shadow-md'>
                            <h2 className="text-md font-medium mb-3 text-[#A8FF53]">Example -1</h2>
                            <div className=" rounded">
                                <div className="mb-2  flex flex-col">
                                    <span className="text-white">Input </span>
                                    <span className='px-2 text-[#3B82F6]' style={{whiteSpace: 'pre'}}>{inputs[0]}</span>
                                </div>
                                <div>
                                    <span className="text-white flex flex-col">output </span>
                                    <span className='px-2 text-[#3B82F6]' style={{whiteSpace: 'pre'}}>{outputs[0]}</span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-[#2B2E3C] rounded-[6px] p-2 pl-4 shadow-md'>
                            <h2 className="text-md font-medium mb-3 text-[#A8FF53]">Example -2</h2>
                            <div className=" rounded">
                                <div className="mb-2 flex flex-col">
                                    <span className="text-white">Input </span>
                                    <span className='px-2 text-[#3B82F6]' style={{whiteSpace: 'pre'}}>{inputs[1]}</span>
                                </div>
                                <div className='flex flex-col'>
                                    <span className="text-white">output </span>
                                    <span className='px-2 text-[#3B82F6]' style={{whiteSpace: 'pre'}}>{outputs[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Constraints */}


                        <div>
                            <h2 className="text-lg font-semibold mb-3 text-white">Constraints</h2>
                            <ul className="list-disc list-inside text-gray-300 pl-1">
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