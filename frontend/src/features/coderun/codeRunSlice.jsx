import { createSlice } from "@reduxjs/toolkit";
import { batchRun } from "../../utils/CodeRunner";

const initialState = {
    isRunning: false
}

const codeRunReducer = createSlice({
    name: 'code-run',
    initialState,
    reducers: {
        changeStatus(state, actions) {
            state.isRunning = actions.payload;
        },      
    }
})

export default codeRunReducer.reducer;
export const {changeStatus} = codeRunReducer.actions;