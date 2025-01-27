
import { createSelector } from "reselect";


const questionData = (state) => state['exam-data'].questions[state['exam-data'].selected];
const allquestions = (state) => state['exam-data'].questions

export const selectQuestions = createSelector([allquestions], (questions) => {
    return questions;
});

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
);

export const selectLangs = createSelector(
    [allquestions], 
    (questions) => {
        if(!questions) return ['java'];
        return questions[0].languages;
    }
);

export const selectAllQuestions = createSelector(
    [allquestions],
    (questions) => {
        if(!questions) return null;
        var tempArr = [];
        questions.map((item) => {
            tempArr.push(item.questionDetails);
        });
        return tempArr;
    }
)