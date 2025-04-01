import React, { useEffect } from 'react'
import { useState, useCallback } from 'react';
import QuestionBar from './QuestionBar';
import Result_case from './testCaseWindow/Result_case';
import Codeeditor from './edittorWindow/Codeeditor';
import Examnav from './examnav/Examnav';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllQuestions } from '../redux/examSelector';


function Examwindow({timeStart, socket, studentData, duration, report}) {
    // const questionDetails =
    //     [
    //         {
    //             si: 'question-1',
    //             title: 'Bubble Sort',
    //             problemStatement: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.You may assume the two numbers do not contain any leading zero, except the number 0 itself.',
    //             assumption: 'you may take assumptions for granted',
    //             firstExample: '1 3 4 5 6 0',
    //             firstExampleAns: '0 1 3 4 5 6',
    //             secondExample: '1 3 4 5 6 0',
    //             secondExampleAns: '0 1 3 4 5 6',
    //             constraint1: ' -100 <= num <= 100',
    //             constraint2: ' -100 <= num <= 100',
    //             language: 'C'
    //         }
    //         ,

    //         {
    //             si: 'question-2',
    //             title: 'Quick Sort',
    //             problemStatement: 'Implement the Quick Sort algorithm to sort an array in ascending order.',
    //             assumption: 'Array elements are integers',
    //             firstExample: '5 2 8 1 9',
    //             firstExampleAns: '1 2 5 8 9',
    //             secondExample: '3 7 2 1 4',
    //             secondExampleAns: '1 2 3 4 7',
    //             constraint1: ' -100 <= num <= 100',
    //             constraint2: 'Array length <= 1000',
    //             language: 'java'
    //         }]


    //let languages = ['java', 'python', 'javascript', 'c', 'c++'];

    // const cases = [{ input: ['1 2 3', '3 4 1', '2 8 3'], output: ['1 2 3', '3 4 1', '2 8 3'] },
    // { input: ['1 2 3', '3 4 1', '2 8 3'], output: ['1 2 3', '3 4 1', '2 8 3'] }]
    // const results = [
    //     { caseId: 1, result: "false" },
    //     { caseId: 2, result: "null" },
    //     { caseId: 3, result: "null" },
    // ];

    const questionDetails = useSelector(selectAllQuestions); 
    //console.log(questionDetails);

    // const expectedResults = [
    //     { caseId: 1, result: "[1,1,5,6]" },
    //     { caseId: 2, result: "[1,2,3,4,5]" },
    //     { caseId: 3, result: "[1,2,2,3,4]" },
    // ];


    const [isHorizontalResizing, setIsHorizontalResizing] = useState(false);
    const [isVerticalResizing, setIsVerticalResizing] = useState(false);
    const [leftWidth, setLeftWidth] = useState(30);
    const [topHeight, setTopHeight] = useState(50);

    // Constants for resizer dimensions
    const RESIZER_HEIGHT = 10; // px
    const RESIZER_WIDTH = 10; // px

    // Constants for min/max heights
    const MIN_TOP_HEIGHT = 40;    //  minimum for top container
    const MIN_BOTTOM_HEIGHT = 8; //   minimum for bottom container
    const MAX_TOP_HEIGHT = 92;    // Derived from MIN_BOTTOM_HEIGHT
    const dispatch = useDispatch();

    const startHorizontalResizing = useCallback((mouseDownEvent) => {
        mouseDownEvent.preventDefault();
        setIsHorizontalResizing(true);
    }, []);

    const startVerticalResizing = useCallback((mouseDownEvent) => {
        mouseDownEvent.preventDefault();
        setIsVerticalResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsHorizontalResizing(false);
        setIsVerticalResizing(false);      
    }, []);

    const resize = useCallback((mouseMoveEvent) => {
        if (isHorizontalResizing) {
            const containerRect = mouseMoveEvent.currentTarget.getBoundingClientRect();
            const newWidth = ((mouseMoveEvent.clientX - containerRect.left) / containerRect.width) * 100;
            setLeftWidth(Math.min(Math.max(newWidth, 30), 70));
        }

        if (isVerticalResizing) {
            const containerRect = mouseMoveEvent.currentTarget.getBoundingClientRect();
            const containerHeight = containerRect.height - RESIZER_HEIGHT;
            const relativeY = mouseMoveEvent.clientY - containerRect.top;
            const newHeight = (relativeY / containerHeight) * 100;

            // Apply different constraints for top container
            setTopHeight(Math.min(Math.max(newHeight, MIN_TOP_HEIGHT), MAX_TOP_HEIGHT));
        }
    }, [isHorizontalResizing, isVerticalResizing]);

    const calculateTopHeight = (percentage) => {
        return `calc(${percentage}% - ${RESIZER_HEIGHT / 2}px)`;
    };

    const calculateBottomHeight = (percentage) => {
        return `calc(${percentage}% - ${RESIZER_HEIGHT / 2}px)`;
    };

    return (
        <div className='h-full flex-col flex'>
            <div className='h-[55px] bg-black'>
                <Examnav studentData={studentData} report={report} duration={duration} socket={socket} timeStart={timeStart}/>
            </div>

            <div
                className="flex h-full w-full bg-black overflow-hidden  rounded-md"
                onMouseMove={resize}
                onMouseUp={stopResizing}
                onMouseLeave={stopResizing}
            >

                <div
                    className=""
                    style={{ width: `${leftWidth}%` }}
                >
                    <QuestionBar questionDetails={questionDetails} />
                </div>

                <div
                    className="bg-black cursor-col-resize resizer1"
                    style={{ width: `${RESIZER_WIDTH}px`}}
                    onMouseDown={startHorizontalResizing}
                />

                <div
                    className="flex flex-col"
                    style={{ width: `${100 - leftWidth}%` }}
                >
                    <div
                        className=""
                        style={{ height: calculateTopHeight(topHeight) }}
                    >
                        <Codeeditor
                            defaultCode={"//enter your code here"}
                            theme={'leet-code'}
                            
                            disabled={false}
                        />
                    </div>

                    <div
                        className="bg-black cursor-row-resize resizer2"
                        style={{ height: `${RESIZER_HEIGHT}px` }}
                        onMouseDown={startVerticalResizing}
                    />

                    <div
                        className=""
                        style={{ height: calculateBottomHeight(100 - topHeight) }}
                    >
                        <Result_case
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Examwindow