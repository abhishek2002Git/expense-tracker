import React, { useContext, useEffect } from "react";
import transContext from "../context/trans/transContext";
import { Link, useHistory , useLocation} from "react-router-dom";

const Balance = () => {
  const context = useContext(transContext);

  const {balance, getBalance } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBalance();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  let history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  let location = useLocation().pathname;

  return (
    <div >
      <nav className={`navbar navbar-expand-lg navbar-dark bg-dark fixed-top ${location==='/login'?'d-none':''} ${location==='/signup'?'d-none':''} `}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Expense Calculator
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ">
              <li className="nav-item">
                <button
                  className={`btn btn-primary forBalanceBtn ${
                    localStorage.getItem("token") ? "" : "d-none"
                  }`}
                >
                  Your Balance: {balance} Rs
                </button>
              </li>
              {!localStorage.getItem("token") ? (
                <form className="d-flex">
                  <Link
                    style={{ color: "white" }}
                    className="btn btn-primary mx-1"
                    to="/login"
                    role="button"
                  >
                    Login
                  </Link>
                  <Link
                    style={{ color: "white" }}
                    className="btn btn-primary "
                    to="/signup"
                    role="button"
                    id="signupBtnPhone"
                  >
                    Signup
                  </Link>
                </form>
              ) : (
                <form style={{ marginBottom: "2px" }} className="d-flex">
                  <button
                    style={{ color: "white" }}
                    onClick={handleLogout}
                    className="btn btn-primary logoutBtn"
                    id="logoutBtnPhone"
                  >
                    Logout
                  </button>
                </form>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Balance;
