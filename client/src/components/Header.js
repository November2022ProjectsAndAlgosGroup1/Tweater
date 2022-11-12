import React from "react";
import Login from "./Login";
import Search from "./Search";

const Header = (props) => {
  const { loggedin, setModalOpen, setModalTitle } = props;

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            twEater
          </a>
          <Search />
          <Login loggedin={loggedin} setModalOpen={setModalOpen} setModalTitle={setModalTitle} />
        </div>
      </nav>
      <div className="title-container container-fluid pe-5 ps-5">
        <h1 className="text-center">title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
          dolorum suscipit fugit dignissimos quisquam voluptates necessitatibus
          aliquid perferendis, id facilis dolores explicabo, fugiat alias labore
          possimus iure voluptatem aspernatur minus!
        </p>
      </div>
    </div>
  );
};

export default Header;
