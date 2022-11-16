import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="container profile w-25 p-4 d-flex flex-column align-items-center ms-2 me-2">
      <img src=""  className="profileImg" alt="" />
      <div className="usersName d-flex flex-column align-items-center justify-content-between profileNameContainer mt-3">
        <h4>{user.name}</h4>
        <h5>@{user.userName}</h5>
      </div>
      <div className="userFollowerContainer d-flex align-items-center justify-content-between mt-3 mb-5 border">
        <div className="followers d-flex flex-column align-items-center justify-content-center text-center">
          <span>{user.tweats.length}</span> Number of Tweats
        </div>
        <span className="ms-2 me-2 text-center">-</span>
        <div className="following d-flex flex-column align-items-center justify-content-center text-center">
          <span>{user.likes.length}</span> Tweats Liked
        </div>
      </div>
      <button className="btn btn-warning w-50">Edit</button>
    </div>
  );
};

export default Profile;
