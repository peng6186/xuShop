import React from "react";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../redux/slices/productsApiSlice";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm("Do you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const deleteHandler = async (id) => {
    if (window.confirm("Do you want to delete this product")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col  gap-4">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-[#828f9d] text-4xl font-semibold">Products</h1>
        </div>
        <div className="">
          <button
            onClick={createProductHandler}
            className="px-4 py-2 border flex items-center gap-2 rounded-md"
          >
            <FaPlus /> Create Product
          </button>
        </div>
      </div>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="flex items-start gap-2">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="border">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="border"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{}} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
