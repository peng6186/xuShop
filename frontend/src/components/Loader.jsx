import React from "react";

const Loader = () => {
  return (
    <div className="w-[30%] mx-auto space-x-5">
      <div
        className="text-slate-300 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
      <strong className="text-slate-500 font-semibold text-lg">
        Loading...
      </strong>
    </div>
  );
};

export default Loader;
