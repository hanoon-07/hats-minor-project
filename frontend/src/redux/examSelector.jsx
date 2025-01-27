
import { createSelector } from "reselect";


const questionData = (state) => state['exam-data'].questions[state['exam-data'].selected];


export const selectSourceCode = createSelector(
    [questionData],
    (question) => {
        if (!question) return ""; 
        return question.codeValues?.[question.selected] || "";
    }
);

export const selectCodeValues = createSelector(
    [questionData], 
    (question) => {
        if (!question) return []; 
        return question.codeValues || []; 
    }
);

export const selectInputs = createSelector(
    [questionData],
    (questionData) => {
        if(!questionData) return [];
        return questionData.testCases.input || [];
    }
)

export const selectResult = createSelector(
    [questionData],
    (questionData) => {
        if(!questionData) return null;
        return questionData.testResult;
    }
);  

export const selectOutputs = createSelector(
    [questionData], 
    (questionData) => {
        if(!questionData) return [];
        return questionData.testCases.output || [];
    }
)