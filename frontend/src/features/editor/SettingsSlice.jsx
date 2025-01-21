import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fontSize: 17,
    theme: 'atom-one-dark',
}


const editorSettingsSlice = createSlice({
    name: 'editor-settings',
    initialState,
    reducers: {
        changeTheme(state, actions) {
            state.theme = actions.payload;
        },
        changeFontSize(state, actions) {
            state.fontSize = actions.payload;
        }
    }
});

export const editorSettingsReducer = editorSettingsSlice.reducer;
export const {changeTheme, changeFontSize} = editorSettingsSlice.actions;