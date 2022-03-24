import { Box, Button, Image, Link, Tag, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const Movie = ({ isDark }) => {
  const { movieId } = useParams();
  const [movieResults, setMovieResults] = useState({});
  const [similarResults, setSimilarResults] = useState([]);
  const similarURL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US&page=1`;
  const movieSearchURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US`;
  const imagePath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    axios.get(movieSearchURL).then((res) => {
      setMovieResults(res.data);
    });
    axios.get(similarURL).then((res) => {
      setSimilarResults(res.data.results);
    });
  }, []);

  return (
    <Box marginBottom={24}>
      {movieResults != null ? (
        <Box
          bgImage={`url(${imagePath}${movieResults.backdrop_path})`}
          h="1000px"
          w="100%"
          rounded="5px"
          p={24}
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            gap={12}
            background={isDark ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.45)"}
            boxShadow="2xl"
            p={24}
            transition="300ms"
          >
            <Image
              src={`${imagePath}${movieResults.poster_path}`}
              h="500"
              w="600"
            />
            <Box display="flex" flexDir="column" gap={12}>
              <Text fontSize="4xl" color="white" fontWeight="bold">
                {movieResults.original_title}
              </Text>
              <Text fontSize="2xl" color="white">
                {movieResults.overview}
              </Text>
              <Box
                display="flex"
                gap={4}
                height={30}
                width={500}
                alignItems="center"
              >
                {movieResults.genres != null
                  ? movieResults.genres.map((item) => (
                      <Tag
                        bgColor={isDark ? "default" : "gray.900"}
                        transition="300ms"
                        color="white"
                        p={4}
                      >
                        {item.name}
                      </Tag>
                    ))
                  : ""}
              </Box>
              <Box display="flex" gap={4} flexDir="column">
                <Text fontSize="3xl" color="white">
                  Tagline: "{movieResults.tagline}"
                </Text>
                <Button
                  onClick={() =>
                    window.open(
                      `https://www.imdb.com/title/${movieResults.imdb_id}`,
                      "_blank"
                    )
                  }
                  variant="ghost"
                  w={120}
                  color="white"
                  border="2px solid teal"
                >
                  IMDb Link
                </Button>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  transition="300ms"
                  color="white"
                >
                  {movieResults.release_date}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box marginTop={12}>
        <Text textAlign="center" fontSize="4xl">
          Similar Movies:{" "}
        </Text>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          marginLeft={24}
          marginTop={8}
        >
          {similarResults != null
            ? similarResults.map((item) => (
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
      </Box>
    </Box>
  );
};

export default Movie;
