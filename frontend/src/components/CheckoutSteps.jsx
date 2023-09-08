import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-[500px] max-auto">
      <nav className="flex justify-center">
        <ul className="flex gap-4">
          <li>
            {step1 ? (
              <span>
                <Link to="/login">Log In</Link>
                <AiOutlineCheckCircle className="text-green-400" />{" "}
              </span>
            ) : (
              <span className="text-gray-400">
                {" "}
                Log In <AiOutlineCheckCircle className="text-gray-400" />{" "}
              </span>
            )}
          </li>
          <li>
            {step2 ? (
              <span>
                <Link to="/shipping">Shipping</Link>
                <AiOutlineCheckCircle className="text-green-400" />{" "}
              </span>
            ) : (
              <span className="text-gray-400">
                {" "}
                Shipping <AiOutlineCheckCircle className="text-gray-400" />{" "}
              </span>
            )}
          </li>
          <li>
            {step3 ? (
              <span>
                <Link to="/payment">Payment</Link>
                <AiOutlineCheckCircle className="text-green-400" />{" "}
              </span>
            ) : (
              <span className="text-gray-400">
                {" "}
                Payment <AiOutlineCheckCircle className="text-gray-400" />{" "}
              </span>
            )}
          </li>
          <li>
            {step4 ? (
              <span>
                <Link to="/placeorder">Place Order</Link>
                <AiOutlineCheckCircle className="text-green-400" />{" "}
              </span>
            ) : (
              <span className="text-gray-400">
                {" "}
                Place Order <AiOutlineCheckCircle className="text-gray-400" />{" "}
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CheckoutSteps;
