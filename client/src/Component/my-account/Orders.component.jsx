import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import CurrencyFormat from "react-currency-format";
import "./order.styles.css";

const ORDERS = gql`
  query {
    getOrders {
      id
      total
      status
      tracking_number
      userId
      createdAt
      products {
        id
        name
        image
        price
        quantity
        desc {
          weight
          Dimensions
        }
      }
      shipping {
        address
        city
        country
      }
    }
  }
`;
function Orders({ putkey }) {
  const { loading, error, data, refetch } = useQuery(ORDERS, {
    errorPolicy: "all",
  });
  const [oProds, setOPRods] = useState([]);
  useEffect(() => {
    if (data) {
      setOPRods(data?.getOrders);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [putkey]);

  if (loading) {
    return "loading....";
  }

  return (
    <div className="order-page">
      <h1>Orders</h1>
      {oProds?.map((order) => (
        <div className="order-container" key={order.id}>
          <div className="order-meta">
            <p className="order__date">
              Data: {new Date(order.createdAt).getFullYear()}-
              {new Date(order.createdAt).getMonth() + 1}-
              {new Date(order.createdAt).getDate()}
            </p>
            <p className="order_ID">
              Tracking NO: <em>{order.tracking_number}</em>
            </p>
          </div>
          <div className="order-meta">
            <p>
              Total:{" "}
              <em>
                <CurrencyFormat
                  value={order.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </em>
            </p>
            <p>
              Order Status: <em>{order.status}</em>
            </p>
          </div>
          {order.products.map((product) => (
            <div className="order-product">
              <img src={product.image[0]} alt="" />
              <div className="oproduct-content">
                {product.name}
                <CurrencyFormat
                  value={product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                {product.desc.weight || ""}
                {product.desc.Dimensions || ""}
              </div>
              <div className="order-qty">
                {product.quantity} <span>X</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
