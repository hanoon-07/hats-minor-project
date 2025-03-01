import React, { useState } from "react";
import { Movebutton } from "../components/Movebutton";
import { useNavigate } from "react-router-dom";

const TempStartPage = () => {

    const [examId, setExamId] = useState("")
    const navigate = useNavigate();

    return (
        <>
            <div className="h-full w-full bg-black flex box-border justify-center pt-[56px]">
                <div className="w-[400px] flex flex-col text-[1.3rem] gap-[6rem]">
                    <h1><span className="text-white font-semibold ">CODE FLOW - </span> <span className="text-[#A8FF53] font-semibold">EXAM</span></h1>
                
                    <div className="flex flex-col gap-4">
                        <p className="text-white font-light text-[1.2rem]">Enter the exam code</p>
                        <div className="flex flex-row gap-2">
                            <input  value={examId} 
                            onChange={(e) => {setExamId(e.target.value)}}
                            type="text" placeholder="exam code" className="selection:bg-[#212B1D] font-normal h-[2rem] min-w-[230px] rounded-[5px] bg-[#3B3E45] block grow py-1.5 pr-3 pl-1 text-base text-[#A8FF53] placeholder:text-gray-400 focus:outline-none text-[1.1rem]"/>
                            <Movebutton label={"start exam"} 
                            action={() => { navigate(`/editor/${examId}`) }}/>
                        </div>
                        <div>
                            <Movebutton label={"return home"} direction={"left"}/>
                        </div>
                        <div>
                            <p className="text-[#F43F5E] font-light text-[1.1rem]"></p>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}


export default TempStartPage