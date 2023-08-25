import React from "react";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const Rating = ({ rating, numReviews }) => {
  return (
    <div className="flex gap-4 mx-1 items-center">
      <div className="flex">
        <span className="text-yellow-300">
          {rating >= 1 ? (
            <FaStar />
          ) : rating > 0.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-300">
          {rating >= 2 ? (
            <FaStar />
          ) : rating > 1.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-300">
          {rating >= 3 ? (
            <FaStar />
          ) : rating > 2.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-300">
          {rating >= 4 ? (
            <FaStar />
          ) : rating > 3.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
        <span className="text-yellow-300">
          {rating >= 5 ? (
            <FaStar />
          ) : rating > 4.5 ? (
            <FaStarHalfAlt />
          ) : (
            <FaRegStar />
          )}
        </span>
      </div>
      <span>{numReviews} reviews</span>
    </div>
  );
};

export default Rating;
