import axios from "axios"
import { Icon } from "@chakra-ui/react"
import { FaHeart, FaPencilAlt, FaReply, FaTrash } from "react-icons/fa"
const Tweat = (props) => {
    const {
        tweat,
        user,
        allTweats,
        setAllTweats,
        setUpdateTweat,
        setModalOpen,
        setModalTitle,
        setModalSubtitle,
    } = props

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

    const editHandler = () => {
        setUpdateTweat(tweat)
        setModalOpen(true)
        setModalTitle("Edit")
        setModalSubtitle("Edit your Tweat")
    }

    const timeSincePosted = () => {
        const now = new Date()
        const posted = new Date(tweat.createdAt)
        const diff = now - posted
        const seconds = Math.floor(diff / 1000)
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)
        const months = Math.floor(days / 30)
        const years = Math.floor(months / 12)
        if (seconds < 60) {
            return seconds + " seconds ago"
        } else if (minutes < 60) {
            return minutes + " minutes ago"
        } else if (hours < 24) {
            return hours + " hours ago"
        } else if (days < 30) {
            return days + " days ago"
        } else if (months < 12) {
            return months + " months ago"
        } else {
            return years + " years ago"
        }
    }

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
                    <h5> - {timeSincePosted()}</h5>
                </div>
                <p className="card-text">
                    Restaurant: <b>{tweat.restaurantName}</b>
                </p>
                <p className="card-text mb-3 mt-3">
                    Comment: <i>{tweat.text}</i>
                </p>
                <div className="feedOptions w-50 border-2 p-2  mx-auto d-flex justify-content-around">
                    <a href="/">
                        <Icon as={FaHeart} />
                        {/* Reply */}
                        <span>{tweat.replies && tweat.replies.length}</span>
                    </a>
                    {/* <a href="/">
                        <i className="fa fa-share" aria-hidden="true"></i>{" "}
                        ReTweat 
                        <span>{tweat.retweats && tweat.retweats.length}</span>
                    </a> */}
                    <a href="/">
                        <Icon as={FaReply} />
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
