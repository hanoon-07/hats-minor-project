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

const App = () => {

    
    return (
        <Provider store={store}>
            <FullExampage/>
        </Provider>
    )
}

export default App;
