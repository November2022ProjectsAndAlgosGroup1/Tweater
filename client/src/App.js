import { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Feeds from "./components/Feeds"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Main from "./components/Main"
import MainModal from "./components/MainModal"
import Map from "./components/Map"
import Profile from "./components/Profile"
import ResultsList from "./components/ResultsList"
import Sidebar from "./components/Sidebar"
import "./App.css"

function App() {
    //This fixes missing cookie issue
    axios.defaults.withCredentials = true
    //THIS IS THE YELP API KEY
    // const yelpApiKey = process.env.REACT_APP_API_KEY_YELP
    // console.log('The Yelp API Key is defined in App.js.  You can find it at the top of the App component:  ' + yelpApiKey)
    const [center, setCenter] = useState({
        lat: 51.509865,
        lng: -0.118092,
    })
    const [updateTweat, setUpdateTweat] = useState()
    const [loggedin, setloggedin] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSubtitle, setModalSubtitle] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [allTweats, setAllTweats] = useState([])
    const [user, setUser] = useState({})
    const [whereTo, setWhereTo] = useState({})

    const logged = () => {
        axios
            .get("http://localhost:8000/api/users/getLoggedUser", {
                withCredentials: true,
            })

            .then((res) => {
                setloggedin(true)
                setUser(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        logged()
    }, [])

    const handleLogout = (e) => {
        //TODO:  Logout user route
        axios
            .get("http://localhost:8000/api/users/logout", {
                withCredentials: true,
            })
            .then((res) => {
                setUser({})
                setloggedin(false)
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        //if searchResults set center of map to first result
        if (searchResults.length > 0) {
            setCenter({
                lat: searchResults[0].coordinates.latitude,
                lng: searchResults[0].coordinates.longitude,
            })
        }
    }, [searchResults])

    return (
        <div className="App">
            <BrowserRouter>
                <MainModal
                    allTweats={allTweats}
                    loggedin={loggedin}
                    modalOpen={modalOpen}
                    modalSubtitle={modalSubtitle}
                    modalTitle={modalTitle}
                    setAllTweats={setAllTweats}
                    setloggedin={setloggedin}
                    setModalOpen={setModalOpen}
                    setModalTitle={setModalTitle}
                    setModalSubtitle={setModalSubtitle}
                    setSearchResults={setSearchResults}
                    setUpdateTweat={setUpdateTweat}
                    setUser={setUser}
                    whereTo={whereTo}
                    updateTweat={updateTweat}
                    user={user}
                />
                <Header
                    handleLogout={handleLogout}
                    loggedin={loggedin}
                    searchResults={searchResults}
                    setloggedin={setloggedin}
                    setModalOpen={setModalOpen}
                    setModalTitle={setModalTitle}
                    setSearchResults={setSearchResults}
                    setWhereTo={setWhereTo}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main>
                                <div className="mainPage ">
                                    <div className="title-container container-fluid pe-5">
                                        <Hero title={"twEater"} />
                                    </div>
                                    <div className="d-flex homePageContainer mobileResponsive">
                                        <Sidebar
                                            user={user}
                                            loggedin={loggedin}
                                            setModalOpen={setModalOpen}
                                            modalTitle={modalTitle}
                                            setModalTitle={setModalTitle}
                                            setModalSubtitle={setModalSubtitle}
                                            setWhereTo={setWhereTo}
                                        />
                                        <Feeds
                                            user={user}
                                            allTweats={allTweats}
                                            setAllTweats={setAllTweats}
                                            setModalOpen={setModalOpen}
                                            setModalTitle={setModalTitle}
                                            setModalSubtitle={setModalSubtitle}
                                            setUpdateTweat={setUpdateTweat}
                                        />
                                    </div>
                                </div>
                            </Main>
                        }
                    />
                    <Route
                        path="/explore"
                        element={
                            <Main>
                                <div className="mainPage">
                                    <div
                                        className="location-results d-flex mb-2 mapContainer"
                                        id="map"
                                    >
                                        <Map
                                            center={center}
                                            searchResults={searchResults}
                                            setSearchResults={setSearchResults}
                                            setCenter={setCenter}
                                        />
                                        <ResultsList results={searchResults} />
                                    </div>
                                    <div className="d-flex homePageContainer mobileResponsive">
                                        <Sidebar
                                            user={user}
                                            loggedin={loggedin}
                                            setModalOpen={setModalOpen}
                                            modalTitle={modalTitle}
                                            setModalTitle={setModalTitle}
                                            setModalSubtitle={setModalSubtitle}
                                            setWhereTo={setWhereTo}
                                        />

                                        <Feeds
                                            user={user}
                                            allTweats={allTweats}
                                            setAllTweats={setAllTweats}
                                            setModalOpen={setModalOpen}
                                            setModalTitle={setModalTitle}
                                            setModalSubtitle={setModalSubtitle}
                                            setUpdateTweat={setUpdateTweat}
                                        />
                                    </div>
                                </div>
                            </Main>
                        }
                    />
                    <Route
                        path="/profile/:id"
                        element={
                            <>
                                <Hero
                                    title={"Profile"}
                                    center={center}
                                    searchResults={searchResults}
                                    setCenter={setCenter}
                                />
                                <Main>
                                    <div className="mainPage w-100">
                                        <div className="d-flex mt-3 p-2 homePageContainer mobileResponsive profile-responsive">
                                            <Sidebar
                                                user={user}
                                                loggedin={loggedin}
                                                setModalOpen={setModalOpen}
                                                modalTitle={modalTitle}
                                                setModalTitle={setModalTitle}
                                                setModalSubtitle={
                                                    setModalSubtitle
                                                }
                                                setWhereTo={setWhereTo}
                                            />
                                            <Profile user={user} />
                                            <Feeds
                                                user={user}
                                                allTweats={allTweats}
                                                setAllTweats={setAllTweats}
                                                setModalOpen={setModalOpen}
                                                setModalTitle={setModalTitle}
                                                setModalSubtitle={
                                                    setModalSubtitle
                                                }
                                                setUpdateTweat={setUpdateTweat}
                                            />
                                        </div>
                                    </div>
                                </Main>
                            </>
                        }
                    />
                    {/* <Route path="/edit-profile/:id"/> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
