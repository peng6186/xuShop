import React from "react";

const Footer = () => {
  const curYear = new Date().getFullYear();
  return (
    <div
      className="mt-4 text-center text-base text-slate-400  h-16 w-full flex justify-center items-center
    "
    >
      <p>XuShop &copy; {curYear}</p>
    </div>
  );
};

export default Footer;
