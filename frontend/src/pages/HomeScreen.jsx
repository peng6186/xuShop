import MyDropdown from "../components/DropDown";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

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
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
