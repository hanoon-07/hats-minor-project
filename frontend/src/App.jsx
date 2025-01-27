import React from 'react'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'



import Exampage from './pages/Exampage'
import Loadinganimation from './components/animation/Loadinganimation'

const App = () => {



    return (
        <Provider store={store}>

            <Exampage />
            {/* <div className='w-screen h-screen grid place-content-center'>
                <Loadinganimation length={'50'}/>
            </div> */}


        </Provider>
    )
}

export default App;
