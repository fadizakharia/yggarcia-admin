import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./store/store";
import defaultTheme from "./styles/standardtheme";
import ApolloWrapper from "./util/ApolloWrapper";
import { Auth0Provider } from "./util/Auth";

/* Set up local cache */

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE!}
      redirect_uri={process.env.REACT_APP_MAIN_URL!}
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
