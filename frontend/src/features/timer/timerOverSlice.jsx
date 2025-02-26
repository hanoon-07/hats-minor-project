import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTimerOver : false
}

const timerReducer = createSlice({
    name:'timer-over',
    initialState,
    reducers:{
        changeTimerStatus(state, actions) {
            state.isTimerOver = actions.payload;
        }
    }
})

export default timerReducer.reducer;
export const {changeTimerStatus} = timerReducer.actions;