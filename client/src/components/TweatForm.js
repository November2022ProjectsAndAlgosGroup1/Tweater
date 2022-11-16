import { useState } from "react"
import { Button, Textarea, Icon, Tooltip } from "@chakra-ui/react"
import { BsFillCameraFill } from "react-icons/bs"
import SearchBar from "./SearchBar"
import axios from 'axios'

// TODO when the tweet is created we need the text of it and user id and the restraunt id

const TweatForm = (props) => {
    const { user } = props
    const [results, setResults] = useState(
        [{
            yelpID: "uT8mkd28TTnlOAbxYnAEQg",
            name: "Dame's Chicken & Waffles",
            latitude: 36.0011511571679,
            logitude: -78.90135093163059,
        }])

    const [tweat, setTweat] = useState(
        {
            userID: `${user._id}`,
            // restaurantInfo: {
            //     name: '',
            //     latitude: '',
            //     logitude: '',
            //   },
            text: '',
            image: '',
        }
    )

    const handleChange = (e) => {
        setTweat({ ...tweat, [e.target.name]: e.target.value })
        console.log(tweat)
    }
    const handleImage = (e) => {
        setTweat({ ...tweat, image: e.target.files[0] })
        console.log(tweat.image)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('text', tweat.text)
        formData.append('userID', tweat.userID)
        formData.append('image', tweat.image)

        console.log("The image File information is below")
        console.log(tweat.image)
        for (const value of formData.values()) {
            console.log(value);
        }

        axios.post('http://localhost:8000/api/tweats', formData)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    // results && console.log("results", results)
    return (
        <>
            <label htmlFor="search" className="mb-2">
                Where are you eating?
            </label>
            <SearchBar
                type="modal"
                setResults={setResults}
                results={results}
            />
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Textarea
                    name="text"
                    rows="3"
                    placeholder="What are you eating?"
                    className="mt-2 mb-2"
                    onChange={handleChange}
                ></Textarea>
                <Button>
                    {/* <Tooltip label="Attach a photo" fontSize="md">
                        <span>
                            <Icon as={BsFillCameraFill} />
                        </span>
                    </Tooltip> */}
                    <input
                        type='file'
                        accept='.png, .jpg, .jpeg'
                        name='image'
                        onChange={handleImage} />
                </Button>
                <Button
                    className="btn btn-info ms-3"
                    type='submit'
                >
                    TWEAT
                </Button>
            </form>
        </>
    )
}

export default TweatForm
