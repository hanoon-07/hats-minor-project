import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css'

import TempStartPage from './pages/TempStartPage'
import Exampage from './pages/Exampage';
import AfterSubmissionPage from './pages/AfterSubmissionpage'
import AfterExamPage from './pages/AfterExamPage';
import Layout from './Layout';
import CreateExam from './components/ExamCreation/ExamCreation'
import { Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store'
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path='' element={<TempStartPage/>}/>
            <Route path='editor/:examId' element={<Exampage/>}/>
            <Route path='check' element={<AfterSubmissionPage/>}/>
            <Route path='result' element={<AfterExamPage/>}/>
            <Route path='/create-exam/:classRoom' element={<CreateExam/>}/>
            {/* <Route path='' element={<AfterExamPage />} /> */}
        </Route>
    )
)

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)