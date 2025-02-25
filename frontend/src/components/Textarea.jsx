import React from 'react'

function Textarea() {
    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <div className="md:flex">
                <label
                    htmlFor="input"
                    className="block text-base md:text-lg font-semibold text-textGray md:w-24 md:pt-3 mb-2"
                >
                    Input
                </label>

                <textarea
                    id="input"
                    className="bg-darkGray text-textGray w-full min-h-[120px] mt-1 md:mt-0 p-3  rounded-md shadow-sm text-sm md:text-base outline outline-1 outline-buttonGray"
                    placeholder="Enter your text here..."
                />
            </div>
        </div>
    )
}

export default Textarea