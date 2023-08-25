import React from "react";

const Badge = ({ numsInCart }) => {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
      {numsInCart}
    </span>
  );
};

export default Badge;
