import { Button } from "@chakra-ui/react"
import React from "react"

const Sidebar = (props) => {
    const { loggedin, setModalOpen, setModalTitle } = props
    const handleTweat = (e) => {
        e.preventDefault()
        setModalOpen(true)
        loggedin ? setModalTitle("Login") : setModalTitle("Tweat")
    }

    return (
        <div className="sideBar green container d-flex flex-column align-items-center justify-content-around p-4">
            <div className="container sidebarLinks d-flex flex-column align-items-center justify-content-between p-3">
                <Button>Home</Button>
                <Button>Explore</Button>
                <Button>Profile</Button>
            </div>
            <Button className="btn btn-info" onClick={(e) => handleTweat(e)}>
                TWEAT
            </Button>
        </div>
    )
}

export default Sidebar
