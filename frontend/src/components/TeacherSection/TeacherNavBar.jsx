import React, { useRef, useEffect, useState } from 'react'
import { Movebutton } from '../Movebutton'
import { motion, AnimatePresence } from 'framer-motion'


export const TeacherNavBar = ({selected = 'classes', setSelected, setOpen, clearClass, showingClass, currentClass}) => {

    const navBarDiv = useRef(null); 
    const [openHere, setOpenHere] = useState(true);

    const handleClickOutside = (event) => {
        if (navBarDiv.current && !navBarDiv.current.contains(event.target)) {
            setOpenHere(false)
            setOpen(false);
        }
    };
    
    useEffect(() => {
        
        // document.addEventListener("mousedown", handleClickOutside);
            
        // return () => {
        //     document.removeEventListener("mousedown", handleClickOutside);
        // };    
    }, []);

    return (
        <AnimatePresence>
            {openHere && <motion.div exit={{opacity: 0.6, x: -100}} ref={navBarDiv} initial={{x: -100, opacity: 0.7}} animate={{opacity: 1, x: 0}} transition={{ease: 'easeIn', duration: 0.1}} className='h-screen pl-2 md:min-w-[300px] min-w-[100%] bg-[#1a1b1f] flex flex-col outline outline-1 outline-[#212327]'>
                <div className='h-[40px] mt-2 pr-2 flex flex-row justify-between items-center '>
                    <p className='orbitron-font'>CODE FLOW</p>
                </div>

                <div className='flex flex-row gap-2 items-center outline outline-1 outline-[#212327] p-2 mr-2'>
                    <div className='h-[40px] w-[40px] rounded-sm bg-[#3b82f6] grid place-content-center'>
                        <p className='text-white font-bold text-2xl'>T</p>
                    </div>
                    <div className='text-2xl '>
                        <h1 className='text-white tracking-tighter'>Tom Sebastian</h1>
                        <p className='text-sm text-[#A8FF53]'>active</p>
                    </div>
    
                </div>

                <div className='w-full flex flex-col h-[70%] gap-2 mt-4 justify-between'>
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => {setSelected('profile'); clearClass()}} className={`p-2 mr-2 rounded-sm text-[#c1c4c7] text-lg text-start hover:bg-[#272a2e] ${selected == 'profile'?"bg-[#A8FF53] hover:bg-[#A8FF53] text-black":null}`}>👤 profile</button>
                        <button onClick={() => {if(showingClass) {setSelected('classes'); clearClass()} else {setSelected('classes')}}} className={`p-2 mr-2 rounded-sm text-[#c1c4c7] text-lg text-start hover:bg-[#272a2e] ${selected == 'classes' && !showingClass?"bg-[#A8FF53] hover:bg-[#A8FF53] text-black":null}`}>📚 classes</button>
                        {showingClass && <button className={`p-2 mr-2 rounded-sm text-[#c1c4c7] text-lg text-start hover:bg-[#272a2e] ${showingClass?"bg-[#A8FF53] hover:bg-[#A8FF53] text-black":null}`}>📓{currentClass.className}</button>}
                        
                    </div>
                </div>

                <div className='h-full w-full flex flex-col justify-end mb-2'>
                    <button className={`p-2 mr-2 rounded-sm text-[#f43f5e] text-lg text-start tracking-tighter hover:bg-[#f43f5e] hover:text-black`}>log out</button>
                </div>
            </motion.div>}
            {!openHere && 
                <div className='h-screen min-w-[100px] bg-[#1a1b1f]   flex flex-col outline outline-1 outline-[#212327] py-6 items-center'>
                    <div onClick={() => {setOpenHere(true); setOpen(true)}} className='hover:bg-[#A8FF53] text-[#c1c4c7] hover:text-black h-[40px] w-[40px] rounded-sm bg-[#272a2e] grid place-content-center'>
                        <p className='text-2xl'>☰</p>
                    </div>
                </div>
            }
        </AnimatePresence>
    )
}
