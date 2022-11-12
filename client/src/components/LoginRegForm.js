import { useState } from "react"
import { Button } from "@chakra-ui/react"
import axios from "axios"

const LoginRegForm = (props) => {
    //set up state for the form
    const [formLoginData, setLoginFormData] = useState({
        email: "",
        password: "",
    })
    const [loginError, setLoginError] = useState(null)
    const [loginSuccess, setLoginSuccess] = useState(null)
    const [formRegisterData, setRegisterFormData] = useState({
        status: "user",
        password: "",
        confirmPassword: "",
        email: "",
        tempUser: props.user_id,
        opinions: [],
    })

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
        console.log("logged in!")
        //TODO: verify express routes and mongoose controllers are setup
        // axios
        //   .post("http://localhost:8000/api/users/login", formLoginData, {
        //     withCredentials: true,
        //     credentials: "include",
        //   })
        //   .then((res) => {
        //     setLoginError(null);
        //     setLoginSuccess(res.data.message);
        //     // todo (close modal when successful)
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     setLoginError(err.response.data.errorMessage);
        //     setLoginSuccess(null);
        //   });
    }
    const handleRegister = (e) => {
        e.preventDefault()
        console.log("registered!")
        //TODO: verify express routes and mongoose controllers are setup
        // axios
        //   .post("http://localhost:8000/api/users/register", formRegisterData, {
        //     withCredentials: true,
        //     credentials: "include",
        //   })
        //   .then((res) => {
        //     setLoginSuccess(res.data.message);
        //     setLoginError(null);
        //     // todo (when successful register close modal)
        //   })
        //   .catch((err) => {
        //     setLoginError(err.response.data.message);
        //     setLoginSuccess(null);
        //   });
    }

    return (
        <form
            className="log-reg-form"
            onSubmit={(e) =>
                props.type === "Login" ? handleLogin(e) : handleRegister(e)
            }
        >
            {props.type === "Login" ? (
                <>
                    <div>
                        <label htmlFor="username">Email: </label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleLoginChange}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Confirm Password: </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleLoginChange}
                        />
                    </div>
                </>
            )}
            {loginError && <p className="error">{loginError}</p>}
            {loginSuccess && <p className="success">{loginSuccess}</p>}
            <Button type="submit" className="btn btn-info">
                Submit
            </Button>
        </form>
    )
}

export default LoginRegForm
