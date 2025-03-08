import {configureStore} from "@reduxjs/toolkit";
import {editorSettingsReducer} from "../features/editor/SettingsSlice";
import examReducer from "../features/examwindow/examSlice";
import codeReducer from "../features/coderun/codeRunSlice";
import authReducer from "../features/authControl/authSlice";

const store = configureStore({
  reducer: {
    "editor-settings": editorSettingsReducer,
    "exam-data": examReducer,
    "code-run": codeReducer,
    "auth-control": authReducer,
  },
});

export {store};
