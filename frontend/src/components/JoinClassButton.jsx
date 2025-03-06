import React from 'react'

export const JoinClassButton = ({ onClick, extraStyleDiv = '' }) => {
    return (
        <button 
            onClick={onClick}
            className={`
                flex items-center justify-center 
                bg-[#A8FF53] 
                text-black 
                rounded-sm 
                px-4 
                py-2 
                hover:opacity-90 
                transition-opacity 
                duration-300 
                ${extraStyleDiv}
            `}
        >
            <span className='mr-2 text-xl font-bold'>+</span>
            Join Class
        </button>
    )
}