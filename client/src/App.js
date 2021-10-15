import "antd/dist/antd.css";
import Header from "./Component/header/header.component";
import NewArivals from "./Component/HomeContents/newarivals/newarivals.component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FourOFour from "./Component/FourOFour/FourOFour.component";
import FooterCompo from "./Component/Footer/Footer.component";
import HomeContents from "./Component/HomeContents/HomeContents.component";
import ShopPage from "./pages/shop-pages/shop-page.component";
import RegisterLogin from "./pages/RegisterLogin/Register.component";
import LoginForm from "./pages/RegisterLogin/Login.component";
import ForgetForm from "./pages/RegisterLogin/forget-pass.component";
import BreadCrumb from "./Component/breadcrumb/breadcrumb.component";
import MyAccount from "./Component/my-account/myaccount.component";
import ViewCart from "./pages/view-cart/viewcart.component";
import Logout from "./redux/myAccount/Logout";
import PaymentPage from "./pages/Payment/PaymentPage.component";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItemTotal } from "./redux/cart/cart.selector";

function App({ total }) {
  return (
    <div className="main">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <NewArivals />
            <HomeContents />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route path="/shop">
            <BreadCrumb title="Shop" />
            <ShopPage />
          </Route>
          <Route path="/cart" exact>
            <BreadCrumb title="Cart" />
            <ViewCart />
          </Route>
          <Route path="/checkout" exact>
            <BreadCrumb title="Checkout" />
            <RegisterLogin />
          </Route>
          <Route path="/payment-method">
            <BreadCrumb title="Payment" />
            <PaymentPage total={total} />
          </Route>
          <Route path="/forget-pass">
            <BreadCrumb title="Reset Your Password" />
            <ForgetForm />
          </Route>

          <Route path="/myaccount">
            <BreadCrumb title="Account Details" />
            <MyAccount />
          </Route>

          <Route path="/login" exact>
            <LoginForm />
          </Route>
          <Route path="*" exact>
            <FourOFour />
          </Route>
        </Switch>
        <FooterCompo />
      </Router>
    </div>
  );
}

export default connect(
  createStructuredSelector({
    total: selectCartItemTotal,
  })
)(App);
