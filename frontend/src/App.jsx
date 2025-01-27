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
            {/* <div className='w-screen h-screen grid place-content-center'>
                <Loadinganimation length={'50'}/>
            </div> */}

            {/* <Textarea />
            <Input /> */}

        </Provider>
    )
}

export default App;
