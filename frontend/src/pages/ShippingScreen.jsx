import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savingShippingAddress } from "../redux/slices/cartslice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalcode, setPostalcode] = useState(
    shippingAddress?.postalcode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigagte = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savingShippingAddress({ address, city, postalcode, country }));
    navigagte("/payment");
  };
  return (
    <div className="max-w-[75%] mx-auto py-4 flex justify-center items-center">
      <form className="flex flex-col gap-8" onSubmit={submitHandler}>
        <CheckoutSteps step1 step2 />
        <h2 className="text-[#828f9d] text-4xl font-semibold">Shipping</h2>
        <div className="flex flex-col gap-2 w-[450px]">
          <label className="text-xl text-slate-500" htmlFor="address">
            Address:
          </label>
          <input
            required
            className="w-full border rounded-md p-2"
            type="text"
            name="address"
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-[450px]">
          <label className="text-xl text-slate-500" htmlFor="city">
            City:
          </label>
          <input
            required
            className="w-full border rounded-md p-2"
            type="text"
            name="city"
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2  w-[450px]">
          <label className="text-xl text-slate-500" htmlFor="pc">
            Postalcode:
          </label>
          <input
            required
            className="w-full border rounded-md p-2"
            type="text"
            name="postalcode"
            id="pc"
            placeholder="Enter your postal code"
            value={postalcode}
            onChange={(e) => setPostalcode(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2  w-[450px]">
          <label className="text-xl text-slate-500" htmlFor="country">
            Country:
          </label>
          <input
            required
            className="w-full border rounded-md p-2"
            type="text"
            name="country"
            id="country"
            placeholder="Enter your country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button className="w-fit py-2 px-4 border rounded-lg text-slate-500 font-semibold hover:opacity-60">
          continue
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
