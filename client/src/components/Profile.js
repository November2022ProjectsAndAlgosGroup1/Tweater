import React from "react";

const Profile = () => {
  return (
    <div className="container blue w-25 p-4 d-flex flex-column align-items-center">
<img src="..." className="profileImg" alt="..." />
      <div className="usersName d-flex flex-column">
        <h4>name</h4>
        <h5>nickname</h5>
      </div>
      <div className="userFollowerContainer d-flex mt-3 mb-5">
        <div className="followers">
          <span>0</span> Followers 
        </div> 
        <span className="ms-2 me-2">-</span>
        <div className="following">
           <span>0</span> Following
        </div>
      </div>
      <button className="btn btn-warning">Edit</button>
    </div>
  );
};

export default Profile;
