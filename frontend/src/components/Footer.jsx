import React from "react";

const Footer = () => {
  const curYear = new Date().getFullYear();
  return (
    <div
      className="max-w-[75%] mx-auto flex items-center justify-between mt-4 text-center text-base text-slate-400  h-16 w-full
    "
    >
      <p>XuShop &copy; {curYear}</p>
      <div className="cursor-pointer">
        <a href="https://github.com/xusde" target="_blank">
          <img src="/images/github.png" alt="github" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
