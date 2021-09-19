import React, { useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { useAuth0 } from "./Auth";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
function ApolloWrapper({ children }: { children: any }) {
  const { isAuthenticated, getTokenSilently } = useAuth0();
  const cache = new InMemoryCache();
  const [bearerToken, setBearerToken] = useState<string>("");
  useEffect(() => {
    const getToken = async () => {
      const token = isAuthenticated ? await getTokenSilently() : "";
      setBearerToken(token);
    };
    getToken();
    return () => {};
  }, [getTokenSilently, isAuthenticated]);
  const authLink = setContext((_, { headers, ...rest }) => {
    if (!bearerToken) {
      return { headers, ...rest };
    }
    return {
      headers: { authorization: `Bearer: ${bearerToken}`, ...headers },
      ...rest,
    };
  });
  /* Create Apollo Client */
  const httpLink = new HttpLink({
    uri: "http://localhost:5000/graphql",
  });
  const httpUploadLink = createUploadLink({
    uri: "http://localhost:5000/graphql",
  });
  const client = new ApolloClient({
    link: authLink.concat(httpUploadLink),
    cache,
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
