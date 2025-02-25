import React from 'react'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Textarea from './components/Textarea'
import Exampage from './pages/Exampage'
import Input from './components/Input'
import Loading from './components/animation/Loading'

const App = () => {


    return (
        <Provider store={store}>
            <Exampage />
        </Provider>
    )
}

export default App;
