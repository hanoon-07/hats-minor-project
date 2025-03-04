import React, { useEffect, useState } from 'react'
import { TeacherNavBar } from '../components/TeacherNavBar'
import { motion } from 'framer-motion';
import { Movebutton } from '../components/Movebutton';

export const Teacher = () => {

    const [selected, setSelected] = useState('classes');
    const [open, setOpen] = useState(false);

    
    return (
        <div className='h-screen w-screen flex flex-row bg-[#15171a]'>
            {<TeacherNavBar selected={selected} setSelected={setSelected} setOpen={setOpen}/>}
            {selected == 'classes' && <div className='h-screen w-full p-10'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between items-center'>
                        <h1 className='text-[#c1c4c7] text-3xl font-bold'>My Classes</h1>
                        
                    </div>

                    <div className='flex flex-row flex-wrap gap-3 mt-[20px] overflow-y-scroll max-h-[70vh]'>
                        
                        <motion.div initial={{y: -20}} animate={{y:0}} className='w-[250px] h-[150px] rounded-md bg-[#272a2e] hover:bg-[#212327] p-4 flex flex-col gap-2 justify-around'>
                            <p className='font-semibold text-lg text-[#c1c4c7]'>class name please</p>
                            <div>
                                <p className='text-[#c1c4c7]'><span className='font-bold text-2xl text-[#474aa5]'>45</span> students</p> 
                            </div>
                            <div className='w-[70%] h-[30px] bg-[#1a1b1f]  rounded-sm grid place-content-center'>
                                <p className='text-[#A8FF53]'>active exam: 1</p>
                            </div>
                        </motion.div>
                        
                    </div>

                    <div className='flex flex-row mt-6 gap-2'>
                        <Movebutton label={'create class'} extraStyleDiv={' rounded-sm '}/>
                        <Movebutton label={'delete class'} direction={'left'} extraStyleDiv={' rounded-sm '}/>
                    </div>

                    
                </div>
            </div>}
        </div>
    )
}
