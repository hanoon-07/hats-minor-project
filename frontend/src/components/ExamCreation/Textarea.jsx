/* eslint-disable react/prop-types */
import React from "react";

function Textarea({
  placeholder = "Enter Text Data",
  changeAction,
  textValue,
  inputTitle = "Title",
}) {
  return (
    <div className="    ">
      <div className="flex  flex-wrap sm:gap-8 gap-2 ">
        <label
          htmlFor="input"
          className="block font-semibold text-sm  text-white  w-[100px] mt-2"
        >
          {inputTitle}
        </label>

        <textarea
          id="input"
          className="bg-darkGray text-white  w-full max-w-[60rem] min-h-[120px] mt-1 md:mt-0 p-3 border 
          rounded-md shadow-sm text-md md:text-base  outline-none border-none
          "
          placeholder={placeholder}
          value={textValue}
          onChange={changeAction}
        />
      </div>
    </div>
  );
}

export default Textarea;
