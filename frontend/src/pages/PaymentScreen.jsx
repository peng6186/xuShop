import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import { savingPaymentMethod } from "../redux/slices/cartslice";

const PaymentScreen = () => {
  const [payment, setPayment] = useState("paypal");
  const navigagte = useNavigate();
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  if (!shippingAddress) {
    navigagte("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savingPaymentMethod(payment));
    navigagte("/placeorder");
  };
  return (
    <div className="max-w-[75%] mx-auto py-4 flex justify-center items-center">
      <form className="flex flex-col gap-8" onSubmit={submitHandler}>
        <CheckoutSteps step1 step2 step3 />
        <h2 className="text-[#828f9d] text-4xl font-semibold">
          Payment Method:
        </h2>

        <div className="flex  gap-2 w-[450px]">
          <input
            required
            className=" border rounded-md p-2"
            type="radio"
            name="payment"
            id="payment"
            value="paypal"
            onChange={(e) => setPayment(e.target.value)}
            checked
          />
          <label className="text-xl text-slate-500" htmlFor="payment">
            Paypal or Credit Card
          </label>
        </div>

        <button className="w-fit py-2 px-4 border rounded-lg text-slate-500 font-semibold hover:opacity-60">
          continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
