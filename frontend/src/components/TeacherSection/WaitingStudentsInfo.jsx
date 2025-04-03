import React from 'react'
import { motion } from 'framer-motion'

export const WaitingStudentsInfo = ({setWaitingStudents ,waitingStudentInfo = [{rollNo: 12, type: 'unknown', name: 'tom'},  {rollNo: 12, type: 'unknown', name: 'tom'}], setShowWindow, socket, examId}) => {
    
    function removeWaiting(rollNo, examId) {
        socket.emit('remove-waiting', {
            rollNo: rollNo,
            examId: examId
        });
        setWaitingStudents(prevStudents =>
            prevStudents.filter(student => student.rollNo !== rollNo)
        );
    }
    
    return (
        <div className='h-screen z-50 w-screen bg-[#15171a]/90 grid place-content-center absolute top-0 left-0'>
            <motion.div initial={{y: -10}} animate={{y: 10}} className='box-border p-2 gap-2 flex flex-col w-[500px] min-h-[400px] max-h-[600px] overflow-y-scroll bg-[#1A1B1F] outline outline-1 outline-[#484d57] rounded-sm'>
                <div className='flex flex-row justify-between'>
                    <p className='px-2 text-yellow-300'>Give permission to continue</p>
                    <CloseLogo setShowWindow={setShowWindow}/>
                </div>

                <div className='flex flex-col gap-1'>
                    {waitingStudentInfo.map((item) => {

                        return <>
                            <div className='w-full rounded-sm h-[40px] bg-[#1F2123] items-center justify-between box-border px-2  flex flex-row gap-3'>
                                <div className='flex flex-row items-center gap-3'>
                                    <p className='text-[#C1C4C7]'>{item.name}</p>
                                    <p className='text-[#A8FF53]'>{item.rollNo}</p>
                                    <p className='text-[#F43F5E]'>{item.type}</p>
                                </div>

                                <div onClick={() => {removeWaiting(item.rollNo, examId)}} className='w-[70px] grid place-content-center hover:bg-[#456C20] cursor-pointer h-[22px] rounded-sm bg-[#A8FF53]'>
                                    <p className='text-sm translate-y-[-1px]'>allow</p>
                                </div>
                            </div>
                        </>
                    })}
                </div>
            </motion.div>
        </div>
    )
}

function CloseLogo({setShowWindow}) {
    return <div className='hover:scale-105' onClick={() => {setShowWindow(false)}}>
        <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.40994 8.00019L15.7099 1.71019C15.8982 1.52188 16.004 1.26649 16.004 1.00019C16.004 0.733884 15.8982 0.478489 15.7099 0.290185C15.5216 0.101882 15.2662 -0.00390625 14.9999 -0.00390625C14.7336 -0.00390625 14.4782 0.101882 14.2899 0.290185L7.99994 6.59019L1.70994 0.290185C1.52164 0.101882 1.26624 -0.00390601 0.999939 -0.00390601C0.733637 -0.00390601 0.478243 0.101882 0.289939 0.290185C0.101635 0.478489 -0.00415253 0.733884 -0.00415254 1.00019C-0.00415254 1.26649 0.101635 1.52188 0.289939 1.71019L6.58994 8.00019L0.289939 14.2902C0.19621 14.3831 0.121816 14.4937 0.0710478 14.6156C0.0202791 14.7375 -0.00585938 14.8682 -0.00585938 15.0002C-0.00585938 15.1322 0.0202791 15.2629 0.0710478 15.3848C0.121816 15.5066 0.19621 15.6172 0.289939 15.7102C0.382902 15.8039 0.493503 15.8783 0.615362 15.9291C0.737221 15.9798 0.867927 16.006 0.999939 16.006C1.13195 16.006 1.26266 15.9798 1.38452 15.9291C1.50638 15.8783 1.61698 15.8039 1.70994 15.7102L7.99994 9.41018L14.2899 15.7102C14.3829 15.8039 14.4935 15.8783 14.6154 15.9291C14.7372 15.9798 14.8679 16.006 14.9999 16.006C15.132 16.006 15.2627 15.9798 15.3845 15.9291C15.5064 15.8783 15.617 15.8039 15.7099 15.7102C15.8037 15.6172 15.8781 15.5066 15.9288 15.3848C15.9796 15.2629 16.0057 15.1322 16.0057 15.0002C16.0057 14.8682 15.9796 14.7375 15.9288 14.6156C15.8781 14.4937 15.8037 14.3831 15.7099 14.2902L9.40994 8.00019Z" fill="#F43F5E"/>
        </svg>
    </div>
}