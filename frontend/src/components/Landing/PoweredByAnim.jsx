import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import CodeflowPowerLogo from '../../assets/codeflow_power.svg'
import ReactLogo from '../../assets/react_logo.svg'
import PostGreLogo from '../../assets/sql_postgre.svg'
import SocketLogo from '../../assets/socket_logo.svg'
import ReduxLogo from '../../assets/redux_logo.svg'
import ExpressLogo from '../../assets/express_logo.svg'
import NodeLogo from '../../assets/node_logo.svg'

export const PoweredByAnim = ({setAnimState}) => {
    
    useEffect(() => {

        const timeOUt = setTimeout(() => {
            setAnimState((prev) => ((prev + 1) % 4));
        }, 6000);

        return () => {
            clearTimeout(timeOUt);
        }

    }, []);
  
    return (
    <motion.div
      className="h-full w-full grid place-content-center absolute "
      exit={{ opacity: 0 }}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
        className="h-[500px] w-[500px]  relative rounded-full mt-[-100px] grid place-content-center"
      >
        <div className="absolute top-0 left-[200px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            src={ReactLogo}
          ></motion.img>
        </div>

        <div className="absolute top-[90px] right-[30px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            src={PostGreLogo}
          ></motion.img>
        </div>

        <div className="absolute top-[90px] left-[30px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            src={NodeLogo}
          ></motion.img>
        </div>

        <div className="absolute bottom-0 left-[200px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            src={ReduxLogo}
          ></motion.img>
        </div>

        <div className="absolute bottom-[90px] left-[370px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            src={SocketLogo}
          ></motion.img>
        </div>

        <div className="absolute bottom-[90px] left-[30px]">
          <motion.img
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 16 }}
            src={ExpressLogo}
          ></motion.img>
        </div>
        
      </motion.div>
      <div className="absolute top-[160px] left-[170px]">
        <img src={CodeflowPowerLogo}></img>
      </div>
    </motion.div>
  );
}
