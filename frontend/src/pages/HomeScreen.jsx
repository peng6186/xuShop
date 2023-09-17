import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="max-w-[75%] mx-auto flex flex-col gap-8 py-4">
          <h2 className="text-2xl text-textprimary">Latest Products</h2>

          <div className="flex flex-wrap gap-8">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <Pagination
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
