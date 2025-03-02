import React, { useState } from 'react'
import AfterSubmissionpage from './AfterSubmissionpage'
import Exampage from './Exampage'
import { useSelector } from 'react-redux'


function FullExampage({}) {

    const status = useSelector((state) => state['timer-over'].isTimerOver)
    const [finish, setFinish] = useState(false);
    return (
        <div>
            
            {!status && !finish && <Exampage setFinish={setFinish}/>}
            {(status || finish) && <AfterSubmissionpage />}
        </div>
    )
}

export default FullExampage