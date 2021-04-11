import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "./App.css";
import Login, { getUriHash } from "./Login";
import Main from "./Main";

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
      <Router>
        <div>
          <Route path="/login" component={Login} />
          <Route
            exact
            path="/"
            render={() =>
              token ? <Main accessToken={token} /> : <Redirect to="/login" />
            }
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
