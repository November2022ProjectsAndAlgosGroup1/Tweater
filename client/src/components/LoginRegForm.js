import { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const LoginRegForm = (props) => {
  //set up state for the form
  const [formLoginData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [formRegisterData, setRegisterFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });

  //track changes in the form
  const handleLoginChange = (e) => {
    if (props.type === "Login") {
      setLoginFormData({
        ...formLoginData,
        [e.target.name]: e.target.value,
      });
    } else {
      setRegisterFormData({
        ...formRegisterData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("logged in!");
    //TODO: verify express routes and mongoose controllers are setup
    // axios
    //   .post("http://localhost:8000/api/users/login", formLoginData, {
    //     withCredentials: true,
    //     credentials: "include",
    //   })
    //   .then((res) => {
    //     setLoginError(null);
    //     setLoginSuccess(res.data.message);
    //     // todo (close modal when successful)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setLoginError(err.response.data.errorMessage);
    //     setLoginSuccess(null);
    //   });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("registered!");
    //TODO: verify express routes and mongoose controllers are setup
    // axios
    //   .post("http://localhost:8000/api/users/register", formRegisterData, {
    //     withCredentials: true,
    //     credentials: "include",
    //   })
    //   .then((res) => {
    //     setLoginSuccess(res.data.message);
    //     setLoginError(null);
    //     // todo (when successful register close modal)
    //   })
    //   .catch((err) => {
    //     setLoginError(err.response.data.message);
    //     setLoginSuccess(null);
    //   });
  };

  return (
    <form
      className="log-reg-form"
      onSubmit={(e) =>
        props.type === "Login" ? handleLogin(e) : handleRegister(e)
      }
    >
      {props.type === "Login" ? (
        <>
          <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="username" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col">
              <input
                type="email"
                name="email"
                className="form-control"
                id="username"
                onChange={handleLoginChange}
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="password" className="col-form-label">
                Password:
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={handleLoginChange}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="name" className="col-form-label">
                Name:
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                onChange={handleLoginChange}
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="userName" className="col-form-label">
                User Name:
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                name="userName"
                className="form-control"
                id="userName"
                onChange={handleLoginChange}
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="email" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                onChange={handleLoginChange}
              />
            </div>
          </div>
          <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="password" className="col-form-label">
                Password:
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                onChange={handleLoginChange}
              />
            </div>
          </div>
          {/* <div className="mb-3 row align-items-center">
            <div className="col-auto">
              <label htmlFor="confirmPassword" className="col-form-label">
              Confirm Password:
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                id="password"
                onChange={handleLoginChange}
              />
            </div>
          </div> */}
        </>
      )}
      {loginError && <p className="error">{loginError}</p>}
      {loginSuccess && <p className="success">{loginSuccess}</p>}
      <Button type="submit" className="btn btn-info">
        Submit
      </Button>
    </form>
  );
};

export default LoginRegForm;
