import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login, { getUriHash } from "./Login";
import Main from "./Main";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getUriHash();
    // window.location.hash = "";
    const accessToken = hash.access_token;
    console.log(accessToken);

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return <div>{token ? <Main /> : <Login />}</div>;
  // return <Login />;
};

export default App;
