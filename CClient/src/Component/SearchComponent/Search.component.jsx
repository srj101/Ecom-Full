import React, { useState } from "react";
import { useHistory } from "react-router";
import "./search.styles.css";

function Search() {
  const [tag, setTag] = useState("");
  const handleChange = (e) => {
    setTag(e.target.value);
  };
  const history = useHistory();
  const handleSubmit = () => {
    history.push(`/shop/tag/${tag}`);
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
