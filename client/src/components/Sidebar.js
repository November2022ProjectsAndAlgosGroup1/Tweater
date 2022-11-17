import { Button, Divider, Icon } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import { FaMap, FaUserCircle } from "react-icons/fa"
import { RiTwitterFill } from "react-icons/ri"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

const Sidebar = (props) => {
    const navigate = useNavigate()
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

    const handleProfile = (e) => {
        e.preventDefault()
        if (user) {
            navigate(`/profile/${user._id}`)
        } else {
            setModalOpen(true)
            setModalTitle("Login")
            setModalSubtitle("to continue, please login or create an account")
            setWhereTo("profile")
        }
    }

    return (
        <div className="sideBar container d-flex flex-column">
            <div className="container sidebarLinks d-flex flex-column">
                <Button>
                    <Icon as={AiFillHome} />
                    <Link to="/">Home</Link>
                </Button>
                <Divider />
                <Button>
                    <Icon as={FaMap} />
                    <Link to="/explore">Explore</Link>
                </Button>
                <Divider />
                <Button onClick={(e) => handleProfile(e)}>
                    <Icon as={FaUserCircle} />
                    <span>Profile</span>
                </Button>
                <Button
                    className="btn btn-info"
                    onClick={(e) => handleTweat(e)}
                >
                    <Icon as={RiTwitterFill} />
                    twEAT
                </Button>
            </div>
        </div>
    )
}

export default Sidebar
