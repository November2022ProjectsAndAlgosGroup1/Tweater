import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
    Button,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
} from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"
import axios from "axios"

const SearchBar = (props) => {
    // console.log(props)
    const { type, searchResults, setSearchResults, setOptions, setResults } =
        props
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [value, setValue] = useState("")

    const getYelp = (val) => {
        axios
            .post("http://localhost:8000/api/yelp", { location: val })
            .then((res) => {
                if (type !== "modal") {
                    setSearchResults(res.data)
                    if (pathname !== "/explore") {
                        navigate("/explore")
                    }
                } else {
                    setResults(res.data)
                }
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {}, [navigate, pathname, searchResults])

    const SearchIcon = () => {
        return <Icon as={BsSearch} />
    }

    const handleChange = (e) => {
        setValue(e.target.value)
        type === "modal" && setOptions([])
    }

    const handleSearch = (e) => {
        console.log(value)
        e.preventDefault()
        getYelp(value)

        // TODO:  Navigate to search page
        // page !== "Explore" || page !== 'Modal' ? navigate(`/explore/`) : null
    }
    return (
        <form className="serchForm " onSubmit={(e) => handleSearch(e)}>
            <InputGroup className="searchBtn">
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                />
                <Input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    // defaultValue={type !== "home" ? results[0].name : null}
                    onChange={(e) => handleChange(e)}
                />

                <Button
                    className="searchBtn ms-2"
                    type="submit"
                    variant="outline"
                >
                    Search
                </Button>
            </InputGroup>
        </form>
    )
}

export default SearchBar
