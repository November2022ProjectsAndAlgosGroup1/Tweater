import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Feeds from "./components/Feeds";
import Header from "./components/Header";
import Main from "./components/Main";
import MainModal from "./components/MainModal";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  //THIS IS THE YELP API KEY
  // const yelpApiKey = process.env.REACT_APP_API_KEY_YELP
  // console.log('The Yelp API Key is defined in App.js.  You can find it at the top of the App component:  ' + yelpApiKey)
  const [modalTitle, setModalTitle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedin, setloggedin] = useState(false);
  const [user, setUser] = useState();
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
        setloggedin(false);
      });
  };

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
  );
}

export default App;
