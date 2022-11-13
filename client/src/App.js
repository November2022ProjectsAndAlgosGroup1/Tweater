import "./App.css"
import Feeds from "./components/Feeds"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Main from "./components/Main"
import axios from "axios"
import { useState } from "react"
import MainModal from "./components/MainModal"

function App() {
    //THIS IS THE YELP API KEY
    // const yelpApiKey = process.env.REACT_APP_API_KEY_YELP
    // console.log('The Yelp API Key is defined in App.js.  You can find it at the top of the App component:  ' + yelpApiKey)
    const [modalTitle, setModalTitle] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [loggedin, setloggedin] = useState(false)
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
            />
            <Main>
                <Sidebar
                    loggedin={loggedin}
                    setModalOpen={setModalOpen}
                    modalTitle={modalTitle}
                    setModalTitle={setModalTitle}
                />
                <Feeds />
            </Main>
        </div>
    )
}

export default App
