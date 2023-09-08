import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useState } from "react";

import { useGetProductByIdQuery } from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartslice";

const ProductDetailScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  // console.log({ qty });
  // console.log(typeof qty);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="flex flex-col gap-8 md:max-w-[75%] mx-auto">
          <div className="goback-btn">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-500"
            >
              Go Back
            </button>
          </div>

          <div className="product flex flex-col gap-4 sm:flex-row">
            <div className="image rounded-sm shadow-sm">
              <img
                src={product.image}
                alt="product-image"
                className="max-w-[480px]  md:max-w-[360px] flex-1"
              />
            </div>

            <div className="product-info flex-1 flex flex-col gap-4 p-4">
              <h2 className="text-slate-500 text-2xl font-semibold">
                {product.name}
              </h2>
              <hr />
              <div>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </div>
              <hr />
              <p>
                <span>Price: </span>
                <span>{product.price}</span>
              </p>
              <hr />
              <p>
                <span className="text-lg text-textprimary">Description: </span>
                {product.description}
              </p>
            </div>

            <div className="cart-info  w-full  md:max-w-[220px] px-4 py-8 flex flex-col gap-4 border rounded-md h-max">
              <p className="flex justify-between items-center">
                <span>Price:</span>
                <span className="font-semibold text-textprimary">
                  ${product.price}
                </span>
              </p>
              <hr />
              <p className="flex justify-between items-center">
                <span>Status:</span>
                <span>
                  {product.countInStock ? "In Stock" : "Out Of Stock"}
                </span>
              </p>
              {product.countInStock > 0 && (
                <p className="flex justify-between items-center">
                  <span>Qty:</span>
                  <span>
                    <select
                      className="outline-none border w-max p-2 rounded-md"
                      name="qty"
                      id="qty"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option
                          key={x + 1}
                          value={x + 1}
                          className="outline-none w-10"
                        >
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </span>
                </p>
              )}
              <hr />
              <div>
                <button
                  className="mt-4 px-4 py-2 rounded-md bg-bgprimary text-slate-200 disabled:cursor-not-allowed disabled:bg-slate-300"
                  disabled={!product.countInStock}
                  onClick={addToCartHandler}
                >
                  Add To Card
                </button>
              </div>
            </div>
          </div>

          <div>Review</div>
        </div>
      )}
    </>
  );
};

export default ProductDetailScreen;
