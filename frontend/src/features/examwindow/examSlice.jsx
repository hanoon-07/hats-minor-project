import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [
        /* array of objects in the form
        
            {
                questionDetails: {
                    'questionname': {
                        title: -

                    }
                },
                languages: [...]
                codeValues: [...]
                selected: 0 -> langauage selected
                testCases: {
                    input:  [,]
                    output: [,]
                },
                testResult: {
                    stdErr:[],
                    stdOut:[]
                }
            }, 
            
            {
                ....
            }
        
        */
    ],
    selected: 0 //i number value eg. 0 1 2 (representing question of selection)
    ,initialized: false,
    proposedTime:0
}


const examDetailsReducer = createSlice({
    name: 'exam-data',
    initialState,
    reducers: {
        initialize(state, actions) {
            state.questions = actions.payload.questionDetails,
            state.selected = actions.payload.selected
            state.initialized = true;      
            state.proposedTime = actions.payload.proposedTime     
        },
        setSelected(state, acitons) {
            state.selected = acitons.payload;
        },
        updateCode(state, actions) {
            
            const { value, language } = actions.payload;
        
            
            if (!state.initialized) {
                console.error("State is not initialized. Cannot update code.");
                return;
            }
        
            
            const selectedQuestion = state.questions[state.selected];
            if (!selectedQuestion) {
                console.error(`No question found for the selected index: ${state.selected}`);
                return;
            }
        
           
            const languageIndex = selectedQuestion.languages.findIndex((lang) => lang === language);
            if (languageIndex === -1) {
                console.error(`Language "${language}" not found in the question's languages.`);
                return;
            }
        
            
            selectedQuestion.codeValues = [
                ...selectedQuestion.codeValues.slice(0, languageIndex),
                value,
                ...selectedQuestion.codeValues.slice(languageIndex + 1),
            ];
        }, updateSelectedLang(state, actions) {
            
            const language = actions.payload;
            
            const selectedQuestion = state.questions[state.selected];
            

            
            selectedQuestion.selected = language;
        }, addResult(state, actions) {

            const stdErr = actions.payload.stdErr || [];
            const stdOut = actions.payload.stdOut || [];
            const selectedQuestion = state.questions[state.selected];

            selectedQuestion.testResult = {
                stdErr: stdErr,
                stdOut: stdOut
            }

        }
            
    }
});

export default examDetailsReducer.reducer;
export const {initialize, setSelected, updateCode, updateSelectedLang, addResult} = examDetailsReducer.actions;