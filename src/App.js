import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Balance from "./components/Balance";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import TransState from "./context/trans/TransState";

function App() {
  return (
    <div>
      <TransState>
        <Router>
          <Balance />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </TransState>
    </div>
  );
}

export default App;
