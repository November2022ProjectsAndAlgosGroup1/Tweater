import { useState } from "react";
import {
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Icon,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import axios from 'axios'

const Search = (props) => {
  const { page, search, setSearch } = props;
  const [value, setValue] = useState("");

const getYelp = () => {
  axios
    .get("")
}

  const SearchIcon = () => {
    return <Icon as={BsSearch} />;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(value);
  };

  return (
    <form className="serchForm " onSubmit={(e) => handleSearch(e)}>
      <InputGroup className="searchBtn">
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          className="form-control"
          type="search"
          placeholder="Search"
          aria-label="Search"
          defaultValue={page === "Explore" ? { search } : null}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button className="searchBtn ms-2" type="submit" variant="outline">
          Search
        </Button>
      </InputGroup>
    </form>
  );
};

export default Search;
