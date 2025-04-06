import React from 'react'
import { StudentNav } from './StudentNav'

import { useState } from 'react'
import Classes from './Classes'
import Dashboard from './Dashboard'
import Results from './Results'
import { useParams } from 'react-router-dom'





function StudentDash() {
    const [selected, setSelected] = useState('dashboard')

    const { studentId } = useParams()

    return (
        <div className='h-screen bg-[#15171a]'>
            <div className='flex justify-between items-center'>
                <div className="bg-[#1a1b1f] h-[60px] p-3 flex flex-row justify-between items-center w-[25%]">
                    <div className="text-lg font-bold orbitron-font text-white">CODEFLOW</div>
                </div>

                {selected !== 'dashboard' && (
                    <button
                        className="px-4 py-2 bg-[#272a2e] text-[#c1c4c7] rounded-md border border-[#474aa5] hover:bg-[#1a1b1f] hover:text-white transition-all duration-200 flex items-center gap-2 mr-4"
                        onClick={() => {
                            if (selected === 'exam') {
                                setSelected('classes');
                            } else if (selected === 'classes') {
                                setSelected('dashboard');
                            }
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                )}
            </div>
            <div className='flex h-[calc(100%-60px)]'>
                <StudentNav selected={selected} setSelected={setSelected} />
                <div className='w-[75%]'>
                    {selected == 'dashboard' && <Dashboard id={studentId} changer={setSelected} />}
                    {(selected == 'classes' || selected == 'exam') && <Classes selected={selected} setSelected={setSelected} />}
                </div>
            </div>
        </div>
    )
}

export default StudentDash