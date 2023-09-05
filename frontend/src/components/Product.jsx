import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="w-5/6 border p-4 flex flex-col justify-between sm:w-[290px] gap-x-2 gap-y-4 shadow-lg rounded-md">
      <div className="hover:opacity-60">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt="product_img" />
        </Link>
      </div>
      <h3 className="truncate mx-2 hover:opacity-50">
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </h3>
      <Rating rating={product.rating} numReviews={product.numReviews} />
      <p className="text-textprimary text-2xl mx-2">${product.price}</p>
    </div>
  );
};

export default Product;
