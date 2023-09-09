import React from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { useGetOrderDetailQuery } from "../redux/slices/orderApiSlice";
import { useParams, Link } from "react-router-dom";
const OrderScreen = () => {
  const { id: orderId } = useParams();
  console.log(orderId);
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailQuery(orderId);

  console.log(order);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col  items-center">
      <div className="self-start text-3xl text-textprimary font-bold">
        <h2>Order: {order._id}</h2>
      </div>

      <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6 mt-10 w-full">
        <div className="order-detail flex-1 max-w-[550px]">
          <div className="shipping flex flex-col gap-2">
            <h2 className="text-textprimary text-2xl font-bold">Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <Message color="green">Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message>Not Delivered</Message>
            )}
          </div>
          <hr className="mb-4" />
          <div className="payment flex flex-col gap-2">
            <h2 className="text-textprimary text-2xl font-bold">
              Payment Method
            </h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not Paid</Message>
            )}
          </div>
          <hr className="my-4" />
          <div className="orderItems flex flex-col gap-2">
            <h2 className="text-textprimary text-2xl font-bold">Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Order is empty</Message>
            ) : (
              <div variant="flush">
                {order.orderItems.map((item) => (
                  <div key={item._id}>
                    <div className="mt-2 flex flex-col md:flex-row items-center gap-2 md:gap-4">
                      <div className="w-[150px] h-[150px] sm:w-[30px] sm:h-[30px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <div>
                        <Link to={`/product/${item._id}`}>
                          <p className="text-base text-slate-400 font-semibold">
                            {item.name}
                          </p>
                        </Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="order-summary flex-1 border rounded-md py-2 px-4 w-full max-w-[400px] h-fit">
          <h2 className="text-xl text-textprimary font-bold">Order Summary</h2>
          <div className="text-textprimary flex flex-col gap-x-2">
            <div className="mt-4 flex justify-between items-center">
              <div>Items</div>
              <div>${order.itemsPrice}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Shipping</div>
              <div>${order.shippingPrice}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </div>
            <div className="flex justify-between items-center">
              <div>Total</div>
              <div>${order.totalPrice}</div>
            </div>
            <div className="mt-4">{/* Playpal placeholder */}</div>
          </div>
        </div>
      </div>
    </div>
  );

  // <div className="max-w-[75%] mx-auto py-4 flex flex-col  items-center">
  //   <div>
  //     <h2>Order {order._id}</h2>
  //   </div>

  //   <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6 mt-10 w-full">
  //     <div className="order-detail flex-1 max-w-[550px]">
  //       <div>
  //         <h2>Shipping</h2>
  //         <p>
  //           <strong>Name: </strong> {order.user.name}
  //         </p>
  //         <p>
  //           <strong>Email: </strong>{" "}
  //           <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
  //         </p>
  //         <p>
  //           <strong>Address:</strong>
  //           {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
  //           {order.shippingAddress.postalCode},{" "}
  //           {order.shippingAddress.country}
  //         </p>
  //         {order.isDelivered ? (
  //           <Message>Delivered on {order.deliveredAt}</Message>
  //         ) : (
  //           <Message>Not Delivered</Message>
  //         )}
  //       </div>
  //     </div>
  //     <div className="order-summary flex-1 border rounded-md py-2 px-4 w-full max-w-[400px] h-fit">
  //       <h2 className="text-xl text-textprimary font-bold">Order Summary</h2>
  //       <div className="text-textprimary flex flex-col gap-x-2">
  //         <div className="mt-4 flex justify-between items-center">
  //           <div>Items</div>
  //           <div>${cart.itemsPrice}</div>
  //         </div>
  //         <div className="flex justify-between items-center">
  //           <div>Shipping</div>
  //           <div>${cart.shippingPrice}</div>
  //         </div>
  //         <div className="flex justify-between items-center">
  //           <div>Tax</div>
  //           <div>${cart.taxPrice}</div>
  //         </div>
  //         <div className="flex justify-between items-center">
  //           <div>Total</div>
  //           <div>${cart.totalPrice}</div>
  //         </div>
  //         <div>{error && <Message>{error?.data?.message}</Message>}</div>
  //         <div className="mt-4">
  //           <button
  //             type="button"
  //             className="py-2 px-4 border rounded-md"
  //             disabled={cart.cartItems === 0}
  //             onClick={placeOrderHandler}
  //           >
  //             Place Order
  //           </button>
  //           {isLoading && <Loader />}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>
};

export default OrderScreen;
