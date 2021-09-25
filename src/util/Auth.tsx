import createAuth0Client, { Auth0Client, User } from "@auth0/auth0-spa-js";
import React, { useContext, useEffect, useState } from "react";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.origin);
export const Auth0Context = React.createContext<any>(null);
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: {
  children: any;
  onRedirectCallback?: (T: string) => void;
  domain: string;
  client_id: string;
  redirect_uri: string;
  audience: string;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [auth0Client, setAuth0Client] = useState<Auth0Client | undefined>();
  const [authLoading, setAuthLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  useEffect(() => {
    const initAuth0 = async () => {
      setAuthLoading(true);
      const auth0FromHook = await createAuth0Client(initOptions);

      setAuth0Client(auth0FromHook);
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }
      const isAuthed = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthed);
      if (isAuthed) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setAuthLoading(false);
    };
    initAuth0();
    return () => {};
    // eslint-disable-next-line
  }, []);
  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client!.loginWithPopup(params);
    } catch (err) {
    } finally {
      setPopupOpen(false);
    }

    const user = await auth0Client!.getUser();

    setUser(user);
    setIsAuthenticated(true);
  };
  const handleRedirectCallback = async (): Promise<any> => {
    setAuthLoading(true);

    await auth0Client?.handleRedirectCallback();
    const user = await auth0Client?.getUser();
    setAuthLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        authLoading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any) => auth0Client!.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any) => auth0Client!.loginWithRedirect(...p),
        getTokenSilently: (...p: any) => auth0Client!.getTokenSilently(...p),
        getTokenWithPopup: (...p: any) => auth0Client!.getTokenWithPopup(...p),
        logout: (...p: any) => auth0Client!.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
