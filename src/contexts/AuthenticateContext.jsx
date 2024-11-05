import { createContext, useContext, useReducer } from "react";

const AuthenticateContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  img: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = function (state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...initialState };
  }
};

function AuthenticateProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthenticateContext.Provider
      value={{ user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthenticateContext.Provider>
  );
}

function useAuthenticateContext() {
  const context = useContext(AuthenticateContext);

  if (context === undefined)
    throw new Error("The context is used outside the provider");

  return context;
}

export { AuthenticateProvider, useAuthenticateContext };
