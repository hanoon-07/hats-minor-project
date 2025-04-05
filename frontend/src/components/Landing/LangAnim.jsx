import React, { useEffect } from 'react'
import PythonLogo from '../../assets/python_logo.svg'
import { motion } from 'framer-motion'
import CppLogo from '../../assets/cpp_logo.svg'
import JavaLogo from '../../assets/java_logo.svg'
import CLogo from '../../assets/c_logo.svg'

export const LangAnim = ({setAnimState}) => {

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setAnimState((prev) => ((prev + 1) % 4));
        }, 6000);

        return () => {
            clearTimeout(timeOut);
        }
    })

    return (
      <motion.div className="h-full w-full absolute " exit={{opacity: 0}}>
        <motion.div className='top-[140px] left-[130px] relative' initial ={{ opacity: 0}} animate={{opacity: 1}}>
            <motion.img
            src={PythonLogo}
            animate={{ y: [0, -20, 0], rotate: [0, 2, -10, 0] }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            ></motion.img>
        </motion.div>

        <motion.div className='top-[140px] left-[200px] relative' initial ={{scale: 0.4, opacity: 0}} animate={{scale: 1,opacity: 1}}>
            <motion.img
            src={CppLogo}
            animate={{ y: [0, -20, 0], rotate: [0, 2, -10, 0] }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            ></motion.img>
        </motion.div>

        <motion.div className='top-[-200px] left-[240px] relative' initial ={{scale: 0.4, opacity: 0}} animate={{scale: 1,opacity: 1}}>
            <motion.img
            src={JavaLogo}
            animate={{ y: [0, -20, 0], rotate: [0, 2, -10, 0] }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            ></motion.img>
        </motion.div>

        <motion.div className='top-[-240px] left-[340px] relative' initial ={{scale: 0.4, opacity: 0}} animate={{scale: 1,opacity: 1}}>
            <motion.img
            src={CLogo}
            animate={{ y: [0, -20, 0], rotate: [0, 2, -10, 0] }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            ></motion.img>
        </motion.div>
      </motion.div>
    );
}
