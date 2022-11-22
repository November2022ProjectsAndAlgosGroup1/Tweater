import { Link } from "react-router-dom";
import React from "react";
import Login from "./Login";
import SearchBar from "./SearchBar";

const Header = (props) => {
  const {
    loggedin,
    handleLogout,
    setSearchResults,
    setModalOpen,
    setModalTitle,
  } = props;

  return (
    // <div>
    //   <nav className="header container-fluid navbar navbar-expand-md navbar-light p-3">
    //     <div className="container-fluid d-flex justify-content-between align-items-center inner-header">
    //       <Link
    //         to="/"
    //         className="navbar-brang logo d-flex justify-content-center align-items-center logoFont"
    //       >
    //         TwEater
    //       </Link>

    //       <SearchBar type="header" setSearchResults={setSearchResults} />
    //       <Login
    //         loggedin={loggedin}
    //         handleLogout={handleLogout}
    //         setModalOpen={setModalOpen}
    //         setModalTitle={setModalTitle}
    //       />
    //     </div>
    //   </nav>
    // </div>
    <div>
    <nav className="header container-fluid navbar navbar-expand-md navbar-light p-3 d-flex justify-content-between align-items-center">
 
        <Link
          to="/"
          className="navbar-brang logo d-flex justify-content-center align-items-center logoFont"
        >
          TwEater
        </Link>

        <SearchBar type="header" setSearchResults={setSearchResults} />
        <Login
          loggedin={loggedin}
          handleLogout={handleLogout}
          setModalOpen={setModalOpen}
          setModalTitle={setModalTitle}
        />
    
    </nav>
  </div>
  );
};

export default Header;
