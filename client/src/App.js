import { useState } from "react"
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Feeds from "./components/Feeds"
import Header from "./components/Header"
import Main from "./components/Main"
import MainModal from "./components/MainModal"
import Map from "./components/Map"
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
    const [modalOpen, setModalOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [user, setUser] = useState()

    // const getUser= ()=>{
    //     axios.get("http://localhost:8000/api/users/")
    // }
    const handleLogout = () => {
        axios
            .post("http://localhost:8000/api/users/logout", {
                withCredentials: true,
                credentials: "include",
            })
            .then((res) => {
                setloggedin(false)
            })
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
    search && getSearchResults(search)
    return (
        <div className="App">
            <MainModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                modalTitle={modalTitle}
                setModalTitle={setModalTitle}
                loggedin={loggedin}
            />
            <Header
                loggedin={loggedin}
                setloggedin={setloggedin}
                setModalOpen={setModalOpen}
                setModalTitle={setModalTitle}
                handleLogout={handleLogout}
                setSearch={setSearch}
                setSearchResults={setSearchResults}
            />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Main>
                                <Sidebar
                                    user={user}
                                    loggedin={loggedin}
                                    setModalOpen={setModalOpen}
                                    modalTitle={modalTitle}
                                    setModalTitle={setModalTitle}
                                />
                                <Feeds page={"home"} />
                            </Main>
                        }
                    />
                    <Route
                        path="/explore"
                        element={
                            <Main>
                                <Sidebar
                                    user={user}
                                    loggedin={loggedin}
                                    setModalOpen={setModalOpen}
                                    modalTitle={modalTitle}
                                    setModalTitle={setModalTitle}
                                />
                                <div className="location-results">
                                    <Map
                                        center={center}
                                        page={"Explore"}
                                        searchResults={searchResults}
                                    />
                                    <ResultsList results={searchResults} />
                                </div>
                                <Feeds page={"explore"} />
                            </Main>
                        }
                    />
                    <Route
                        path="/profile/:id"
                        element={
                            <Main>
                                <Sidebar
                                    user={user}
                                    loggedin={loggedin}
                                    setModalOpen={setModalOpen}
                                    modalTitle={modalTitle}
                                    setModalTitle={setModalTitle}
                                />
                                <Feeds page={"explore"} />
                            </Main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
