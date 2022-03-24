import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Movies = ({ url, isDark }) => {
  const [results, setResults] = useState([]);

  const fetchFunction = (someURL) => {
    axios.get(someURL).then((res) => {
      setResults(res.data.results);
    });
  };

  useEffect(() => {
    fetchFunction(url);
  }, []);

  const getDate = (currentDate) => {
    const myArray = currentDate.split("-");
    return myArray[0];
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={4}
      marginTop={12}
      maxW="1400px"
      justifyContent="center"
      marginLeft={144}
      marginBottom={16}
    >
      {results != null
        ? results.map((item) => (
            <Card
              title={item.title}
              imageURL={item.poster_path}
              year={item.release_date}
              id={item.id}
              href={`/movie/${item.id}`}
            />
          ))
        : ""}
    </Box>
  );
};

export default Movies;
