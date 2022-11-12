import {
    Button,
    InputGroup,
    InputLeftElement,
    Input,
    Icon,
} from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"

import React from "react"
const SearchIcon = () => {
    return <Icon as="BsSearch" />
}

const Search = () => {
    return (
        <form className="d-flex w-50">
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon />}
                />
                <Input
                    className="form-control me-3"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
            </InputGroup>

            <Button className="btn btn-outline-success" type="submit">
                Search
            </Button>
        </form>
    )
}

export default Search
