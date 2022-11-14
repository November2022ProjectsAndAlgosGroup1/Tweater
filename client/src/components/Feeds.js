import React from "react";

const Feeds = () => {
  return (
    <div className="feedSection container p-4">
      <h2 className="fs-4 mb-3 text-light">What your friends are eating</h2>
      <div className="container comments">
        <div className="card d-flex flex-row">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="card-title d-flex">
              <h5>name</h5>
              <h5 className="ms-3 me-3">@nickName</h5>
              <h5>- time posted</h5>
            </div>
            <p className="card-text mb-3 mt-3">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="feedOptions w-50 border-2 p-2  mx-auto d-flex justify-content-between">
              <a href="/">
                <i className="fa fa-reply" aria-hidden="true"></i> Reply
              </a>
              <a href="/">
                <i className="fa fa-share" aria-hidden="true"></i> ReTweat
              </a>
              <a href="/">
                <i className="fa fa-heart-o" aria-hidden="true"></i> Like
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeds;
