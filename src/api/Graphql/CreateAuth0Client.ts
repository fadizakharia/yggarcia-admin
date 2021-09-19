import React from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
async function CreateAuth0Client() {
  return await createAuth0Client({
    domain: process.env.REACT_APP_AUTH0_DOMAIN!,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
    redirectUri: window.location.origin,
  });
}

export default CreateAuth0Client;
