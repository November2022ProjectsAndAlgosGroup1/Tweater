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
    //THIS IS THE YELP API KEY
    // const yelpApiKey = process.env.REACT_APP_API_KEY_YELP
    // console.log('The Yelp API Key is defined in App.js.  You can find it at the top of the App component:  ' + yelpApiKey)
    const [center, setCenter] = useState({
        lat: 36.0014242,
        lng: -79.1964102,
    })
    const [loggedin, setloggedin] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalSubtitle, setModalSubtitle] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [user, setUser] = useState({})
    const [whereTo, setWhereTo] = useState({})

    // const getUser= ()=>{
    //     axios.get("http://localhost:8000/api/users/")
    // }

    const handleLogout = (e) => {
        //TODO:  Logout user route
        axios
            .get("http://localhost:8000/api/users/logout", {
                withCredentials: true,
                credentials: "include",
            })
            .then((res) => {
                console.log(res)
                setloggedin(false)
            })
            .catch((err) => console.log(err))
    }

    const getSearchResults = (search) => {
        //TODO:  setSearchResults(res.data)
        //TODO: setCenter(res.data[0].coordinates)
        // axios.post("http://localhost:8000/api/yelp/"), search, {
        //     withCredentials: true,
        //     credentials: "include",
        // }
        // .then((res) => {
        //     setSearchResults(res.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
    // console.log(search)
    search && getSearchResults(search)
    return (
        <div className="App">
            <BrowserRouter>
                <MainModal
                    loggedin={loggedin}
                    modalOpen={modalOpen}
                    modalSubtitle={modalSubtitle}
                    modalTitle={modalTitle}
                    setloggedin={setloggedin}
                    setModalOpen={setModalOpen}
                    setModalTitle={setModalTitle}
                    setModalSubtitle={setModalSubtitle}
                    setUser={setUser}
                    whereTo={whereTo}
                    user={user}
                />
                <Header
                    handleLogout={handleLogout}
                    loggedin={loggedin}
                    search={search}
                    setloggedin={setloggedin}
                    setUser={setUser}
                    setModalOpen={setModalOpen}
                    setModalTitle={setModalTitle}
                    setSearch={setSearch}
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
                                        <h1 className="text-center">title</h1>
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
                                        <Feeds page={"home"} />
                                    </div>
                                </div>
                            </Main>
                        }
                    />
                    <Route
                        path="/explore"
                        element={
                            <Main>
                                <div className=" mainPage w-100">
                                    <div
                                        className="location-results d-flex justify-content-between mapContainer blue"
                                        id="map"
                                    >
                                        <Map
                                            center={center}
                                            page={"Explore"}
                                            searchResults={searchResults}
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

                                        <Feeds page={"explore"} />
                                    </div>
                                </div>
                            </Main>
                        }
                    />
                    <Route
                        path="/profile/:id"
                        element={
                            <Main>
                                <div className="container d-flex">
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
                                    <Feeds page={"explore"} />
                                </div>
                            </Main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
