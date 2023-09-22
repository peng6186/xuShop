import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogInMutation } from "../redux/slices/usersApiSlice";
import { setCredentials } from "../redux/slices/authslice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log({ res });
      dispatch(setCredentials({ ...res }));
      navigate(redirectStr);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLogInMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirectStr = searchParams.get("redirect") || "/";

  // check whether the user is already loggin in when he lands on this page
  useEffect(() => {
    if (userInfo) {
      // if logged in, the user will be redirected
      navigate(redirectStr);
    }
  }, [redirectStr, userInfo]);

  return (
    <div className="max-w-[75%] mx-auto py-4 flex justify-center items-center">
      <form
        className="flex-1 flex flex-col justify-center items-center gap-8 px-4"
        onSubmit={submitHandler}
      >
        <h2 className="text-[#828f9d] text-4xl font-semibold text-center">
          Log In
        </h2>
        <div className="flex-1 flex flex-col gap-2 w-full md:max-w-[450px]">
          <label className="text-xl text-slate-500" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full border rounded-md p-2"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2 w-full md:max-w-[450px]">
          <label className="text-xl text-slate-500" htmlFor="pw">
            Password:
          </label>
          <input
            className="w-full border rounded-md p-2"
            type="password"
            name="password"
            id="pw"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          disabled={isLoading}
          className="flex-1 w-full md:max-w-[450px] py-2 px-4 border rounded-lg text-slate-500 font-semibold hover:opacity-60"
        >
          Log In
        </button>
        {isLoading && <Loader />}
        <p>
          New Customer?{" "}
          <Link
            to={redirectStr ? `/register?redirect=${redirectStr}` : "/register"}
            className="underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInScreen;
