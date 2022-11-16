import { useEffect } from "react"
import { Icon } from "@chakra-ui/react"
import { BsPatchCheckFill } from "react-icons/bs"

const ModalSuccess = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 800)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className="success-content">
            <span> </span>
            <Icon className="success" as={BsPatchCheckFill} />
            <p>{message}</p>
        </div>
    )
}

export default ModalSuccess
