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

function App() {
  return (
    <div className="main">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <NewArivals />
            <HomeContents />
          </Route>
          <Route path="/shop">
            <ShopPage />
          </Route>
          <Route path="/register" exact>
            <RegisterLogin />
          </Route>
          <Route path="/forget-pass">
            <ForgetForm />
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

export default App;
