import React from "react";
import "./newArivals.css";
import { useQuery, gql } from "@apollo/client";
import Slider from "react-slick";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const NEW_ARIVALS = gql`
  query {
    categories {
      catname
      catimage
      id
    }
  }
`;

const NewArivals = () => {
  const { loading, error, data } = useQuery(NEW_ARIVALS);
  const settings = {
    className: "center",
    accessibility: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  if (error) {
    return error.message;
  }

  return (
    <div className="carousel-container-home">
      {loading ? (
        <div
          className="carousel-spinner"
          style={{ display: loading ? "flex" : "none" }}
        >
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
          <Spinner animation="grow" variant="light" />
          <Spinner animation="grow" variant="dark" />
        </div>
      ) : (
        <Slider {...settings}>
          {data.categories
            .map((images) => [images.id, images.catimage, images.catname])
            .map((image) => (
              <div key={image[1]} className="single-item-home">
                <img src={image[1]} alt={image[1]} />
                <div className="slider-content">
                  <h1 class="title">
                    Feeling relax day, <br /> Enjoy weekend
                  </h1>
                  <Link to={`/shop/`} className="shop-now">
                    Shop Now!
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      )}
    </div>
  );
};

export default NewArivals;
