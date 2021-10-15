import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { message } from "antd";
import { removeAll } from "../../redux/cart/cart.action";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router";

const stripePromise = loadStripe(
  "pk_test_51Jk20oDwPmFHBpCJKS0o6Ts3fqUPCWMYWyObp92saYXcIJRClKZWJxaLpzoBZXwGAUUPBTxdDEZ3ulAnp7fBC0Rn00feQPlaVW"
);

const PAYMENT = gql`
  mutation ($ORderInput: OrderInput!) {
    addToOrder(input: $ORderInput) {
      client_secret
    }
  }
`;

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const userInfo = useSelector((state) => state.user.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userId = userInfo?.id;
  const [submitPayment, { data, loading }] = useMutation(PAYMENT, {
    errorPolicy: "all",
  });
  const cartItemArrayForPayment = cartItems.map((cartItem) => {
    return {
      name: cartItem.name,
      id: cartItem.id,
      price: cartItem.price,
      desc: {
        text: cartItem.desc[0].text,
      },
      quantity: cartItem.quantity,
      image: cartItem.image,
    };
  });

  const Total = Math.ceil(total);

  const logginStatus = useSelector((state) => state.user.loggedinStatus);
  const history = useHistory();

  if (cartItemArrayForPayment.length === 0) {
    history.push("/shop");
  }
  const dispatch = useDispatch();
  if (!logginStatus) {
    history.push("/checkout");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (elements == null) {
      console.log("wrongggg!");
      return;
    }
    try {
      const cardElement = elements.getElement(CardElement);
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        setError(error.message);
      }
    } catch (errorrr) {
      console.log(errorrr);
    }

    await submitPayment({
      variables: {
        ORderInput: {
          products: cartItemArrayForPayment,
          total: Total,
        },
      },
    });

    setSucceeded(true);

    setProcessing(false);

    if (error) {
      setError(error.message);
    } else {
      dispatch(removeAll());
      history.replace("/myaccount");
    }
  };

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    if (data) {
      setClientSecret(data?.addToOrder?.clientSecret);
    }
  }, []);

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment-section">
      <Container>
        <Row>
          <Col>
            <div className="error-message">
              <p>
                {loading
                  ? message.loading("Please give us a moment...")
                  : data && data?.addToOrder
                  ? (dispatch(removeAll()),
                    message.success("successfully purchased!"),
                    history.push("/myaccount"))
                  : error && message.error(error.message)}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <section>
              <h4>This is just a test payment form</h4>
              <p>
                Behind the scene it keeps record of the payment in stripe and
                ShoppingKorbo Data Centre
              </p>
              <hr />
              <p>Use following Card Info to test</p>
              <p>
                <img
                  src="data:image/png;base64,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"
                  alt=""
                />
              </p>
              <hr />
            </section>
          </Col>
        </Row>
        <Row>
          <Col>
            <Elements stripe={stripePromise}>
              <form onSubmit={handleSubmit} className="form-row">
                <CardElement onChange={handleChange} />

                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={() => <h3>Order Total: ${Total}</h3>}
                    decimalScale={2}
                    value={Total}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  <button
                    disabled={processing || disabled || succeeded || !stripe}
                  >
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>

                {/* Errors */}
                {error && <div>{error}</div>}
              </form>
            </Elements>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const PaymentPage = ({ total }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm total={total} />
  </Elements>
);

export default PaymentPage;
