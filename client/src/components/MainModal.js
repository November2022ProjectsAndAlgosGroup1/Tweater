import { useState, useEffect } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import LoginRegForm from "./LoginRegForm"
import TweatForm from "./TweatForm"
import ModalSuccess from "./ModalSuccess"
import ModalEdit from "./ModalEdit"

const MainModal = (props) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const {
        allTweats,
        loggedin,
        modalOpen,
        modalSubtitle,
        modalTitle,
        setAllTweats,
        setloggedin,
        setModalOpen,
        setModalSubtitle,
        setModalTitle,
        setSearchResults,
        setUpdateTweat,
        setUser,
        updateTweat,
        user,
        whereTo,
    } = props
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const handleModal = () => {
            setModalOpen(false)
            onOpen()
        }
        if (modalOpen) {
            handleModal()
        }
    }, [modalOpen, setModalOpen, onOpen])
    console.log(modalTitle)
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <h3> {modalTitle}</h3>
                    {modalSubtitle && <p> {modalSubtitle}</p>}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {modalTitle === "Tweat" ? (
                        <TweatForm
                            allTweats={allTweats}
                            setAllTweats={setAllTweats}
                            setMessage={setMessage}
                            setModalTitle={setModalTitle}
                            setSearchResults={setSearchResults}
                            user={user}
                        />
                    ) : modalTitle === "Success" ? (
                        <ModalSuccess message={message} onClose={onClose} />
                    ) : modalTitle === "Edit" ? (
                        <ModalEdit
                            allTweats={allTweats}
                            updateTweat={updateTweat}
                            setAllTweats={setAllTweats}
                            setModalTitle={setModalTitle}
                            setModalSubtitle={setModalSubtitle}
                            setUpdateTweat={setUpdateTweat}
                        />
                    ) : (
                        <LoginRegForm
                            loggedin={loggedin}
                            type={modalTitle}
                            setloggedin={setloggedin}
                            setMessage={setMessage}
                            setModalOpen={setModalOpen}
                            setModalTitle={setModalTitle}
                            setModalSubtitle={setModalSubtitle}
                            setUser={setUser}
                            user={user}
                            whereTo={whereTo}
                        />
                    )}
                </ModalBody>
                <ModalFooter>
                    {/* 
                //? React doesn't links that don't go anywhere '#' 
                //TODO: style this button to look like a link
                */}
                    {modalTitle !== "Tweat" || modalTitle !== "Success" ? (
                        <button
                            name={modalTitle === "Login" ? "Register" : "Login"}
                            onClick={(e) => setModalTitle(e.target.name)}
                        >
                            {modalTitle === "Login"
                                ? "Or create an account"
                                : modalTitle === "Register"
                                ? "Already a member? Login"
                                : null}
                        </button>
                    ) : null}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default MainModal
