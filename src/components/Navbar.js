import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  IconButton,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isDark, toggleColorMode }) => {
  const [search, setSearch] = useState("");

  let navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setSearch(e.target.value);
    } else {
      navigate("/movie-app");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length > 0) {
      navigate(`/movie-app/search/${search}`);
    } else {
      navigate("/movie-app");
    }
  };

  return (
    <Box
      bg={isDark ? "blackAlpha.600" : "green.50"}
      borderBottom={isDark ? "" : "1px solid black"}
      h={24}
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDir="row"
      padding={8}
      paddingX={8}
    >
      <Box
        display="flex"
        justifyContent="space-evenly"
        gap={12}
        alignItems="center"
      >
        <Link href="/movie-app" _hover={{ border: "" }}>
          <Text fontSize="2xl">Movies app</Text>
        </Link>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/movie-app">Trending</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/movie-app/movies">Movies</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/movie-app/shows">TV Shows</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/movie-app/horror">Horror</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="/movie-app/tv">TV Movies</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box display="flex" alignItems="center" gap={6}>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Input
            placeholder="Search..."
            border="1px solid black"
            color={isDark ? "white" : "black"}
            onChange={(e) => handleChange(e)}
          />
          <Button variant="outline" type="submit">
            Search
          </Button>
        </form>
        <IconButton
          onClick={toggleColorMode}
          icon={isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
        />
      </Box>
    </Box>
  );
};

export default Navbar;
