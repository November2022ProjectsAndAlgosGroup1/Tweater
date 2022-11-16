import { useCallback, useState, useEffect } from "react"
import axios from "axios"
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    Textarea,
    Icon,
    Tooltip,
} from "@chakra-ui/react"
import { BsFillCameraFill } from "react-icons/bs"
import Select from "react-select"
import SearchBar from "./SearchBar"

const TweatForm = (props) => {
    const { user, setMessage, setModalTitle, setAllTweats, allTweats } = props
    const [results, setResults] = useState([])
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)
    const [error, setError] = useState("")

    const [tweat, setTweat] = useState({
        userID: `${user._id}`,
        restaurantInfo: {
            name: "",
            latitude: "",
            logitude: "",
        },
        text: "",
        image: "",
    })

    const handleTextArea = (e) => {
        setError("")
        setTweat({ ...tweat, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        setTweat({ ...tweat, image: e.target.files[0] })
        console.log(tweat.image)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("text", tweat.text)
        formData.append("userID", tweat.userID)
        formData.append("image", tweat.image)

        for (const value of formData.values()) {
            console.log(value)
        }

        axios
            .post("http://localhost:8000/api/tweats", formData)
            .then((res) => {
                const newTweat = res.data.newTweat
                newTweat.userID = {
                    _id: user._id,
                    username: user.userName,
                    name: user.name,
                }
                setAllTweats([res.data.newTweat, ...allTweats])
                setMessage(res.data.successMessage)
                setModalTitle("Success")
            })
            .catch((err) => {
                console.error(err)
                setError(err.response.data.message)
            })
    }

    const handleOptions = useCallback(() => {
        //loop through the results and create an array of objects with the value and label
        const data = results.map((result) => {
            return {
                value: result.id,
                label: result.name,
            }
        })
        return data
        //
    }, [results])

    useEffect(() => {
        setOptions(handleOptions())
    }, [handleOptions])

    results && handleOptions()

    const handleSelect = (selected) => {
        setError("")
        setSelectedOption(selected)
        const id = selected.value
        const details = results.filter((result) => result.id === id)
        const restuarantInfo = {
            yelpID: details[0].id,
            name: details[0].name,
            latitude: details[0].coordinates.latitude,
            longitude: details[0].coordinates.longitude,
        }
        setTweat({ ...tweat, restaurantInfo: restuarantInfo })
    }

    return (
        <>
            <label htmlFor="search" className="mb-2">
                Where are you eating?
            </label>
            <SearchBar
                type="modal"
                setResults={setResults}
                results={results}
                setOptions={setOptions}
            />
            {options.length > 0 && (
                <Select options={options} onChange={handleSelect} />
            )}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Textarea
                    name="text"
                    rows="3"
                    placeholder="What are you eating?"
                    className="mt-2 mb-2 ee border border-dark"
                    onChange={handleTextArea}
                    disabled={selectedOption ? false : true}
                />
                <Button>
                    <label htmlFor="image" className="me-2">
                        <Icon as={BsFillCameraFill} />
                    </label>
                    <Tooltip label="Attach a photo" fontSize="md">
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            onChange={handleImage}
                            disabled={selectedOption ? false : true}
                        />
                    </Tooltip>
                </Button>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        <AlertTitle>Error!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <Button
                    className="btn btn-info ms-3 mt-3"
                    type="submit"
                    disabled={selectedOption ? false : true}
                >
                    TWEAT
                </Button>
            </form>
        </>
    )
}

export default TweatForm
