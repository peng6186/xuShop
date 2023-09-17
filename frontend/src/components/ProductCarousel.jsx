import React from "react";
import { useGetTopProductsQuery } from "../redux/slices/productsApiSlice";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="carousel w-full bg-[#3b4c5c] rounded-md">
      {products.map((product, idx) => (
        <div key={product._id} className="carousel-item w-full relative">
          <Link to={`/product/${product._id}`} id={idx}>
            <img
              src={product.image}
              alt={product.name}
              className="object-contain"
            />
            <div className="absolute left-0 right-0 bottom-0 bg-slate-800 opacity-20">
              <h2 className="py-2 text-white font-semibold text-center">
                {product.name} (${product.price})
              </h2>
            </div>
          </Link>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={idx == 0 ? `#${products.length - 1}` : `#${idx - 1}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={idx == products.length - 1 ? "#0" : `#${idx + 1}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
