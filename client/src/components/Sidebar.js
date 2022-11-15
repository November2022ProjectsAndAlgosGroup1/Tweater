import { Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const { loggedin, setModalOpen, setModalTitle, user} = props;
  const handleTweat = (e) => {
    e.preventDefault();
    setModalOpen(true);
    loggedin ? setModalTitle("Login") : setModalTitle("Tweat");
  };

  return (
    <div className="sideBar container d-flex flex-column align-items-center justify-content-around p-4">
      <div className="container sidebarLinks d-flex flex-column align-items-center justify-content-between p-3">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        {/* //! uncomment it after getting id  from the API */}
        {/* <Link to={`/profile/${user._id}`}>Profile</Link> */}
        <Link to={`/profile/${user._id}`}>Profile</Link>
      </div>
      <Button className="btn btn-info" onClick={(e) => handleTweat(e)}>
        TWEAT
      </Button>
    </div>
  );
};

export default Sidebar;
