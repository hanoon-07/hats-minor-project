import React, {useRef, useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useNavigate} from "react-router-dom";
import axios from "axios";
export const StudentNav = ({
  selected = "dashboard",
  setSelected,
  name,
  initial,
}) => {
  const navBarDiv = useRef(null);
  const navigate = useNavigate();
  

  const handleLogOut = async () => {
    console.log("Logging out");
    try {
      const response = await axios.post(
        "https://hats-minor-project-production.up.railway.app/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.data?.success == true) {
        navigate("/login");
      }
      //  console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  

  return (
    <AnimatePresence>
       
        <motion.div
          exit={{opacity: 0.6, x: -100}}
          initial={{x: -100, opacity: 0.7}}
          animate={{opacity: 1, x: 0}}
          transition={{ease: "easeIn", duration: 0.1}}
          className="h-[100%] w-[25%] bg-black "
        >
          

          {/* <div className="flex flex-row gap-2 items-center outline outline-1 outline-[#212327] p-2 mr-2">
              <div className="h-[40px] w-[40px] rounded-full bg-gradient-to-r from-[#3b82f6] to-[#1D478C] grid place-content-center">
                <p className="text-white font-bold text-2xl">H</p>
              </div>
              <div className="text-2xl ">
                <h1 className="text-white tracking-tighter">Hanoon Zameel</h1>
                <p className="text-sm text-[#A8FF53]">active</p>
              </div>
          </div> */}
          
          <div className="bg-[#1a1b1f] outline-[#212327] flex flex-col h-[100%] justify-between">
          
            <div className="flex flex-col">

                <button
                  onClick={() => {
                    setSelected("dashboard")
                  }}

                  className={`p-2 mr-2 rounded-sm flex flex-row gap-2 text-[#c1c4c7] text-lg text-start hover:bg-[#272a2e] ${
                    selected == "dashboard"
                      ? "bg-[#A8FF53] hover:bg-[#A8FF53] text-black"
                      : null
                  }`}

                >
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_141_10)">
                      <path
                        d="M6.12868 1.44774e-05C5.32336 -0.00173778 4.52563 0.155589 3.78127 0.462963C3.03692 0.770336 2.3606 1.2217 1.79115 1.79115C1.2217 2.3606 0.770336 3.03692 0.462963 3.78127C0.155589 4.52563 -0.00173778 5.32336 1.44774e-05 6.12868V22.8713C-0.00173778 23.6767 0.155589 24.4744 0.462963 25.2188C0.770336 25.9631 1.2217 26.6394 1.79115 27.2089C2.3606 27.7783 3.03692 28.2297 3.78127 28.5371C4.52563 28.8444 5.32336 29.0018 6.12868 29H22.8713C23.6767 29.0018 24.4744 28.8444 25.2188 28.5371C25.9631 28.2297 26.6394 27.7783 27.2089 27.2089C27.7783 26.6394 28.2297 25.9631 28.5371 25.2188C28.8444 24.4744 29.0018 23.6767 29 22.8713V6.12868C29.0018 5.32336 28.8444 4.52563 28.5371 3.78127C28.2297 3.03692 27.7783 2.3606 27.2089 1.79115C26.6394 1.2217 25.9631 0.770336 25.2188 0.462963C24.4744 0.155589 23.6767 -0.00173778 22.8713 1.44774e-05H6.12868ZM14.5 4.83335C17.1668 4.83335 19.3333 6.99989 19.3333 9.66668V10.875C19.3333 11.7946 19.1509 12.5618 18.6966 13.2168C18.3014 13.7835 17.6646 14.2499 16.9191 14.7671L16.9239 16.0177C18.7219 16.5228 20.4547 17.4097 21.9131 18.8693C22.2333 19.1896 22.5463 19.5508 22.8266 19.9025C22.9115 20.0089 22.9579 20.1409 22.9583 20.2771V23.5625C22.9583 23.7227 22.8947 23.8764 22.7814 23.9897C22.6681 24.103 22.5144 24.1667 22.3542 24.1667H6.64585C6.48561 24.1667 6.33194 24.103 6.21864 23.9897C6.10533 23.8764 6.04168 23.7227 6.04168 23.5625V20.2771C6.04144 20.1412 6.08699 20.0092 6.17097 19.9025C7.77081 17.8846 9.87693 16.6448 12.0882 16.0225L12.0833 14.7538C11.3378 14.2245 10.7131 13.7267 10.3433 13.1551C9.91802 12.4942 9.74281 11.768 9.6691 10.9294C9.66748 10.9113 9.66667 10.8932 9.66668 10.875V9.66668C9.66668 6.99989 11.8332 4.83335 14.5 4.83335ZM14.5 6.04168C12.4821 6.04168 10.875 7.64877 10.875 9.66668V10.8303C10.9403 11.565 11.0659 12.0471 11.3583 12.5014C11.6532 12.957 12.1498 13.4161 13.0222 13.9973C13.1051 14.0525 13.173 14.1272 13.22 14.2149C13.267 14.3026 13.2916 14.4005 13.2917 14.5L13.2965 16.2436L14.5 16.8454L15.718 16.2364L15.7083 14.5061C15.7076 14.4057 15.7318 14.3068 15.7789 14.2182C15.8259 14.1296 15.8943 14.0541 15.9778 13.9986C16.8635 13.4077 17.4036 12.9606 17.7057 12.528C18.0042 12.0954 18.125 11.6508 18.125 10.875V9.66668C18.125 7.64877 16.5179 6.04168 14.5 6.04168ZM12.3709 17.1318C10.4606 17.6779 8.66618 18.8101 7.25001 20.5368V22.9583H21.75V20.5054C21.5322 20.2336 21.3015 19.9723 21.0588 19.7224C19.7514 18.415 18.2205 17.5958 16.6049 17.1438L15.1042 17.8966V21.1458H13.8958V17.8954L12.3709 17.1318Z"
                        fill={selected == "dashboard" ? "black" : "white"}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_141_10">
                        <rect width="29" height="29" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Dashboard
                </button>

                <button
                  onClick={() => {
                      setSelected("classes");
                  }}

                  className={`flex flex-row gap-2 p-2 mr-2 rounded-sm text-[#c1c4c7] text-lg text-start hover:bg-[#272a2e] ${
                    selected == "classes"|| selected == 'exam' || selected == 'result'
                      ? "bg-[#A8FF53] hover:bg-[#A8FF53] text-black"
                      : null
                  }`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_138_126)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0ZM16 8.448C16.4311 8.44888 16.8444 8.62054 17.1493 8.92541C17.4541 9.23028 17.6258 9.64352 17.6267 10.0747C17.6254 10.5056 17.4536 10.9185 17.1488 11.2231C16.844 11.5276 16.4309 11.6991 16 11.7C15.5689 11.6991 15.1556 11.5275 14.8507 11.2226C14.5459 10.9177 14.3742 10.5045 14.3733 10.0733C14.3742 9.64219 14.5459 9.22895 14.8507 8.92408C15.1556 8.61921 15.5689 8.44755 16 8.44667V8.448ZM16 9.11467C15.4627 9.11467 15.04 9.53667 15.04 10.0747C15.04 10.6113 15.4627 11.034 16 11.034C16.5373 11.034 16.96 10.6113 16.96 10.074C16.96 9.53667 16.5373 9.114 16 9.114V9.11467ZM12.6667 11.034C13.0978 11.0349 13.5111 11.2065 13.8159 11.5114C14.1208 11.8163 14.2925 12.2295 14.2933 12.6607C14.2923 13.0917 14.1205 13.5048 13.8157 13.8095C13.5108 14.1142 13.0977 14.2858 12.6667 14.2867C12.2355 14.2858 11.8223 14.1141 11.5174 13.8093C11.2125 13.5044 11.0409 13.0911 11.04 12.66C11.0409 12.2289 11.2125 11.8156 11.5174 11.5107C11.8223 11.2059 12.2355 11.0342 12.6667 11.0333V11.034ZM19.3733 11.034C19.8045 11.0349 20.2177 11.2065 20.5226 11.5114C20.8275 11.8163 20.9991 12.2295 21 12.6607C20.9989 13.0917 20.8272 13.5048 20.5224 13.8095C20.2175 14.1142 19.8044 14.2858 19.3733 14.2867C18.9423 14.2856 18.5292 14.1139 18.2245 13.809C17.9198 13.5042 17.7482 13.091 17.7473 12.66C17.7482 12.2289 17.9199 11.8156 18.2247 11.5107C18.5296 11.2059 18.9429 11.0342 19.374 11.0333L19.3733 11.034ZM12.6667 11.7007C12.1293 11.7007 11.7067 12.1227 11.7067 12.6607C11.7067 13.1973 12.1293 13.62 12.6667 13.62C13.204 13.62 13.6267 13.1973 13.6267 12.66C13.6267 12.1227 13.204 11.7 12.6667 11.7V11.7007ZM19.3733 11.7007C18.836 11.7007 18.414 12.1227 18.414 12.6607C18.414 13.1973 18.8367 13.62 19.374 13.62C19.9113 13.62 20.3333 13.1973 20.3333 12.66C20.3333 12.1227 19.9113 11.7 19.3733 11.7V11.7007ZM9.33333 13.082C9.76448 13.0829 10.1777 13.2545 10.4826 13.5594C10.7875 13.8643 10.9591 14.2775 10.96 14.7087C10.9588 15.1395 10.7869 15.5523 10.4821 15.8568C10.1772 16.1613 9.76419 16.3326 9.33333 16.3333C8.90236 16.3326 8.48922 16.1612 8.18436 15.8566C7.87949 15.552 7.70772 15.139 7.70667 14.708C7.70772 14.277 7.87946 13.8639 8.18431 13.5592C8.48916 13.2545 8.9023 13.0829 9.33333 13.082ZM16 13.082C16.4311 13.0829 16.8444 13.2545 17.1493 13.5594C17.4541 13.8643 17.6258 14.2775 17.6267 14.7087C17.6254 15.1395 17.4536 15.5523 17.1487 15.8568C16.8439 16.1613 16.4309 16.3326 16 16.3333C15.569 16.3326 15.1559 16.1612 14.851 15.8566C14.5462 15.552 14.3744 15.139 14.3733 14.708C14.3744 14.277 14.5461 13.8639 14.851 13.5592C15.1558 13.2545 15.569 13.0829 16 13.082ZM22.6667 13.082C23.0978 13.0829 23.5111 13.2545 23.8159 13.5594C24.1208 13.8643 24.2925 14.2775 24.2933 14.7087C24.2921 15.1395 24.1203 15.5523 23.8154 15.8568C23.5106 16.1613 23.0975 16.3326 22.6667 16.3333C22.2357 16.3326 21.8226 16.1612 21.5177 15.8566C21.2128 15.552 21.0411 15.139 21.04 14.708C21.0411 14.277 21.2128 13.8639 21.5176 13.5592C21.8225 13.2545 22.2356 13.0829 22.6667 13.082ZM9.33333 13.7487C8.796 13.7487 8.37333 14.1707 8.37333 14.7087C8.37333 15.246 8.796 15.6667 9.33333 15.6667C9.87067 15.6667 10.2933 15.246 10.2933 14.708C10.2933 14.1707 9.87067 13.7487 9.33333 13.7487ZM16 13.7487C15.4627 13.7487 15.04 14.1707 15.04 14.7087C15.04 15.246 15.4627 15.6667 16 15.6667C16.5373 15.6667 16.96 15.246 16.96 14.708C16.96 14.1707 16.5373 13.7487 16 13.7487ZM22.6667 13.7487C22.1293 13.7487 21.7067 14.1707 21.7067 14.7087C21.7067 15.246 22.1293 15.6667 22.6667 15.6667C23.204 15.6667 23.6267 15.246 23.6267 14.708C23.6267 14.1707 23.204 13.7487 22.6667 13.7487ZM8.12133 16.7047H10.5453C11.0192 16.7055 11.4733 16.8941 11.8084 17.2291C12.1435 17.5641 12.3323 18.0182 12.3333 18.492V20.6667H6.33333V18.492C6.33439 18.0182 6.52313 17.5641 6.85823 17.2291C7.19334 16.8941 7.64751 16.7055 8.12133 16.7047ZM14.788 16.7047H17.212C17.6858 16.7055 18.14 16.8941 18.4751 17.2291C18.8102 17.5641 18.9989 18.0182 19 18.492V20.6667H13V18.492C13.0011 18.0182 13.1898 17.5641 13.5249 17.2291C13.86 16.8941 14.3142 16.7055 14.788 16.7047ZM21.4547 16.7047H23.8787C24.3525 16.7055 24.8067 16.8941 25.1418 17.2291C25.4769 17.5641 25.6656 18.0182 25.6667 18.492V20.6667H19.6667V18.492C19.6677 18.0182 19.8565 17.5641 20.1916 17.2291C20.5267 16.8941 20.9808 16.7055 21.4547 16.7047ZM8.12133 17.3713C7.49467 17.3713 7 17.8653 7 18.492V20H11.6667V18.492C11.6667 17.8653 11.1727 17.3713 10.5453 17.3713H8.12133ZM14.788 17.3713C14.1613 17.3713 13.6667 17.8653 13.6667 18.492V20H18.3333V18.492C18.3333 17.8653 17.8393 17.3713 17.212 17.3713H14.788ZM21.4547 17.3713C20.828 17.3713 20.3333 17.8653 20.3333 18.492V20H25V18.492C25 17.8653 24.506 17.3713 23.8787 17.3713H21.4547Z"
                        fill={
                          selected == "classes"|| selected == 'exam' || selected == 'result'
                            ? "black"
                            : "white"
                        }
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_138_126">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Classes
                </button>

                {/* <button
                  onClick={() => {
                      setSelected("results");
                  }}

                  className={`flex flex-row gap-2 p-2 mr-2 rounded-sm text-[#c1c4c7] text-lg text-start hover:bg-[#272a2e] ${
                    selected == "results"
                      ? "bg-[#A8FF53] hover:bg-[#A8FF53] text-black"
                      : null
                  }`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_138_126)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0ZM16 8.448C16.4311 8.44888 16.8444 8.62054 17.1493 8.92541C17.4541 9.23028 17.6258 9.64352 17.6267 10.0747C17.6254 10.5056 17.4536 10.9185 17.1488 11.2231C16.844 11.5276 16.4309 11.6991 16 11.7C15.5689 11.6991 15.1556 11.5275 14.8507 11.2226C14.5459 10.9177 14.3742 10.5045 14.3733 10.0733C14.3742 9.64219 14.5459 9.22895 14.8507 8.92408C15.1556 8.61921 15.5689 8.44755 16 8.44667V8.448ZM16 9.11467C15.4627 9.11467 15.04 9.53667 15.04 10.0747C15.04 10.6113 15.4627 11.034 16 11.034C16.5373 11.034 16.96 10.6113 16.96 10.074C16.96 9.53667 16.5373 9.114 16 9.114V9.11467ZM12.6667 11.034C13.0978 11.0349 13.5111 11.2065 13.8159 11.5114C14.1208 11.8163 14.2925 12.2295 14.2933 12.6607C14.2923 13.0917 14.1205 13.5048 13.8157 13.8095C13.5108 14.1142 13.0977 14.2858 12.6667 14.2867C12.2355 14.2858 11.8223 14.1141 11.5174 13.8093C11.2125 13.5044 11.0409 13.0911 11.04 12.66C11.0409 12.2289 11.2125 11.8156 11.5174 11.5107C11.8223 11.2059 12.2355 11.0342 12.6667 11.0333V11.034ZM19.3733 11.034C19.8045 11.0349 20.2177 11.2065 20.5226 11.5114C20.8275 11.8163 20.9991 12.2295 21 12.6607C20.9989 13.0917 20.8272 13.5048 20.5224 13.8095C20.2175 14.1142 19.8044 14.2858 19.3733 14.2867C18.9423 14.2856 18.5292 14.1139 18.2245 13.809C17.9198 13.5042 17.7482 13.091 17.7473 12.66C17.7482 12.2289 17.9199 11.8156 18.2247 11.5107C18.5296 11.2059 18.9429 11.0342 19.374 11.0333L19.3733 11.034ZM12.6667 11.7007C12.1293 11.7007 11.7067 12.1227 11.7067 12.6607C11.7067 13.1973 12.1293 13.62 12.6667 13.62C13.204 13.62 13.6267 13.1973 13.6267 12.66C13.6267 12.1227 13.204 11.7 12.6667 11.7V11.7007ZM19.3733 11.7007C18.836 11.7007 18.414 12.1227 18.414 12.6607C18.414 13.1973 18.8367 13.62 19.374 13.62C19.9113 13.62 20.3333 13.1973 20.3333 12.66C20.3333 12.1227 19.9113 11.7 19.3733 11.7V11.7007ZM9.33333 13.082C9.76448 13.0829 10.1777 13.2545 10.4826 13.5594C10.7875 13.8643 10.9591 14.2775 10.96 14.7087C10.9588 15.1395 10.7869 15.5523 10.4821 15.8568C10.1772 16.1613 9.76419 16.3326 9.33333 16.3333C8.90236 16.3326 8.48922 16.1612 8.18436 15.8566C7.87949 15.552 7.70772 15.139 7.70667 14.708C7.70772 14.277 7.87946 13.8639 8.18431 13.5592C8.48916 13.2545 8.9023 13.0829 9.33333 13.082ZM16 13.082C16.4311 13.0829 16.8444 13.2545 17.1493 13.5594C17.4541 13.8643 17.6258 14.2775 17.6267 14.7087C17.6254 15.1395 17.4536 15.5523 17.1487 15.8568C16.8439 16.1613 16.4309 16.3326 16 16.3333C15.569 16.3326 15.1559 16.1612 14.851 15.8566C14.5462 15.552 14.3744 15.139 14.3733 14.708C14.3744 14.277 14.5461 13.8639 14.851 13.5592C15.1558 13.2545 15.569 13.0829 16 13.082ZM22.6667 13.082C23.0978 13.0829 23.5111 13.2545 23.8159 13.5594C24.1208 13.8643 24.2925 14.2775 24.2933 14.7087C24.2921 15.1395 24.1203 15.5523 23.8154 15.8568C23.5106 16.1613 23.0975 16.3326 22.6667 16.3333C22.2357 16.3326 21.8226 16.1612 21.5177 15.8566C21.2128 15.552 21.0411 15.139 21.04 14.708C21.0411 14.277 21.2128 13.8639 21.5176 13.5592C21.8225 13.2545 22.2356 13.0829 22.6667 13.082ZM9.33333 13.7487C8.796 13.7487 8.37333 14.1707 8.37333 14.7087C8.37333 15.246 8.796 15.6667 9.33333 15.6667C9.87067 15.6667 10.2933 15.246 10.2933 14.708C10.2933 14.1707 9.87067 13.7487 9.33333 13.7487ZM16 13.7487C15.4627 13.7487 15.04 14.1707 15.04 14.7087C15.04 15.246 15.4627 15.6667 16 15.6667C16.5373 15.6667 16.96 15.246 16.96 14.708C16.96 14.1707 16.5373 13.7487 16 13.7487ZM22.6667 13.7487C22.1293 13.7487 21.7067 14.1707 21.7067 14.7087C21.7067 15.246 22.1293 15.6667 22.6667 15.6667C23.204 15.6667 23.6267 15.246 23.6267 14.708C23.6267 14.1707 23.204 13.7487 22.6667 13.7487ZM8.12133 16.7047H10.5453C11.0192 16.7055 11.4733 16.8941 11.8084 17.2291C12.1435 17.5641 12.3323 18.0182 12.3333 18.492V20.6667H6.33333V18.492C6.33439 18.0182 6.52313 17.5641 6.85823 17.2291C7.19334 16.8941 7.64751 16.7055 8.12133 16.7047ZM14.788 16.7047H17.212C17.6858 16.7055 18.14 16.8941 18.4751 17.2291C18.8102 17.5641 18.9989 18.0182 19 18.492V20.6667H13V18.492C13.0011 18.0182 13.1898 17.5641 13.5249 17.2291C13.86 16.8941 14.3142 16.7055 14.788 16.7047ZM21.4547 16.7047H23.8787C24.3525 16.7055 24.8067 16.8941 25.1418 17.2291C25.4769 17.5641 25.6656 18.0182 25.6667 18.492V20.6667H19.6667V18.492C19.6677 18.0182 19.8565 17.5641 20.1916 17.2291C20.5267 16.8941 20.9808 16.7055 21.4547 16.7047ZM8.12133 17.3713C7.49467 17.3713 7 17.8653 7 18.492V20H11.6667V18.492C11.6667 17.8653 11.1727 17.3713 10.5453 17.3713H8.12133ZM14.788 17.3713C14.1613 17.3713 13.6667 17.8653 13.6667 18.492V20H18.3333V18.492C18.3333 17.8653 17.8393 17.3713 17.212 17.3713H14.788ZM21.4547 17.3713C20.828 17.3713 20.3333 17.8653 20.3333 18.492V20H25V18.492C25 17.8653 24.506 17.3713 23.8787 17.3713H21.4547Z"
                        fill={
                          selected == "results"
                            ? "black"
                            : "white"
                        }
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_138_126">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Results
                </button> */}

            </div>

            
            <button
                className={`group flex font-medium flex-row items-center gap-2 p-2 mr-2 rounded-sm text-[#f43f5e] text-lg text-start tracking-tighter hover:bg-[#f43f5e] hover:text-black`}
                onClick={() => handleLogOut()}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="group-hover:fill-black"
                    d="M9.44667 16.78L11.3333 18.6667L18 12L11.3333 5.33333L9.44667 7.22L12.8933 10.6667H0V13.3333H12.8933L9.44667 16.78ZM21.3333 0H2.66667C1.19333 0 0 1.19333 0 2.66667V8H2.66667V2.66667H21.3333V21.3333H2.66667V16H0V21.3333C0 22.8067 1.19333 24 2.66667 24H21.3333C22.8067 24 24 22.8067 24 21.3333V2.66667C24 1.19333 22.8067 0 21.3333 0Z"
                    fill="#F43F5E"
                  />
                </svg>
                log out
            </button>
        
          </div>

          
        </motion.div>
    
      
    </AnimatePresence>
  );
};
