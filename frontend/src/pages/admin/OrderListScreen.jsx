import React from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaTimes } from "react-icons/fa";
import { useGetOrdersQuery } from "../../redux/slices/orderApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  return (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col justify-center items-center gap-4">
      {" "}
      <>
        <h1 className="text-[#828f9d] text-4xl font-semibold">Orders</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <table className="table ">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="btn">Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    </div>
  );
};

export default OrderListScreen;
