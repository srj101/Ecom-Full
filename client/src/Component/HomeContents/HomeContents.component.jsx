import React from "react";
import CategoriesShowcase from "./Categories/CategoriesShowcase.component";
import "./homeComponent.styles.css";

function HomeContents() {
  return (
    <div className="home-components">
      <CategoriesShowcase />
    </div>
  );
}

export default HomeContents;
