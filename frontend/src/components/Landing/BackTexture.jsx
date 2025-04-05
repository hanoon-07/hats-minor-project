import React from "react";

export const BackTexture = () => {
  return (
    <div
      className="w-screen h-screen bg-[#121317] absolute top-0 left-0"
      style={{
        backgroundImage: `
            linear-gradient(#1c1e21 1px, transparent 1px),
            linear-gradient(90deg, #1c1e21 1px, transparent 1px)
          `,
        backgroundSize: "150px 2935px",
      }}
    ></div>
  );
};
