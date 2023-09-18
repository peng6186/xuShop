import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { toast } from "react-toastify";
import {
  useGetOrderDetailQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from "../redux/slices/orderApiSlice";

import Message from "../components/Message";
import Notification from "../components/Notification";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const [payOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();

    toast.success("Order is paid");
  }
  function onError(err) {
    toast.error(err.message);
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
    toast.success("This order has been delivered");
  };
  useEffect(() => {
    // if Paypal seller Id is succefully loaded
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      // if the order is not paid
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal]);

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
              <Notification>Delivered on {order.deliveredAt}</Notification>
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
              <Notification variant="success">
                Paid on {order.paidAt}
              </Notification>
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
                        <Link to={`/product/${item.product}`}>
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
            <div className="mt-4">
              {!order.isPaid && (
                <div>
                  {isPayOrderLoading && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <div>
                    <button
                      type="button"
                      className="py-2 px-4 border rounded-lg font-bold"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
