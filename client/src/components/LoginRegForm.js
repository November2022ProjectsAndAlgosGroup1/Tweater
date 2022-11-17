import { useState } from "react"
import { Button } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const LoginRegForm = (props) => {
    const {
        setUser,
        setloggedin,
        setMessage,
        setModalOpen,
        setModalSubtitle,
        setModalTitle,
        whereTo,
    } = props
    const navigate = useNavigate()

    //set up state for the form
    const [formLoginData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const [loginError, setLoginError] = useState(null)
    const [formRegisterData, setRegisterFormData] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { id } = useParams()

    //track changes in the form
    const handleLoginChange = (e) => {
        if (props.type === "Login") {
            setLoginFormData({
                ...formLoginData,
                [e.target.name]: e.target.value,
            })
        } else {
            setRegisterFormData({
                ...formRegisterData,
                [e.target.name]: e.target.value,
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:8000/api/users/login", formLoginData, {
                withCredentials: true,
                credentials: "include",
            })
            .then((res) => {
                console.log(res)
                setLoginError(null)
                setMessage(res.data.successMessage)
                setUser(res.data.user)
                handleWhereTo(res.data.user._id)
            })
            .catch((err) => {
                console.log(err)
                setLoginError(err.response.data.errorMessage)
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        axios
            .post(
                "http://localhost:8000/api/users/register",
                formRegisterData,
                {
                    withCredentials: true,
                    credentials: "include",
                }
            )
            .then((res) => {
                console.log(res)
                setLoginError(null)
                setUser(res.data.user)
                setMessage(res.data.successMessage)
                handleWhereTo(res.data.user._id)

                // todo (when successful register close modal)
            })
            .catch((err) => {
                console.log("Uh oh!  Something went wrong!")
                console.log(err.response.data)
                setLoginError(err.response.data.message)
            })
    }

    const handleWhereTo = (userID) => {
        setModalSubtitle("")
        setloggedin(true)
        setModalTitle("Success")
        if (whereTo === "profile") {
            navigate(`/profile/${userID}`)
            setModalOpen(false)
        } else if (whereTo === "tweat") {
            setModalTitle("Tweat")
        } else {
            navigate(`/explore/`)
            setModalOpen(false)
        }
    }

    console.log("whereTo", whereTo)
    return (
        <form
            className="log-reg-form"
            onSubmit={(e) =>
                props.type === "Login" ? handleLogin(e) : handleRegister(e)
            }
        >
            {props.type === "Login" ? (
                <>
                    <div className="mb-3 row align-items-center">
                        <div className="col-auto">
                            <label htmlFor="email" className="col-form-label">
                                Email:
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <div className="col-auto">
                            <label
                                htmlFor="password"
                                className="col-form-label"
                            >
                                Password:
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <>
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
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <div className="col-auto">
                            <label
                                htmlFor="userName"
                                className="col-form-label"
                            >
                                User Name:
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                name="userName"
                                className="form-control"
                                id="userName"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <div className="col-auto">
                            <label htmlFor="email" className="col-form-label">
                                Email:
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <div className="col-auto">
                            <label
                                htmlFor="password"
                                className="col-form-label"
                            >
                                Password:
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <div className="col-auto">
                            <label
                                htmlFor="confirmPassword"
                                className="col-form-label"
                            >
                                Confirm Password:
                            </label>
                        </div>
                        <div className="col">
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                id="confirmPassword"
                                onChange={handleLoginChange}
                            />
                        </div>
                    </div>
                </>
            )}
            {loginError && <p className="error">{loginError}</p>}
            <Button type="submit" className="btn btn-info">
                Submit
            </Button>
        </form>
    )
}

export default LoginRegForm
