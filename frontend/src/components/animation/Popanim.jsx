import React from 'react';

function Popanim({message}) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <div className="mb-4 p-[2px] text-3xl shimmering-text font-bold">
       {message}
      </div>
      <div className="mb-4 text-lg text-gray-300">
        Please do not leave the page
      </div>
      <div className="loader"></div>
    </div>
  );
}

export default Popanim;
