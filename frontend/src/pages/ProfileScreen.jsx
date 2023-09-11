import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../redux/slices/orderApiSlice";
import { setCredentials } from "../redux/slices/authslice";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  //   console.log(orders);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);

        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col md:flex-row gap-4">
      <div className="flex-[1_1_30%]">
        <h2 className="text-[#828f9d] text-4xl font-semibold">User Profile</h2>

        <form onSubmit={submitHandler} className="mt-4">
          <div className="my-2 flex flex-col gap-2  w-full">
            <label className="text-textprimary text-lg" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border rounded-md p-2"
              type="text"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="my-2 flex flex-col gap-2  w-full">
            <label className="text-textprimary text-lg" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full border rounded-md p-2"
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="my-2 flex flex-col gap-2  w-full">
            <label className="text-textprimary text-lg" htmlFor="pw">
              Password
            </label>
            <input
              className="w-full border rounded-md p-2"
              type="password"
              id="pw"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="my-2 flex flex-col gap-2  w-full">
            <label className="text-textprimary text-lg" htmlFor="cfpw">
              Confirm Password
            </label>
            <input
              className="w-full border rounded-md p-2"
              type="password"
              id="cfpw"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          <button
            type="submit"
            className="py-2 px-4 border rounded-lg text-slate-500 font-semibold hover:opacity-60"
          >
            Update
          </button>
          {loadingUpdateProfile && <Loader />}
        </form>
      </div>
      <div className="flex-[1_1_70%] ">
        <h2 className="text-[#828f9d] text-4xl font-semibold">My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <table className="mt-4 w-full text-sm text-left text-gray-500 snap-x">
            <thead className="bg-[#f7fafc]">
              <tr>
                <th className="text-center border-b py-2">ID</th>
                <th className="text-center border-b py-2">DATE</th>
                <th className="text-center border-b py-2">TOTAL</th>
                <th className="text-center border-b py-2">PAID</th>
                <th className="text-center border-b py-2">DELIVERED</th>
                <th className="text-center border-b py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-center ml-2 border-b border-slate-100 py-4">
                    {order._id}
                  </td>
                  <td className="text-center ml-2 border-b border-slate-100 py-4">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="text-center ml-2 border-b border-slate-100 py-4">
                    {order.totalPrice}
                  </td>
                  <td className="text-center ml-2 border-b border-slate-100 py-4">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes
                        style={{
                          color: "red",
                          textAlign: "center",
                          display: "inline-block",
                        }}
                      />
                    )}
                  </td>
                  <td className="text-center ml-2 border-b border-slate-100 py-4">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes
                        style={{
                          color: "red",
                          textAlign: "center",
                          display: "inline-block",
                        }}
                        className="text-red"
                      />
                    )}
                  </td>
                  <td className="text-center ml-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="border py-1 px-2 rounded-lg">
                        Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
