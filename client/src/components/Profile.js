import React from "react";

const Profile = ({user}) => {
  return (
    <div className="container blue w-25 p-4 d-flex flex-column align-items-center">
<img src="..." className="profileImg" alt="..." />
      <div className="usersName d-flex flex-column">
        <h4>{user.name}</h4>
        <h5>@{user.userName}</h5>
      </div>
      <div className="userFollowerContainer d-flex mt-3 mb-5">
        <div className="followers">
          <span>{user.tweats.length}</span> Number of Tweats  
        </div> 
        <span className="ms-2 me-2">-</span>
        <div className="following">
           <span>{user.likes.length}</span> Tweats Liked
        </div>
      </div>
      <button className="btn btn-warning">Edit</button>
    </div>
  );
};

export default Profile;
