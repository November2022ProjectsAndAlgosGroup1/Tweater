import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import Tweat from "./Tweat"

const Feeds = (props) => {
    const {
        user,
        allTweats,
        setAllTweats,
        setUpdateTweat,
        setModalOpen,
        setModalTitle,
        setModalSubtitle,
    } = props

    const { pathname } = useLocation()
    const { id } = useParams()

    useEffect(() => {
        const getTweats = () => {
            axios
                .get("http://localhost:8000/api/tweats/")
                .then((res) => {
                    if (pathname.includes("profile")) {
                        console.log("id", id)

                        const userTweats = res.data.filter(
                            (tweat) => tweat.userID._id === id
                        )
                        setAllTweats(userTweats)
                    } else {
                        setAllTweats(res.data)
                    }
                })
                .catch((err) => console.log(err))
        }
        getTweats()
    }, [])

    const feedTitle = () => {
        if (pathname.includes("profile")) {
            return "Tweats"
        } else {
            return `What ${
                user?.name ? user.name + "'s" : "your"
            } friends are eating`
        }
    }

    return (
        <div
            className={`feedSection container ${
                pathname.includes("profile") && "profile-page"
            }`}
        >
            <h2 className=" mb-3 text-light tweat-title">{feedTitle()}</h2>
            <div className="container comments">
                {allTweats && allTweats.length > 0 ? (
                    allTweats.map((tweat, i) => {
                        return (
                            <Tweat
                                key={i}
                                tweat={tweat}
                                user={user}
                                allTweats={allTweats}
                                setAllTweats={setAllTweats}
                                setUpdateTweat={setUpdateTweat}
                                setModalOpen={setModalOpen}
                                setModalTitle={setModalTitle}
                                setModalSubtitle={setModalSubtitle}
                            />
                        )
                    })
                ) : (
                    <h2 className="text-warning">No TwEATs</h2>
                )}
            </div>
        </div>
    )
}

export default Feeds
