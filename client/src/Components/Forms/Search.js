import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
const host = "http://localhost:8080";

const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useSearch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${host}/api/v1/product/product-search/${value.keyword}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    setValue({ ...value, results: data });
    navigate("/product/search");
  };
  return (
    <div className="search_form">
      <form onSubmit={handleSubmit} className="d-flex align-items-center gap-2">
        <input
          type="text"
          onChange={(e) => setValue({ ...value, keyword: e.target.value })}
          className="search_input"
          placeholder="What are you looking for?"
        />
        <div className="search-btn">
          <button type="submit" className="btn btn-success btn-sm">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
