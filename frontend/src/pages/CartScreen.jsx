import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/slices/cartslice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center md:flex-row gap-8">
      <div className="w-[300px] h-[300px] md:w-[150px] md:h-[150px]">
        <img src={item.image} alt="img" className="object-contain rounded-lg" />
      </div>
      <Link to={`/product/${item._id}`} className="underline">
        <p className="w-full md:w-[100px]">{item.name}</p>
      </Link>
      <p className="text-slate-700">${item.price}</p>
      <select
        className="outline-none border w-[80px] p-2 rounded-md h-[50px]"
        value={item.qty}
        name={`${item.name}-select-name`}
        id={`${item.name}-select-id`}
        onChange={(e) => {
          dispatch(addToCart({ ...item, qty: Number(e.target.value) }));
        }}
      >
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1} className="outline-none w-10">
            {x + 1}
          </option>
        ))}
      </select>
      <button
        onClick={() => dispatch(removeFromCart(item._id))}
        className="border p-4 rounded-lg hover:bg-slate-300"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

const CartScreen = () => {
  const navigate = useNavigate();
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div className="flex max-w-[80%] mx-auto py-4">
      <div className="w-full">
        <h1 className="text-slate-400 font-bold text-4xl mb-10">
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <Notification>
            Your cart is empty. &nbsp;{" "}
            <Link to="/" className="underline">
              Go Back
            </Link>{" "}
          </Notification>
        ) : (
          <div className="flex flex-col-reverse lg:flex-row justify-between gap-4">
            <div className="flex-1 flex flex-col gap-5">
              {cartItems.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </div>
            <div className="w-[350px] border p-4 rounded-md shadow-sm mx-auto my-4">
              <h1 className="text-3xl text-slate-400 font-semibold">
                Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h1>
              <p className="text-slate-400 mt-4">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>

              <button
                className="mt-4  text-white rounded-lg border py-2 px-4 max-w-fit bg-[#3c4c5d]"
                disabled={cartItems.length === 0}
                onClick={() => checkoutHandler()}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default CartScreen;
