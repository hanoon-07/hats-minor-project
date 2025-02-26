import {configureStore} from '@reduxjs/toolkit'
import {editorSettingsReducer} from '../features/editor/SettingsSlice'; 
import examReducer from '../features/examwindow/examSlice';
import codeReducer from '../features/coderun/codeRunSlice'
import timerReducer from '../features/timer/timerOverSlice'

const store = configureStore({
    reducer: {
        'editor-settings': editorSettingsReducer,
        'exam-data': examReducer,
        'code-run': codeReducer,
        'timer-over': timerReducer,
    }
});

export {store};