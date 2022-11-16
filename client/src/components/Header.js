import React from "react"
import Login from "./Login"
import SearchBar from "./SearchBar"

const Header = (props) => {
    const {
        loggedin,
        handleLogout,
        page,
        user,
        setUser,
        search,
        setSearch,
        setSearchResults,
        setModalOpen,
        setModalTitle,
    } = props

    return (
        <div className="container-fluid  ">
            <nav className="header container-fluid navbar navbar-expand-lg navbar-light p-3">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <a
                        href="/"
                        className="navbar-brang logo d-flex justify-content-center align-items-center logoFont"
                    >
                        TwEater
                    </a>

                    <SearchBar
                        type="header"
                        setSearchResults={setSearchResults}
                    />
                    <Login
                        loggedin={loggedin}
                        handleLogout={handleLogout}
                        setModalOpen={setModalOpen}
                        setModalTitle={setModalTitle}
                    />
                </div>
            </nav>
        </div>
    )
}

export default Header
