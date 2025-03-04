import React, { useEffect, useState } from "react";
import { Movebutton } from "../components/Movebutton";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const TempStartPage = () => {

    const [examId, setExamId] = useState("")
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(() => {
        const msg = sessionStorage.getItem("errorMsg");
        sessionStorage.removeItem("errorMsg"); 
        return msg || "";
    });
    
    
    function startExam() {
        if(examId.length == 0) return;
        const num = Number(examId);
        if(!Number.isInteger(num)) return;
        navigate(`/editor/${examId}`, {state: {}}); 
    }

    const [loading, setLoading] = useState(false);
    const [examHeaders, setExamHeaders] = useState(null);

    useEffect(() => {
        setLoading(true);
        //get exam headers from backend
        async function getHeaders() {
            const response = await axios.get('http://localhost:3000/exam-header');
            console.log(response.data.data);
            setExamHeaders(response.data.data);
            setLoading(false);
        }
        getHeaders();

    }, []);

    function getExamHeaders(item) {
        return <div className="outline outline-1 outline-[#A8FF53] px-2"><p className="text-white text-center">{item.name} id: {item.exam_id}</p></div>
    }

    return (
        <>
            <div className="h-screen  w-screen  bg-black flex box-border flex-col items-center pt-[56px]">
                <div className="w-[400px] flex flex-col text-[1.3rem] gap-[3rem]">
                    <h1><span className="text-white font-semibold orbitron-font">CODE FLOW - </span> <span className="text-white font-semibold">EXAM</span></h1>
                
                    <div className="flex flex-col gap-4">
                        <p className="text-white font-light text-[1.2rem]">Enter the exam code</p>
                        <div className="flex flex-row gap-2">
                            <input  value={examId} 
                            onChange={(e) => {setExamId(e.target.value)}}
                            type="text" placeholder="exam code" className="selection:bg-[#212B1D] font-normal h-[2rem] min-w-[230px] rounded-[5px] bg-[#3B3E45] block grow py-1.5 pr-3 pl-1 text-base text-[#A8FF53] placeholder:text-gray-400 focus:outline-none text-[1.1rem]"/>
                            <Movebutton label={"start exam"} 
                            action={() => {startExam();}}/>
                        </div>
                        <div className="flex flex-row gap-2">
                            <Movebutton label={"return home"} direction={"left"}/>
                            <Movebutton action={() => {navigate('/create-exam/test-classroom')}} label={'create exam'} direction={'right'} extraStyleDiv={' bg-blue-500 hover:bg-blue-400 '}></Movebutton>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[#F43F5E] font-light text-[1.1rem]"></p>
                            {errorMsg != "" && <p className="text-[#F43F5E] font-normal text-sm mb-4">{errorMsg}</p>}
                            
                        </div>
                    </div>
                </div>
                
                <div className="ml-0 w-[400px] flex flex-col items-center h-[350px] bg-gray-900 rounded-md">
                    <p className="text-[#A8FF53] mt-2">created exams</p>

                    <div className="flex flex-col flex-wrap min-w-[90%] max-w-[100%] h-[90%] p-2 gap-4">
                        {loading && <p className="text-white text-sm font-normal text-center">getting details...</p>}
                        {examHeaders != null ? examHeaders.map(getExamHeaders):null}
                    </div>
                </div>     
            </div>
        </>
    )
}


export default TempStartPage