import React, { useState } from "react";
import { useHistory } from "react-router";
import "./search.styles.css";
import SearchTrigger from "../../redux/product/product.reducer";
import { useDispatch } from "react-redux";

function Search() {
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "TRIGGER_SEARCH", payload: tag });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Products..."
        onChange={handleChange}
        value={tag}
      />
      <div className="close" style={{ display: "none" }}>
        X
      </div>
    </form>
  );
}

export default Search;
