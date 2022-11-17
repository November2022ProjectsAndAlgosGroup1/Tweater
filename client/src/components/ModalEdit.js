import { useState } from "react"
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    Textarea,
} from "@chakra-ui/react"
import axios from "axios"

const ModalEdit = (props) => {
    const {
        allTweats,
        updateTweat,
        setAllTweats,
        setUpdateTweat,
        setModalTitle,
        setModalSubtitle,
    } = props
    const [error, setError] = useState("")

    const handleTextArea = (e) => {
        setError("")
        setUpdateTweat({ ...updateTweat, text: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .put(
                "http://localhost:8000/api/tweats/" + updateTweat._id,
                updateTweat
            )
            .then((res) => {
                setAllTweats(
                    allTweats.map((tweat) => {
                        if (tweat._id === updateTweat._id) {
                            tweat = updateTweat
                        }
                        return tweat
                    })
                )
                setModalTitle("Success")
                setModalSubtitle("Your Tweat has been updated!")
            })
            .catch((err) => {
                setError(err.response.data.errors.text.message)
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <Textarea
                name="text"
                rows="3"
                placeholder="What are you eating?"
                className="mt-2 mb-2 ee border border-dark"
                onChange={handleTextArea}
                defaultValue={updateTweat.text}
            />
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>Error!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <Button className="btn btn-info ms-3 mt-3" type="submit">
                Edit
            </Button>
        </form>
    )
}
export default ModalEdit
