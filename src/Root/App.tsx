import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login, { getUriHash } from "./Login/Login";
import Main from "./Main/Main";

export const TokenContext = React.createContext<string>("");

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = getUriHash();
    // window.location.hash = "";
    const accessToken = hash.access_token;
    console.log(accessToken);

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  return (
    <div>
      <TokenContext.Provider value={token}>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Main} />
          </div>
        </Router>
      </TokenContext.Provider>
    </div>
  );
};

export default App;
