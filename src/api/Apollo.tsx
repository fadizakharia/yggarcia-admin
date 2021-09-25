import React, { useEffect } from "react";
import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0Client } from "@auth0/auth0-spa-js";
import CreateAuth0Client from "./Graphql/CreateAuth0Client";

/* Make sure auth0 client is available before AuthProvider gets assigned */
const Apollo: React.FunctionComponent<any> = (props) => {
  let auth0Client: Auth0Client;
  useEffect(() => {
    const setAuth0Client = async () => {
      auth0Client = await CreateAuth0Client();
    };
    setAuth0Client();
    return () => {};
  }, []);

  /* Set URI for all Apollo GraphQL requests (backend api) */
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_BASE_URL,
  });

  /* Set in-memory token to reduce async requests */
  let token: string;

  /* Create Apollo Link to supply token with either
   * in-memory ref or auth0 req'ed token or redirect (built into
   * getTokenSilently
   */
  const withTokenLink = setContext(async () => {
    // return token if there
    if (token) return { auth0Token: token };

    // else check if valid token exists with client already and set if so
    const newToken = await auth0Client.getTokenSilently();
    token = newToken;
    return { auth0Token: newToken };
  });

  /* Create Apollo Link to supply token in auth header with every gql request */
  const authLink = setContext((_, { headers, auth0Token }) => ({
    headers: {
      ...headers,
      ...(auth0Token ? { authorization: `Bearer ${auth0Token}` } : {}),
    },
  }));
  console.log(authLink);

  /* Create Apollo Link array to pass to Apollo Client */
  const link = ApolloLink.from([withTokenLink, authLink, httpLink]);

  /* Set up local cache */
  const cache = new InMemoryCache();

  /* Create Apollo Client */
  const client = new ApolloClient({
    link,
    cache,
  });

  return (
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        redirectUri={window.location.origin}
      >
        {props.children}
      </Auth0Provider>
    </ApolloProvider>
  );
};
export default Apollo;
