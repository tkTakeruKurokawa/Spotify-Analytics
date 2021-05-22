import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.css";
import Login, { getUriHash } from "./Login/Login";
import Main from "./Main/Main";

export type RequestRequirements = {
  token: string;
  artistsId?: string[];
  albumsId?: string[];
};

export const TokenContext = React.createContext<RequestRequirements>({
  token: "",
});

const GetToken = () => {
  const hash = getUriHash();
  const accessToken = hash.access_token;

  return accessToken;
};

const App = () => {
  const token = GetToken();

  return (
    <div>
      <TokenContext.Provider value={{ token: token }}>
        <Router>
          <div>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Main} />
            {token ? null : <Redirect to="/login" />}
          </div>
        </Router>
      </TokenContext.Provider>
    </div>
  );
};

export default App;
