import React from 'react'

export const ResultBox = ({studentData ={name: 'tom sebastian', rollNo: 65, present: false, codeValues:['null check', 'null check']}}) => {
    if(studentData.present) { return (<div className='w-full  h-[50px] box-border p-1'>
            <div className='w-full h-full outline-1 outline outline-[#57862A] flex flex-row'>
                <div className='w-[200px] h-full grid place-content-center'>
                    <p className='text-[#A8FF53] font-light text-xl text-center'>{studentData.name}</p>
                </div>
                <div className='w-[100px] h-full grid place-content-center'>
                    <p className='text-[#A8FF53] font-light text-xl text-center'>{studentData.rollNo}</p>
                </div>
                <div className='w-[200px] h-full grid place-content-center'>
                    <p className='text-[#A8FF53] font-light text-xl text-center'>{studentData.universityId}</p>
                </div>

                <div className='w-[100px] h-full grid place-content-center'>
                    <p className='text-[#3B82F6] font-light text-xl text-center'>{studentData.score}</p>
                </div>
                <div className='w-[100px] h-full grid place-content-center'>
                    <p className='text-[#3B82F6] text-xl font-light text-center'>{studentData.testPassed}</p>
                </div>
                <div className='w-[100px] h-full grid place-content-center'>
                    <p className='text-[#3B82F6] text-xl font-light text-center'>{studentData.totalTest}</p>
                </div>

                <div className='w-[150px] h-full grid place-content-center'>
                    <p className='text-[#A8FF53] font-light text-xl text-center'>partial output</p>
                </div>

                <div className='w-[150px] h-full grid place-content-center'>
                    <p className='text-[#A8FF53] font-light text-xl text-center'>student code</p>
                </div>
                
            </div>
        </div>)
    } else {
        return (<div className='w-full  h-[50px] box-border p-1'>
            <div className='w-full h-full outline-1 outline outline-[#f43f5e] flex flex-row'>
                <div className='w-[200px] h-full grid place-content-center'>
                    <p className='text-[#f43f5e] font-light text-xl text-center'>{studentData.name}</p>
                </div>
                <div className='w-[100px] h-full grid place-content-center'>
                    <p className='text-[#f43f5e] font-light text-xl text-center'>{studentData.rollNo}</p>
                </div>
                <div className='w-[200px] h-full grid place-content-center'>
                    <p className='text-[#f43f5e] font-light text-xl text-center'>{studentData.universityId}</p>
                </div>
                <div className='w-[400px] h-full grid place-content-center'>
                    <p className='text-[#f43f5e] font-light text-xl text-center'>{'absent'}</p>
                </div>

            </div>
        </div>)
    }
}
