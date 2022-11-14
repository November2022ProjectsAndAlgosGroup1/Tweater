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
    const { user, setUser, modalOpen, setModalOpen, loggedin, setloggedin, modalTitle, setModalTitle } =
        props

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
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {modalTitle !== "Tweat" ? (
                        <LoginRegForm 
                            type={modalTitle} 
                            loggedin={loggedin} 
                            setloggedin={setloggedin}
                            user={user}
                            setUser={setUser}
                        />
                    ) : (
                        <TweatForm />
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
