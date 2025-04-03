import React from 'react'
import { StudentNav } from './StudentNav'

import { useState } from 'react'
import Classes from './Classes'
import Dashboard from './Dashboard'
import Results from './Results'
import { useParams } from 'react-router-dom'





function StudentDash() {
    const [selected, setSelected] = useState('dashboard')
 
    const {studentId} = useParams()

    return (
        <div className='h-screen bg-[#15171a]'>
            <div className="bg-[#1a1b1f] h-[60px] p-3 flex flex-row justify-between items-center w-[25%]">
                <div className=" text-lg font-bold orbitron-font ">CODEFLOW</div>
            </div>
            <div className='flex h-[calc(100%-60px)]'>
                <StudentNav selected={selected} setSelected={setSelected}/> 
                <div className='w-[75%]'>
                    {selected=='dashboard'&&<Dashboard id={studentId} changer={setSelected}/>}
                    {selected=='classes'&&<Classes/>}
                </div>
            </div>
        </div>
    )
}

export default StudentDash