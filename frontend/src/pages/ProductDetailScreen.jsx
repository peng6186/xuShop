import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useState } from "react";

import { useGetProductByIdQuery } from "../redux/slices/productsApiSlice";
import { useCreateReviewMutation } from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartslice";
import { toast } from "react-toastify";
import MetaInfo from "../components/MetaInfo";

const ProductDetailScreen = () => {
  const { id: productId } = useParams();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("rating: ", rating);
  // console.log("typeof rating: ", typeof rating);
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductByIdQuery(productId);
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="flex flex-col gap-8 md:max-w-[75%] mx-auto">
          <MetaInfo title={product.name} />
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
              <div className="flex">
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />{" "}
                reviews
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

          <div className="flex flex-col gap-4">
            <h2 className="text-[#828f9d] text-2xl font-semibold">Reviews</h2>
            {product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>

            <div className="divider"></div>
            <div className="flex flex-col gap-4 w-[50%]">
              <h2 className="text-[#828f9d] text-2xl font-semibold">
                Write a Customer Review
              </h2>

              {loadingProductReview && <Loader />}

              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <div className="my-2 flex flex-col gap-4">
                    <label className="text-[#828f9d] text-xl">Rating</label>

                    <div className="flex  gap-2">
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating-2"
                          value={1}
                          className="mask mask-star-2 bg-orange-400"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={2}
                          className="mask mask-star-2 bg-orange-400"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={3}
                          className="mask mask-star-2 bg-orange-400"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={4}
                          className="mask mask-star-2 bg-orange-400"
                          onChange={(e) => setRating(e.target.value)}
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={5}
                          className="mask mask-star-2 bg-orange-400"
                          onChange={(e) => setRating(e.target.value)}
                        />
                      </div>
                      <p>
                        {rating == 1
                          ? "Poor"
                          : rating == 2
                          ? "Fair"
                          : rating == 3
                          ? "Good"
                          : rating == 4
                          ? "Very Good"
                          : "Excellent"}
                      </p>
                    </div>
                  </div>
                  <div className="my-2 flex flex-col gap-4">
                    <label htmlFor="comment" className="text-[#828f9d] text-xl">
                      Comment
                    </label>
                    <textarea
                      className="p-2 border rounded-md"
                      id="comment"
                      row="5"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    disabled={loadingProductReview}
                    type="submit"
                    className="mt-4 btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailScreen;
