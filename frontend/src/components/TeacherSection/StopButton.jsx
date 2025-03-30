import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { LoadingRing } from "../animation/LoadingRing";

export const StopButton = ({examId, setRender, socket, setSelected}) => {

    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    async function stopExam() {
        //update the data base and inform the socket the exam is over
        //first inform the socket to stop the exam for every one, each not submited student will automatically finish
        setLoading(true);
        socket.emit('identify', {
            event: 'stop-exam',
            examId: examId
        });

        //update the backend db
        try {
            const response = await axios.get("http://localhost:3000/stopExam", {
                params: {
                    examId: examId
                }
            });

            //console.log(response.data);
        } catch(error) {
            console.log('update exam front end error!');
        } finally {
            setLoading(false);
            setConfirm(false);
            setRender((previous) => !previous);
            setSelected('classes');
        }

    }

    return (
        <>
            {loading && <LoadingRing />}
            {confirm && <div className="bg-black/30 backdrop-blur-[5px] top-0 left-0 absolute w-screen h-screen grid place-content-center">
                <motion.div initial={{y: -10}} animate={{y: 10}} className="w-[400px] gap-2 flex flex-col items-center box-border py-10 rounded-sm  h-[240px] bg-[#1b1d1f] outline outline-1 outline-[#484d57]">
                    <p className="text-[#A8FF53] text-lg">Are you sure, stop the exam ?</p>
                    <p className="px-6 text-center text-[#3B82F6]">this is will stop the exam for all students, make sure all finished</p>
                
                    <div className="flex flex-row w-full justify-center gap-10">
                        <div onClick={stopExam} className="cursor-pointer w-[90px] gap-2 h-[30px] rounded-sm box-border mr-[4px] mt-[22px] px-2 bg-[#f43f5e] hover:bg-[#B12940] flex items-center justify-center">
                            <p>stop</p>
                        </div>

                        <div onClick={() => setConfirm(false)} className="cursor-pointer w-[90px] gap-2 h-[30px] rounded-sm box-border mr-[4px] mt-[22px] px-2 bg-[#A8FF53] hover:bg-[#456C20] flex items-center justify-center">
                            <p>cancel</p>
                        </div>
                    </div>
                </motion.div>
            </div>}

            <motion.div
                onClick={() => {setConfirm(true);}}
                whileHover={"hover"}
                className="cursor-pointer w-[115px] gap-2 h-[30px] rounded-sm box-border mr-[4px] mt-[22px] px-2 bg-[#f43f5e] hover:bg-[#B12940] flex flex-row items-center"
            >
                <p>stop exam</p>

                <motion.div
                variants={{ hover: { rotate: 360 } }}
                initial={{ rotate: 0 }}
                className="translate-y-[1px]"
                >
                <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_204_14)">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.8 10.5H11.2V4.5H4.8V10.5ZM9.6 0V1.5H14.4V6H16V0H9.6ZM14.4 13.5H9.6V15H16V9H14.4V13.5ZM1.6 9H0V15H6.4V13.5H1.6V9ZM1.6 6H0V0H6.4V1.5H1.6V6Z"
                        fill="black"
                    />
                    </g>
                    <defs>
                    <clipPath id="clip0_204_14">
                        <rect width="16" height="15" fill="white" />
                    </clipPath>
                    </defs>
                </svg>
                </motion.div>
            </motion.div>
        </>
    );
};
