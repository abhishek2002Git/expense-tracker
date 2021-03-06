import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import transContext from "../context/trans/transContext";

const Login = (props) => {
  const context = useContext(transContext);
  const {host } = context;

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState("")
  // ^ provides alert message when login fails or succeeds
  let history = useHistory();

  const [showPassword, setShowPassword] = useState("password")
    const showPass = () =>{
      if (showPassword === "password") {
        setShowPassword("text")
      }
      else{
        setShowPassword("password")
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${host}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      history.push("/");
      console.log(json.authToken);     
    } else {
      setAlertMessage("Please enter valid email and password")

    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div >
      <h1 className="my-3">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type={showPassword}
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className={`form-check form-switch my-4 text-light`}> 
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              onClick={showPass}
            />
            <label style={{color: 'black'}} className="form-check-label" htmlFor="flexSwitchCheckDefault">
              Show Password
            </label>
          </div>
        <div style={{color:'red' }} className="my-2">{alertMessage}</div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ color: "white" }}
        >
          Login
        </button>
      </form>
      <div className="mx-4 my-3">or</div>
      
      <Link
        style={{ color: "white" }}
        className=" btn btn-primary my-1"
        to="/signup"
        role="button"
      >
        Create New Account
      </Link>
    </div>
  );
};

export default Login;
