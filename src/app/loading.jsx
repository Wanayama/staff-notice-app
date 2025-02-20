import React from "react";

const Loading = () => {
  return (
    <div className="w-full p-4 animate-pulse shadow-xl rounded-md border-[1px] flex flex-col gap-3">
      <span className="w-[20%] bg-gray-300 h-4 rounded"></span>
      <span className="bg-gray-300 h-4 rounded w-full"></span>
      <span className="bg-gray-300 h-4 rounded w-full"></span>
      <span className="bg-gray-300 h-4 rounded w-full"></span>
      <span className="bg-gray-300 h-4 rounded w-[70%]"></span>
      <span className="bg-gray-300 h-4 rounded w-[20%]"></span>
      <span className="bg-gray-300 h-4 rounded w-[40%]"></span>
    </div>
  );
};

export default Loading;
