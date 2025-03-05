import React from 'react'
import { motion } from 'framer-motion'

export const LoadingRingSmall = () => {
    return (
        <div className='z-30 h-full w-full absolute top-0 left-0 grid place-content-center'>
            <div className="flex items-center justify-center w-[60px] h-[60px] rounded-md  bg-black/50">
                <motion.div
                    className="w-7 h-7 border-2 border-[#A8FF53] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
             </div>
        </div>
    )
}
