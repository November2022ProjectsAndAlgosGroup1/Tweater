import "./App.css";
import Feeds from "./components/Feeds";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import LoginRegForm from "./components/LoginRegForm";
import axios from "axios";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

function App() {
  //THIS IS THE YELP API KEY
  // const yelpApiKey = process.env.REACT_APP_API_KEY_YELP
  // console.log('The Yelp API Key is defined in App.js.  You can find it at the top of the App component:  ' + yelpApiKey)
  const [modalTitle, setModalTitle] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalOpen, setModalOpen] = useState(false);
  const [loggedin, setloggedin] = useState(false);
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

  if (modalOpen) {
    onOpen();
    setModalOpen(false);
  }

  return (
    <div className="App">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginRegForm type={modalTitle} loggedin={loggedin} />
          </ModalBody>
          <ModalFooter>
            {/* 
            //? React doesn't links that don't go anywhere '#' 
            //TODO: style this button to look like a link
            */}
            <button
              name={modalTitle === "Login" ? "Login" : "Register"}
              onClick={(e) => setModalTitle(e.target.name)}
            >
              {modalTitle !== "Login" ? "Already a member?" : "Create an account"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          setModalTitle={setModalTitle}
        />
        <Feeds />
      </Main>
    </div>
  );
}

export default App;
