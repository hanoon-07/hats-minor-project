import {configureStore} from "@reduxjs/toolkit";
import {editorSettingsReducer} from "../features/editor/SettingsSlice";
import examReducer from "../features/examwindow/examSlice";
import codeReducer from "../features/coderun/codeRunSlice";
import authReducer from "../features/authControl/authSlice";
import {classDataReducer} from "../features/Class Data/classDataSlice";

const store = configureStore({
  reducer: {
    "editor-settings": editorSettingsReducer,
    "exam-data": examReducer,
    "code-run": codeReducer,
    "auth-control": authReducer,
    "class-data": classDataReducer
  },
});

export {store};
