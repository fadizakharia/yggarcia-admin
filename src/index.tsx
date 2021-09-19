import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Auth0Provider } from "./util/Auth";

import ApolloWrapper from "./util/ApolloWrapper";
import { ThemeProvider } from "@material-ui/core";
import defaultTheme from "./styles/standardtheme";

/* Set up local cache */

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE!}
      redirect_uri={window.location.origin}
    >
      <Provider store={store}>
        <ApolloWrapper>
          <ThemeProvider theme={defaultTheme}>
            <App />
          </ThemeProvider>
        </ApolloWrapper>
      </Provider>
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
