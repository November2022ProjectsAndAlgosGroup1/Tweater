import { Button } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const Sidebar = (props) => {
    const {
        loggedin,
        setModalOpen,
        setModalTitle,
        setModalSubtitle,
        user,
        setWhereTo,
    } = props
    const handleTweat = (e) => {
        e.preventDefault()
        setModalOpen(true)
        !loggedin ? handleLogin("Login", "tweat") : setModalTitle("Tweat")
    }

    const handleLogin = (title, where) => {
        setModalTitle(title)
        setModalSubtitle("to twEAT, please login or create an account")
        setWhereTo(where)
    }

    return (
        <div className="sideBar container d-flex flex-column align-items-center justify-content-around p-4">
            <div className="container sidebarLinks d-flex flex-column align-items-center justify-content-between p-3">
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                {/* <Link to={`/profile/${user._id}`}>Profile</Link> */}
            </div>
            <Button className="btn btn-info" onClick={(e) => handleTweat(e)}>
                twEAT
            </Button>
        </div>
    )
}

export default Sidebar
