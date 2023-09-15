import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../redux/slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success("product updated successfully");
      refetch();
      navigate("/admin/productlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  return (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col  gap-4">
      <Link to="/admin/productlist" className="btn my-3 w-fit">
        Go Back
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#828f9d] text-4xl font-semibold">Edit Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <form className="mt-6 flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2  w-[450px] ">
              <label className="text-xl text-slate-500" htmlFor="name">
                Name
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col gap-2  w-[450px]">
              <label className="text-xl text-slate-500" htmlFor="price">
                Price
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>

            {/* IMAGE INPUT PLACEHOLDER */}

            <div className="flex flex-col gap-2  w-[450px]">
              <label className="text-xl text-slate-500" htmlFor="brand">
                Brand
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col gap-2  w-[450px]">
              <label className="text-xl text-slate-500" htmlFor="stock">
                Count In Stock
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="stock"
                type="number"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col gap-2  w-[450px]">
              <label className="text-xl text-slate-500" htmlFor="category">
                Category
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>

            <div className="flex flex-col gap-2  w-[450px]">
              <label className="text-xl text-slate-500" htmlFor="description">
                Description
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="description"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-fit mt-4"
              //   style={{ marginTop: "1rem" }}
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;
