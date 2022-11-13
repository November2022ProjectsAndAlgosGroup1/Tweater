import { useState } from "react"
import {
    Button,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Icon,
} from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"
// import React from "react";

const Search = (props) => {
    const { page, search, setSearch } = props
    const [value, setValue] = useState("")

    const SearchIcon = () => {
        return <Icon as={BsSearch} />
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(value)
    }

    return (
        <form className="serchForm" onSubmit={(e) => handleSearch(e)}>
            <InputGroup className="">
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                />
                <Input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    defaultValue={page === "Explore" ? { search } : null}
                    onChange={(e) => setValue(e.target.value)}
                />
                <InputRightElement className="ms-3">
                    <Button className="btn btn-outline-success" type="submit">
                        Search
                    </Button>
                </InputRightElement>
            </InputGroup>
        </form>
    )
}

export default Search
