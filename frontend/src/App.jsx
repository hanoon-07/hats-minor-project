import React from 'react'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'



import Exampage from './pages/Exampage'

const App = () => {



    return (
        <Provider store={store}>

            <Exampage />

        </Provider>
    )
}

export default App;
