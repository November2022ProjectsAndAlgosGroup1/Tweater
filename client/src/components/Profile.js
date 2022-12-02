import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserAvatar from "./UserAvatar"
import { useBreakpointValue } from "@chakra-ui/media-query";

const Profile = ({ user }) => {
    const avatarSize = useBreakpointValue({ base: "lg", md: "2xl" });
    const [profileUser, setProfileUser] = useState({})
    let { id } = useParams()
    useEffect(() => {
        if (id !== user._id) {
            axios
                .get("http://localhost:8000/api/users/" + id)
                .then((res) => {
                    setProfileUser(res.data)
                })
                .then((err) => console.log(err))
        } else {
            setProfileUser(user)
        }
    }, [id, user])

    console.log(id)
    return (
        <div className="container profile d-flex flex-column align-items-center">
            {/* source image in public folder */}
            <UserAvatar user={profileUser} size={avatarSize} />
            <div className="usersName d-flex flex-column align-items-center justify-content-between profileNameContainer mt-3">
                <h4>{profileUser.name}</h4>
                <h5>@{profileUser.userName}</h5>
            </div>
            {/* <div className="userFollowerContainer d-flex align-items-center justify-content-between mt-3 mb-5">
                <div className="followers d-flex flex-column align-items-center justify-content-center text-center">
                    <span>22</span> Tweats
                </div>
                <span className="ms-2 me-2 text-center">-</span>
                <div className="following d-flex flex-column align-items-center justify-content-center text-center">
                    <span>12</span> Tweats Liked
                </div>
            </div> */}
            <button className="btn btn-warning w-50">Edit</button>
        </div>
    )
}

export default Profile
