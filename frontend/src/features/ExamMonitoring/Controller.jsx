import React, { useEffect, useState } from 'react'

export const Controller = ({report, setReport, setType}) => {
  
    

    useEffect(() => {
        if (report) return;
        
        let lastTime = performance.now();
    
        const checkVisibility = () => {
          if (report) return;
          
          const now = performance.now();
          const delta = now - lastTime;
    
          if(!document.hasFocus()) {
            setReport(true);
            setType('tab switch detected!');  
          } else if(delta > 500) {
            setReport(true);
            setType('overlay applications found!');
          }

          lastTime = now;
          requestAnimationFrame(checkVisibility);
        };
        requestAnimationFrame(checkVisibility);
        
    }, [report]);
      
    return null //this component return no ui element 
}
