import { useState, useEffect } from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Feeds from "./components/Feeds"
import Header from "./components/Header"
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
        lat: 36.0014242,
        lng: -79.1964102,
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
                    setUser={setUser}
                    setModalOpen={setModalOpen}
                    setModalTitle={setModalTitle}
                    setSearchResults={setSearchResults}
                    user={user}
                    setWhereTo={setWhereTo}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main>
                                <div className="mainPage">
                                    <div className="title-container container-fluid pe-5 ps-5 mt-3 text-light">
                                        <h1 className="text-center">Title</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur adipisicing elit. Veniam
                                            dolorum suscipit fugit dignissimos
                                            quisquam voluptates necessitatibus
                                            aliquid perferendis, id facilis
                                            dolores explicabo, fugiat alias
                                            labore possimus iure voluptatem
                                            aspernatur minus!
                                        </p>
                                    </div>
                                    <div className="d-flex mt-4">
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
                                <div className="mainPage w-100">
                                    <div
                                        className="location-results d-flex mb-2 mapContainer"
                                        id="map"
                                    >
                                        <Map
                                            center={center}
                                            page={"Explore"}
                                            searchResults={searchResults}
                                            setCenter={setCenter}
                                        />
                                        <ResultsList results={searchResults} />
                                    </div>
                                    <div className="d-flex justify-content-between">
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
                            <Main>
                                <div className="mainPage w-100">
                                    <div className="d-flex mt-3 p-2">
                                        <Sidebar
                                            user={user}
                                            loggedin={loggedin}
                                            setModalOpen={setModalOpen}
                                            modalTitle={modalTitle}
                                            setModalTitle={setModalTitle}
                                            setModalSubtitle={setModalSubtitle}
                                            setWhereTo={setWhereTo}
                                        />
                                        <Profile user={user} />
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
                    {/* <Route path="/edit-profile/:id"/> */}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
