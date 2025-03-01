import React from 'react'
import { useEffect } from 'react';
function Codeflowanim({setLoading=null}) {
    useEffect(() => {
        const texts = ['CODEFLOW'];
        let textIndex = 0;
        let charIndex = 0;
        const typingSpeed = 80;
        const textElement = document.getElementById('text');

        textElement.textContent = '';

        function type() {
            if (charIndex < texts[textIndex].length) {
                textElement.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingSpeed);
            }
            else {
                setTimeout(() => textElement.textContent = '', 170);
                if (setLoading) setLoading(0)
            }
        }

        setTimeout(() => {
            type();
        }, 500);

    }, []);
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div
                id="text"
                className="orbitron-font text-white text-4xl font-bold"
                style={{
                    minHeight: '60px',
                    paddingRight: '8px',
                    display: 'inline-block'
                }}
            ></div>
        </div>

    )
}

export default Codeflowanim