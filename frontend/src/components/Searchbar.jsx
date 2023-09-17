import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Searchbar = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      setKeyword("");
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className="flex items-center gap-2">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        placeholder="Search Products..."
        className="outline-0 bg-transparent border-b border-gray-300 text-slate-300 text-lg
      placeholder:text-slate-400"
      />
      <button className="border py-2 px-4 rounded-md font-semibold text-slate-400 hover:text-slate-300">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
