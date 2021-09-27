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
                  <Link to={`/shop/category/${image[2]}`} className="shop-now">
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

// {
//   "data": {
//     "categories": [
//       {
//         "catname": "Decor",
//         "id": "6146d5962eb39a39da2d7fec"
//       },
//       {
//         "catname": "Fashion",
//         "id": "6146d5e12eb39a39da2d7fef"
//       },
//       {
//         "catname": "Jwellery",
//         "id": "6146d5eb2eb39a39da2d7ff2"
//       },
//       {
//         "catname": "Women",
//         "id": "6146d5fb2eb39a39da2d7ff5"
//       },
//       {
//         "catname": "Cosmetics",
//         "id": "6146d6372eb39a39da2d7ff8"
//       },
//       {
//         "catname": "Wearable",
//         "id": "6146d6562eb39a39da2d7ffb"
//       },
//       {
//         "catname": "Perfumes",
//         "id": "6146d6602eb39a39da2d7ffe"
//       },
//       {
//         "catname": "Swimsuit",
//         "id": "6146d6762eb39a39da2d8001"
//       }
//     ]
//   }
//}
