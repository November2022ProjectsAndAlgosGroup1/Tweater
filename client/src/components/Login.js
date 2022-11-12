import React, { useState } from "react";
import LoginRegForm from "./LoginRegForm"
import { Button } from "@chakra-ui/react";
const Login = (props) => {

  const { loggedin, setModalOpen, setModalTitle } = props;

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name !== "logout") {
      setModalOpen(true)
      setModalTitle(e.target.name);
    } else {
      props.handleLogout();
    }
  };
  return (
    <div className="d-flex">
      {!props.loggedin ? (
        <Button as="a" name="login" onClick={(e) => handleClick(e)}>
          Login
        </Button>
      ) : (
        <Button as="a" name="logout" onClick={(e) => handleClick(e)}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Login;
