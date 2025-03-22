import { createSlice } from "@reduxjs/toolkit";
import reducer from "../examwindow/examSlice";

const initialState = {
    classId: null
}

// const codeRunReducer = createSlice({
//     name: 'code-run',
//     initialState,
//     reducers: {
//         changeStatus(state, actions) {
//             state.isRunning = actions.payload;
//         },      
//     }
// })

const classReducer = createSlice({
    name: 'class-data',
    initialState,
    reducers: {
        changeClass(state, actions) {
            state.classId = actions.payload;
        },
    }
})

export const classDataReducer =  classReducer.reducer;
export const {changeClass} = classReducer.actions;