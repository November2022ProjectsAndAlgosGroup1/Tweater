import { useState } from "react"
import { Button, Textarea, Icon, Tooltip } from "@chakra-ui/react"
import { BsFillCameraFill } from "react-icons/bs"
import SearchBar from "./SearchBar"

// TODO when the tweet is created we need the text of it and user id and the restraunt id

const TweatForm = (props) => {
    const { user } = props
    const [results, setResults] = useState([])

    const testRest = {
        yelpID: "uT8mkd28TTnlOAbxYnAEQg",
        name: "Dame's Chicken & Waffles",
        latitude: 36.0011511571679,
        logitude: -78.90135093163059,
    }
    setResults([testRest])

    const handleTweat = (e) => {
        e.preventDefault()
        console.log("tweat")
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
                results={testRest}
            />
            <form>
                <Textarea
                    id="tweat"
                    rows="3"
                    placeholder="What are you eating?"
                    className="mt-2 mb-2"
                ></Textarea>
                <Button>
                    <Tooltip label="Attach a photo" fontSize="md">
                        <span>
                            <Icon as={BsFillCameraFill} />
                        </span>
                    </Tooltip>
                </Button>
                <Button
                    className="btn btn-info ms-3"
                    onClick={(e) => handleTweat(e)}
                >
                    TWEAT
                </Button>
            </form>
        </>
    )
}

export default TweatForm
