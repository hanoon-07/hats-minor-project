import React from 'react'
import AfterSubmissionpage from './AfterSubmissionpage'
import Exampage from './Exampage'
import { useSelector } from 'react-redux'


function FullExampage() {

    const status = useSelector((state) => state['timer-over'].isTimerOver)
    return (
        <div>
            {!status && <Exampage />}
            {status && <AfterSubmissionpage />}
        </div>
    )
}

export default FullExampage