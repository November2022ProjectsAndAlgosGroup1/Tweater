const Tweat = (props) => {
    const { tweat } = props
    return (
        <div className="card d-flex flex-row">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
                <div className="card-title d-flex">
                    <h5>{tweat.userID && tweat.userID.name}</h5>
                    <h5 className="ms-3 me-3">
                        @{tweat.userID && tweat.userID.userName}
                    </h5>{" "}
                    {/* TODO hyperlink to the user's profile route*/}
                    <h5>- time posted</h5>
                </div>
                <p className="card-text mb-3 mt-3">{tweat.text}</p>
                <div className="feedOptions w-50 border-2 p-2  mx-auto d-flex justify-content-between">
                    <a href="/">
                        <i className="fa fa-reply" aria-hidden="true"></i> Reply
                        <span>{tweat.replies && tweat.replies.length}</span>
                    </a>
                    <a href="/">
                        <i className="fa fa-share" aria-hidden="true"></i>{" "}
                        ReTweat
                        <span>{tweat.retweats && tweat.retweats.length}</span>
                    </a>
                    <a href="/">
                        <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                        Like
                        {tweat.likes && tweat.likes.length}
                    </a>
                </div>
            </div>
        </div>
    )
}
export default Tweat
