import {configureStore} from '@reduxjs/toolkit'
import {editorSettingsReducer} from '../features/editor/SettingsSlice'; 
import examReducer from '../features/examwindow/examSlice';
import codeReducer from '../features/coderun/codeRunSlice'


const store = configureStore({
    reducer: {
        'editor-settings': editorSettingsReducer,
        'exam-data': examReducer,
        'code-run': codeReducer,
    }
});

export {store};