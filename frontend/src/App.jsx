import React from 'react'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Textarea from './components/Textarea'
import Exampage from './pages/Exampage'
import Input from './components/Input'
import Loading from './components/animation/Loading'
import AfterSubmissionpage from './pages/AfterSubmissionpage'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import FullExampage from './pages/fullExampage'
import { TempStartPage } from './pages/TempStartPage'

const App = () => {

    // these are some temp code for presentation
    // only one exam is present with id '1234a'
    const [state, setState] = useState('waiting');
    const [examId, setExamId] = useState('');

    function startExam() {
        if(examId == '1234a') {
            setState('exam');
            // console.log("exam starts");
        }
        else return "No exam exists! (invalid code)"
    }

    return (
        <Provider store={store}>
            {(state == 'exam') &&<FullExampage/>}
            {(state == 'waiting') && <TempStartPage setExamId={setExamId} startExam={startExam}/>}
        </Provider>
    )
}

export default App;
