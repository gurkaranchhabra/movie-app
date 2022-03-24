import { Box, Button, Image, Tag, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const Show = ({ isDark }) => {
  const { showId } = useParams();

  console.log(showId);

  const [tvResults, setTvResults] = useState({});
  const [similarResults, setSimilarResults] = useState([]);

  const tvSearchURL = `https://api.themoviedb.org/3/tv/${showId}?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US`;
  const similarURL = `https://api.themoviedb.org/3/tv/${showId}/similar?api_key=0100fd5106a322614a7c2f9577efea7b&language=en-US&page=1`;
  const imagePath = `https://image.tmdb.org/t/p/original`;

  useEffect(() => {
    axios.get(tvSearchURL).then((res) => {
      setTvResults(res.data);
    });
    axios.get(similarURL).then((res) => {
      setSimilarResults(res.data.results);
    });
  }, []);

  if (tvResults != null) {
    console.log(tvResults);
  }

  return (
    <Box marginBottom={24}>
      {tvResults != null ? (
        <Box
          bgImage={`url(${imagePath}${tvResults.backdrop_path})`}
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
              src={`${imagePath}${tvResults.poster_path}`}
              h="500"
              w="600"
              marginTop={12}
            />
            <Box display="flex" flexDir="column" gap={8} marginTop={12}>
              <Text fontSize="4xl" color="white" fontWeight="bold">
                {tvResults.name}
              </Text>
              <Text fontSize="2xl" color="white">
                {tvResults.overview}
              </Text>
              <Box
                display="flex"
                gap={4}
                height={30}
                width={500}
                alignItems="center"
              >
                {tvResults.genres != null
                  ? tvResults.genres.map((item) => (
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
                  Tagline: "{tvResults.tagline}"
                </Text>
                <Button
                  onClick={() => window.open(`${tvResults.homepage}`, "_blank")}
                  variant="ghost"
                  w={120}
                  color="white"
                  border="2px solid teal"
                >
                  Website Link
                </Button>
                <Text
                  display="flex"
                  alignItems="center"
                  gap={4}
                  fontSize="xl"
                  color="white"
                >
                  Last Air Date:
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    transition="300ms"
                    color="white"
                  >
                    {tvResults.last_air_date}
                  </Text>
                </Text>
                {tvResults.networks != null
                  ? tvResults.networks.map((item) => (
                      <Image
                        src={`${imagePath}${item.logo_path}`}
                        height={46}
                        w={100}
                        objectFit="contain"
                      />
                    ))
                  : ""}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        ""
      )}
      <Box marginTop={12}>
        <Text textAlign="center" fontSize="4xl">
          Similar TV Shows:{" "}
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
                  href={`/movie-app/shows/${item.id}`}
                />
              ))
            : ""}
        </Box>
      </Box>
    </Box>
  );
};

export default Show;
