import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Login, { getUriHash } from "./Login";
import Main from "./Main";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hash = getUriHash();
    // window.location.hash = "";
    const accessToken = hash.access_token;
    console.log(accessToken);

    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <div>
          {console.log(isLoggedIn)}
          {isLoggedIn === true ? (
            <Route exact path="/" component={Main} />
          ) : (
            <Route path="/login" component={Login} />
          )}
        </div>
      </Router>
    </div>
  );
};

export default App;
