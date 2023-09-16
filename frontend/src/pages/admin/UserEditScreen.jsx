import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("user updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <div className="max-w-[75%] mx-auto py-4 flex flex-col  gap-4">
      <Link to="/admin/userlist" className="btn my-3 w-fit">
        Go Back
      </Link>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#828f9d] text-4xl font-semibold">Edit User</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message || error.error}</Message>
        ) : (
          <form className="mt-6 flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2  w-[450px]">
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
              <label className="text-xl text-slate-500" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full border rounded-md p-2"
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className="flex items-center gap-2  w-[450px]">
              <p className="text-xl text-slate-500">Is Admin:</p>
              {isAdmin ? (
                <FaCheck style={{ color: "green" }} />
              ) : (
                <FaTimes style={{ color: "red" }} />
              )}
            </div>

            <button type="submit" className="btn btn-primary w-fit mt-4">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;
