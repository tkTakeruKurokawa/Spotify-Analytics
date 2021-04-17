import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Personalization from "./Personalization/Personalization";

const Main = (props: { accessToken: string }) => {
  return (
    <div>
      {/* <Router>
        <div>{token ? null : <Redirect to="/login" />}</div>
      </Router> */}

      <Personalization />
    </div>
  );
};

export default Main;
