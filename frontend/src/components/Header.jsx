import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
  AiFillCloseCircle,
  AiOutlineProfile,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { BiChevronDown as ChevronDownIcon } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import logo from "../assets/logo.svg";
import Badge from "./Badge";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogOutMutation } from "../redux/slices/usersApiSlice";
import { clearCredentials } from "../redux/slices/authslice";
import Searchbar from "./Searchbar";
import { resetCart } from "../redux/slices/cartslice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogOutMutation();

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      dispatch(resetCart());
      console.log("before navi to /login");
      navigate("/login");
      window.location.reload();
      console.log("after navi to /login");
    } catch (error) {
      toast(error.error);
    }
  };

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
          <Searchbar />
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
          {userInfo ? (
            <div className="flex gap-1 items-center font-semibold text-slate-300 cursor-pointer">
              <Menu as="div" className="relative inline-block text-left z-30">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    {userInfo.name}
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate("/profile");
                              setMobileMenuOpen(false);
                            }}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <AiOutlineProfile className="mr-2 h-5 w-5" />
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <AiOutlineLogout className="mr-2 h-5 w-5" />
                            Log out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <div className="flex gap-1 items-center font-semibold text-slate-300 cursor-pointer">
              <AiOutlineUser />
              <Link to={"/login"}>
                <span>Log In</span>
              </Link>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="flex gap-1 items-center font-semibold text-slate-300 cursor-pointer">
              <Menu as="div" className="relative inline-block text-left z-30">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    Admin
                    <ChevronDownIcon
                      className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate("/admin/productlist");
                              // setMobileMenuOpen(false);
                            }}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <FaProductHunt className="mr-2 h-5 w-5" />
                            Products
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate("/admin/orderlist");
                              // setMobileMenuOpen(false);
                            }}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <MdInventory className="mr-2 h-5 w-5" />
                            Orders
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              navigate("/admin/userlist");
                              setMobileMenuOpen(false);
                            }}
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <MdInventory className="mr-2 h-5 w-5" />
                            Users
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
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

            {userInfo ? (
              <div className="flex gap-1 justify-center items-center font-semibold text-slate-500 cursor-pointer hover:text-cyan-400 text-lg">
                <Menu as="div" className="relative inline-block text-left z-30">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      {userInfo.name}
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/profile");
                                setMobileMenuOpen(false);
                              }}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <AiOutlineProfile className="mr-2 h-5 w-5" />
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                logoutHandler();
                                setMobileMenuOpen(false);
                              }}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <AiOutlineLogout className="mr-2 h-5 w-5" />
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center font-semibold text-slate-500 cursor-pointer hover:text-cyan-400 text-lg">
                <AiOutlineUser />
                <Link to={"/login"}>
                  <span>Log In</span>
                </Link>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="flex gap-1 justify-center items-center font-semibold text-slate-300 cursor-pointer">
                <Menu as="div" className="relative inline-block text-left z-30">
                  <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                      Admin
                      <ChevronDownIcon
                        className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/admin/orderlist");
                                setMobileMenuOpen(false);
                              }}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <FaProductHunt className="mr-2 h-5 w-5" />
                              Products
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/admin/orderlist");
                                setMobileMenuOpen(false);
                              }}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <MdInventory className="mr-2 h-5 w-5" />
                              Orders
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => {
                                navigate("/admin/userlist");
                                setMobileMenuOpen(false);
                              }}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              <MdInventory className="mr-2 h-5 w-5" />
                              Users
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
