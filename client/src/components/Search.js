import {
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
// import React from "react";

const Search = () => {
  const SearchIcon = () => {
    return <Icon as={BsSearch} />;
  };
  return (
    <form className="serchForm">
      <InputGroup className="">
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <InputRightElement className="ms-3">
          <Button className="btn btn-outline-success" type="submit">
            Search
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* <Button className="btn btn-outline-success" type="submit">
        Search
      </Button> */}
    </form>
  );
};

export default Search;
