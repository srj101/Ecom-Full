import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./search.styles.css";

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tag, setTag] = useState("");
  const handleChange = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "TRIGGER_SEARCH", payload: tag });
    history.push("/shop/search");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Products..."
        onChange={handleChange}
        value={tag}
      />
    </form>
  );
}

export default Search;
