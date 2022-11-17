import { useEffect } from "react"
import { Button } from "@chakra-ui/react"

const EditProfileModal = (props) => {
    useEffect(() => {
        //! axios.get(get one user)
    }, [])
    return (
        <form>
            <img src="" alt="" className="profileImg" />
            <div className="mb-3 row align-items-center">
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label">
                        Name:
                    </label>
                </div>
                <div className="col">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                    />
                </div>
            </div>
            <div className="mb-3 row align-items-center">
                <div className="col-auto">
                    <label htmlFor="nickName" className="col-form-label">
                        Nickname:
                    </label>
                </div>
                <div className="col">
                    <input
                        type="text"
                        name="nickName"
                        className="form-control"
                        id="nickName"
                    />
                </div>
            </div>
            <Button className="btn btn-warning">
                <i className="fa fa-pencil" aria-hidden="true"></i> Edit
            </Button>
            <Button className="btn btn-danger">
                <i className="fa fa-trash" aria-hidden="true"></i> Delete
            </Button>
        </form>
    )
}

export default EditProfileModal
