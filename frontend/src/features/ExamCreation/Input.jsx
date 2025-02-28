/* eslint-disable react/prop-types */
import React from "react";

const Input = ({
  placeholder = "enter",
  changeAction,
  textValue,
  inputTitle,
  width = "60",
  height = "12",
}) => {
  const getWidthClass = () => {
    const widthMap = {
      60: "w-60",
      72: "w-72",
      80: "w-80",
      96: "w-96",
      full: "w-full",
      "1/2": "w-1/2",
      "1/3": "w-1/3",
      "2/3": "w-2/3",
    };

    return widthMap[width] || "w-60"; // Default to w-60 if width not found in map
  };

  const getHeightClass = () => {
    const heightMap = {
      8: "h-8",
      10: "h-10",
      12: "h-12",
      16: "h-16",
    };

    return heightMap[height] || "h-10"; // Default to h-12 if height not found in map
  };

  return (
    <div className="flex flex-wrap sm:gap-8 gap-2 place-items-center ">
      <p className="text-textGray font-semibold text-sm  w-[100px]">
        {inputTitle}
      </p>
      <input
        className={` bg-darkGray text-white placeholder-textGray py-2 rounded-md px-3 block max-w-[60rem] w-full
          focus:outline-none text-sm md:text-base   ${getHeightClass()}`}
        placeholder={placeholder}
        value={textValue}
        onChange={changeAction}
      />
    </div>
  );
};

export default Input;
