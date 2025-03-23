import React from 'react'
import { StudentNav } from './StudentNav'

import { useState } from 'react'
import Classes from './Classes'
import Dashboard from './Dashboard'




function StudentDash() {
    const [selected, setSelected] = useState('dashboard')

    return (
        <div className='h-screen'>
            <div className="h-[60px] p-3 ml-3 flex flex-row justify-between items-center ">
                <p className="orbitron-font">CODE FLOW</p>
            </div>
            <div className='flex h-[calc(100%-60px)]'>
                <StudentNav selected={selected} setSelected={setSelected}/> 
                <div className='w-[75%] '>
                    {selected=='dashboard'?<Dashboard/>:<Classes/>}
                </div>
            </div>
        </div>
    )
}

export default StudentDash