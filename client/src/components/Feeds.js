import { useState, useEffect } from "react"
import axios from "axios"
import Tweat from "./Tweat"

const Feeds = (props) => {
    const { page } = props
    const [allTweats, setAllTweats] = useState([])

    //TODO Get tweats...This is not working for some odd reason - JG
    useEffect(() => {
        const getTweats = () => {
            axios
                .get("http://localhost:8000/api/tweats/")
                .then((res) => {
                    console.log("The axios request went returned something.")
                    console.log(res.data)
                    setAllTweats(res.data)
                })
                .catch((err) => console.log(err))
        }
        getTweats()
    }, [])

    return (
        <div className="feedSection container p-4">
            <h2 className="fs-4 mb-3 text-light">
                What your friends are eating
            </h2>
            <div className="container comments">
                {allTweats ? (
                    allTweats.map((tweat, i) => {
                        return <Tweat key={i} tweat={tweat} />
                    })
                ) : (
                    <h3>No TwEATs</h3>
                )}
            </div>
        </div>
    )
}

export default Feeds
