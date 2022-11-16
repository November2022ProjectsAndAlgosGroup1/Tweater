import axios from "axios"
import { Icon } from "@chakra-ui/react"
import { FaPencilAlt, FaTrash } from "react-icons/fa"
const Tweat = (props) => {
    const { tweat, user, allTweats, setAllTweats } = props

    const deleteHandler = () => {
        const deletedTweat = tweat
        axios
            .delete("http://localhost:8000/api/tweats/" + tweat._id)
            .then((res) => {
                const tweats = allTweats.filter(
                    (tweat) => tweat._id !== deletedTweat._id
                )
                setAllTweats(tweats)
                console.log("tweat deleted", res)
            })
            .catch((err) => console.log(err))
    }

    const editHandler = () => {}
    console.log("tweat", tweat)
    return (
        <div className="card d-flex flex-row">
            <img
                src={`http://localhost:8000/images/${tweat.image}`}
                className="card-img-top"
                alt={`${tweat.image}`}
            />
            <div className="card-body">
                <div className="card-title d-flex">
                    <h5>{tweat.userID && tweat.userID.name}</h5>
                    <h5 className="ms-3 me-3">
                        @{tweat.userID && tweat.userID.userName}
                    </h5>
                    {/* TODO hyperlink to the user's profile route*/}
                    <h5>- time posted</h5>
                </div>
                <p className="card-text mb-3 mt-3">{tweat.text}</p>
                <div className="feedOptions w-50 border-2 p-2  mx-auto d-flex justify-content-around">
                    <a href="/">
                        <i className="fa fa-reply" aria-hidden="true"></i>
                        {/* Reply */}
                        <span>{tweat.replies && tweat.replies.length}</span>
                    </a>
                    {/* <a href="/">
                        <i className="fa fa-share" aria-hidden="true"></i>{" "}
                        ReTweat 
                        <span>{tweat.retweats && tweat.retweats.length}</span>
                    </a> */}
                    <a href="/">
                        <i className="fa fa-heart-o" aria-hidden="true"></i>{" "}
                        {/* Like */}
                        {tweat.likes && tweat.likes.length}
                    </a>
                    {user._id && user._id === tweat.userID._id ? (
                        <>
                            <button onClick={editHandler}>
                                <Icon as={FaPencilAlt} />
                            </button>
                            <button onClick={deleteHandler}>
                                <Icon as={FaTrash} />
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default Tweat
