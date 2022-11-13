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
            <label htmlFor="search">Where are you eating?</label>
            <Search />
            <Textarea
                id="tweat"
                rows="3"
                placeholder="What are you eating?"
            ></Textarea>
            <Button>
                <Tooltip label="Attach a photo" fontSize="md">
                    <span>
                        <Icon as={BsFillCameraFill} />
                    </span>
                </Tooltip>
            </Button>
            <Button className="btn btn-info" onClick={(e) => handleTweat(e)}>
                TWEAT
            </Button>
        </form>
    )
}

export default TweatForm
