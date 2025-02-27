import React from 'react';  
import {motion} from 'framer-motion';

const Loadinganimation = ({length}) => {
    
    // var colors = [ '#00D494', '#53BEBE', '#1581BC'];

    // function getParticle(item, index) {
    //     return <motion.div style={{width: length+'px', height: length+'px', borderRadius: '50%', background: item}}
    //         initial={{y: 0}} animate={{y: [0, Math.floor(length*1.8), 0]}}
    //         transition={{
    //             duration: 0.7,
    //             repeat: Infinity,
    //             delay: index * 0.2, 
    //             ease: 'linear',
    //         }}
    //     >
    //     </motion.div>
    // }

    return (
        // <div className='flex flex-row' style={{gap: `${Math.floor(length * 0.8)}px`}}>
        //     {colors.map(getParticle)}
        // </div>
        <>
            <div className='loaderSmall' style={{scale: 0.1}}></div>
        </>
    )
}

export default Loadinganimation
