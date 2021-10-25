import React from "react";
import Banner from "./banner/Banner.component";
import CategoriesShowcase from "./Categories/CategoriesShowcase.component";
import ShoeCollection from "./Collection/ShoeCollection.component";
import "./homeComponent.styles.css";
import NewProds from "./NewProds/NewProds.component";
import NewsLetter from "./NewsLetter/NewsLetter.component";

function HomeContents() {
  return (
    <div className="home-components">
      <CategoriesShowcase />
      <ShoeCollection />
      <NewProds />
      <Banner />
      <NewsLetter />
    </div>
  );
}

export default HomeContents;
