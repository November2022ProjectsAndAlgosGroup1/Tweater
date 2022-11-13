import { Button, Textarea, Icon, Tooltip } from "@chakra-ui/react"
import { BsFillCameraFill } from "react-icons/bs"
import Search from "./Search"


const TweatForm = () => {
    const handleTweat = (e) => {
        e.preventDefault()
        console.log("tweat")
    }
    return (
        <form>
            <label htmlFor="search" className="mb-2">Where are you eating?</label>
            <Search />
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
            <Button className="btn btn-info ms-3" onClick={(e) => handleTweat(e)}>
                TWEAT
            </Button>
        </form>
    )
}

export default TweatForm