import { useEffect } from "react"
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

const MainModal = (props) => {
    const { onOpen, isOpen, onClose } = useDisclosure()
    const {
        user,
        setUser,
        modalOpen,
        modalSubtitle,
        setModalOpen,
        loggedin,
        setloggedin,
        modalTitle,
        setModalTitle,
        setModalSubtitle,
        whereTo,
    } = props

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
                    {modalTitle !== "Tweat" ? (
                        <LoginRegForm
                            loggedin={loggedin}
                            type={modalTitle}
                            setloggedin={setloggedin}
                            setModalOpen={setModalOpen}
                            setModalTitle={setModalTitle}
                            setModalSubtitle={setModalSubtitle}
                            setUser={setUser}
                            user={user}
                            whereTo={whereTo}
                        />
                    ) : (
                        <TweatForm user={user} />
                    )}
                </ModalBody>
                <ModalFooter>
                    {/* 
                //? React doesn't links that don't go anywhere '#' 
                //TODO: style this button to look like a link
                */}
                    {modalTitle !== "Tweat" && (
                        <button
                            name={modalTitle === "Login" ? "Register" : "Login"}
                            onClick={(e) => setModalTitle(e.target.name)}
                        >
                            {modalTitle !== "Login"
                                ? "Already a member? Login"
                                : "Or create an account"}
                        </button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default MainModal
