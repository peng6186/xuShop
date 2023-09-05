import { useState } from "react";
import { Link } from "react-router-dom";

const LogInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="max-w-[75%] mx-auto py-4 flex justify-center items-center">
      <form className="flex flex-col gap-8">
        <h2 className="text-[#828f9d] text-4xl font-semibold">Log In</h2>
        <div className="flex flex-col gap-2 w-[450px]">
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
        <div className="flex flex-col gap-2  w-[450px]">
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
        <button className="py-2 px-4 border rounded-lg text-slate-500 font-semibold hover:opacity-60">
          Log In
        </button>
        <p>
          New Customer?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInScreen;
