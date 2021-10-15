import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
const link = new createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "cors",
  },
  withCredentials: true,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
