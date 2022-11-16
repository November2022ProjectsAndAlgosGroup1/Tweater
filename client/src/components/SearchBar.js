import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
    const { type, setSearchResults, results, setResults } = props
    const { navigate } = useNavigate()
    const [value, setValue] = useState("")

    const getYelp = (val) => {
        axios
            .post("http://localhost:8000/api/yelp", { location: val })
            .then((res) => {
                console.log("getYelp res.data", res.data)
                type === "home"
                    ? setSearchResults(res.data)
                    : setResults(res.data)
            })
            .catch((err) => console.log(err))
    }

    // search && getYelp()

    const SearchIcon = () => {
        return <Icon as={BsSearch} />
    }

    const handleSearch = (e) => {
        console.log(value)
        e.preventDefault()
        getYelp(value)

        // TODO:  Navigate to search page
        // page !== "Explore" || page !== 'Modal' ? navigate(`/explore/`) : null
    }
    results && console.log("results", results)
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
                    onChange={(e) => setValue(e.target.value)}
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
