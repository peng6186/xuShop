import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiFillCloseCircle,
} from "react-icons/ai";
import logo from "../assets/logo.svg";
import Badge from "./Badge";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="h-16 bg-[#3c4c5d]">
      <div className="mx-4 md:max-w-[75%] md:mx-auto flex justify-between items-center">
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <img src={logo} alt="logo" className="w-16 h-16" />
            <span className="text-slate-300 font-bold ">XuShop</span>
          </div>
        </Link>

        <div className="items-center gap-4 text-base hidden md:flex">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search Products..."
              className="outline-0 bg-transparent border-b border-gray-300 text-slate-300 text-lg
              placeholder:text-slate-400"
            />
            <button className="border py-2 px-4 rounded-md font-semibold text-slate-400 hover:text-slate-300">
              Search
            </button>
          </div>
          <div className="flex gap-1 items-center font-semibold text-slate-300 cursor-pointer">
            <AiOutlineShoppingCart />
            <Link to="/cart">
              <span>Cart</span>
            </Link>
            {cartItems.length > 0 && (
              <Badge
                numsInCart={cartItems.reduce((acc, item) => acc + item.qty, 0)}
              />
            )}
          </div>
          <div className="flex gap-1 items-center font-semibold text-slate-300 cursor-pointer">
            <AiOutlineUser />
            <span>Sign In</span>
          </div>
        </div>

        {/* hambuger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <AiFillCloseCircle className="w-7 h-6 text-white" />
          ) : (
            <AiOutlineMenu className="w-7 h-6 text-white" />
          )}
        </div>

        {/* drop down menu */}
        <div
          className={`absolute top-0 h-screen w-2/3  bg-gradient-to-tl from-white/10 to-[bgprimary] backdrop-blur-lg p-6 smooth-transition ${
            mobileMenuOpen ? "left-0" : "-left-full"
          } md:hidden`}
        >
          <div className="mt-10 flex flex-col gap-16">
            <div className="flex justify-center items-center">
              <Link to={"/"} onClick={() => setMobileMenuOpen(false)}>
                <img src={logo} alt="logo" className="w-16 h-16" />
                <span className="text-slate-400 font-bold text-2xl">Shop</span>
              </Link>
            </div>
            <div className="flex gap-1 justify-center items-center font-semibold text-slate-500 cursor-pointer hover:text-cyan-400 text-lg">
              <AiOutlineShoppingCart />
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)}>
                <span>Cart</span>
              </Link>
              {cartItems.length > 0 && (
                <Badge
                  numsInCart={cartItems.reduce(
                    (acc, item) => acc + item.qty,
                    0
                  )}
                />
              )}
            </div>
            <div className="flex gap-1 justify-center items-center font-semibold text-slate-500 cursor-pointer hover:text-cyan-400 text-lg">
              <AiOutlineUser />
              <span>Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
