import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <div className="join">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={
              isAdmin
                ? `/admin/productlist/${x + 1}`
                : keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
            }
          >
            <button
              className={`join-item btn ${x + 1 == page && "btn-active"}`}
            >
              {x + 1}
            </button>
          </Link>
        ))}
      </div>
    )
  );
};

export default Pagination;
