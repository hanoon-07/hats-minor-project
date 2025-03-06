import React from 'react'
import { motion } from 'framer-motion'

export const LoadingRing = () => {
    return (
        <div className='z-30 h-screen w-screen absolute top-0 left-0 grid place-content-center'>
            <div className="flex items-center justify-center w-[140px] h-[140px] rounded-md  bg-black/50">
                <motion.div
                    className="w-12 h-12 border-4 border-[#A8FF53] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
             </div>
        </div>
    )
}
