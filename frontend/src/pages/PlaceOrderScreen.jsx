import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { toast } from "react-toastify";
import { BiChevronUp as ChevronUpIcon } from "react-icons/bi";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../redux/slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearCartItems } from "../redux/slices/cartslice";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const placeOrderHandler = async () => {
    try {
      // console.log("enter try");
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.payment,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      // console.log("after await createOrder");
      dispatch(clearCartItems());
      // console.log("after clearCartItems");
      navigate(`/order/${res._id}`);
      // console.log(res);
    } catch (err) {
      console.log("enter catch error");
      toast.error(err);
    }
  };

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
    if (!cart.payment) {
      navigate("/payment");
    }
  }, [cart.payment, cart.shippingAddress.address]);
  return (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col  items-center">
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6 mt-10 w-full">
        <div className="order-detail flex-1 max-w-[500px]">
          <Disclosure as={"div"} className="w-full">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 hover:opacity-70 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Address & Payment Method</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 ">
                  <p>
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                  <p>
                    <strong>Payment Method: </strong>
                    {cart.payment}
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2 w-full">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                  <span>Order Items: </span>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                  {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                  ) : (
                    <div>
                      {cart.cartItems.map((item) => (
                        <div key={item._id}>
                          <div className="mt-2 flex flex-col md:flex-row items-center gap-2 md:gap-4">
                            <div className="w-[150px] h-[150px] sm:w-[30px] sm:h-[30px]">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-contain rounded-lg"
                              />
                            </div>
                            <div>
                              <Link to={`/product/${item._id}`}>
                                <p className="text-base text-slate-400 font-semibold">
                                  {item.name}
                                </p>
                              </Link>
                            </div>
                            <div>
                              {item.qty} x ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        <div className="order-summary flex-1 border rounded-md py-2 px-4 w-full max-w-[450px] h-fit">
          <h2 className="text-xl text-textprimary font-bold">Order Summary</h2>
          <div className="text-textprimary flex flex-col gap-x-2">
            <div className="mt-4 flex justify-between items-center">
              <div>Items</div>
              <div>${cart.itemsPrice}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Shipping</div>
              <div>${cart.shippingPrice}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Tax</div>
              <div>${cart.taxPrice}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Total</div>
              <div>${cart.totalPrice}</div>
            </div>
            <div>{error && <Message>{error?.data?.message}</Message>}</div>
            <div className="mt-4">
              <button
                type="button"
                className="py-2 px-4 border rounded-md"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
